import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("package and CLI", () => {
  it("@claim:free-license ships free under the MIT license", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8")) as { license: string; dependencies?: unknown };
    expect(pkg.license).toBe("MIT");
    expect(readFileSync("LICENSE", "utf8")).toContain("Permission is hereby granted");
  });

  it("@claim:zero-runtime-dependencies declares no runtime dependencies", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8")) as { dependencies?: unknown };
    expect(pkg.dependencies).toBeUndefined();
  });

  it("@claim:node-support declares Node.js 18 or newer", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8")) as { engines?: { node?: string } };
    expect(pkg.engines?.node).toBe(">=18");
  });

  it("@claim:build-output creates the library, routed site, and npm tarball", () => {
    for (const path of [
      "dist/index.js",
      "dist/index.cjs",
      "dist/index.d.ts",
      "dist/cli.js",
      "dist/site/index.html",
      "dist/site/demo/index.html",
      "dist/site/privacy/index.html",
      "dist/site/terms/index.html",
      "dist/site/404.html",
      "dist/site/downloads/mcp-result-envelope-0.1.0.tgz"
    ]) expect(statSync(path).isFile(), path).toBe(true);
  });

  it("@claim:installable-package installs the released artifact in a clean project", () => {
    const readme = readFileSync("README.md", "utf8");
    const siteSource = readFileSync("site/src/main.ts", "utf8");
    expect(readme).toContain("npm install https://mcp-result-envelope.sociobot.in/downloads/mcp-result-envelope-0.1.0.tgz");
    expect(readme).not.toMatch(/npm install mcp-result-envelope(?:\s|$)/);
    expect(siteSource).not.toMatch(/npm install mcp-result-envelope(?:\\n|\s|<)/);
    const project = mkdtempSync(join(tmpdir(), "result-envelope-consumer-"));
    execFileSync("npm", ["init", "--yes"], { cwd: project, stdio: "ignore" });
    execFileSync("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund", join(process.cwd(), "dist/site/downloads/mcp-result-envelope-0.1.0.tgz")], { cwd: project, stdio: "ignore" });
    const api = execFileSync(process.execPath, ["--input-type=module", "--eval", "import { createEnvelope } from 'mcp-result-envelope'; console.log(createEnvelope([{id: 1}]).summary.text)"], { cwd: project, encoding: "utf8" });
    expect(api.trim()).toBe("1 row · 1 field · 1 page");
    const cli = execFileSync(join(project, "node_modules/.bin/result-envelope"), ["demo"], { cwd: project, encoding: "utf8" });
    expect(cli).toContain("Demo output:");
  });

  it("@claim:cli-demo writes a complete sample packet to a temporary directory", () => {
    const output = execFileSync(process.execPath, ["dist/cli.js", "demo"], { encoding: "utf8" });
    const path = output.match(/Demo output: (.+)/)?.[1].trim();
    expect(path).toBeTruthy();
    expect(path).toContain("result-envelope-demo-");
    expect(statSync(path!).isFile()).toBe(true);
    const packet = JSON.parse(readFileSync(path!, "utf8")) as { manifest: { totalRows: number }; page: { rows: unknown[] } };
    expect(packet.manifest.totalRows).toBe(12);
    expect(packet.page.rows).toHaveLength(5);
  });

  it("@claim:cli-io writes JSON to stdout and actionable errors to stderr", () => {
    expect(execFileSync(process.execPath, ["dist/cli.js", "--help"], { encoding: "utf8" })).toContain("--max-bytes");
    const success = spawnSync(process.execPath, ["dist/cli.js", "pack", "-", "--compact"], { input: '[{"id":1}]', encoding: "utf8" });
    expect(success.status).toBe(0);
    expect(success.stderr).toBe("");
    expect(JSON.parse(success.stdout)).toHaveProperty("manifest.totalRows", 1);
    const failure = spawnSync(process.execPath, ["dist/cli.js", "pack", "-"], { input: "nope", encoding: "utf8" });
    expect(failure.status).toBe(2);
    expect(failure.stdout).toBe("");
    expect(failure.stderr).toContain("Input is not valid JSON. Fix the input and run the command again.");
  });

  it("@claim:cli-help lists every supported command and flag", () => {
    const help = execFileSync(process.execPath, ["dist/cli.js", "--help"], { encoding: "utf8" });
    const commands = [...help.matchAll(/^  result-envelope ([a-z]+)(?:\s|$)/gm)].map((match) => match[1]);
    const flags = [...help.matchAll(/^  (--[a-z-]+)/gm)].map((match) => match[1]);
    expect([...new Set(commands)]).toEqual(["pack", "page", "demo"]);
    expect(flags).toEqual([
      "--format",
      "--page-size",
      "--max-rows",
      "--max-bytes",
      "--provenance",
      "--stream",
      "--cursor",
      "--compact",
      "--help",
      "--version"
    ]);

    const source = readFileSync("src/cli.ts", "utf8");
    const parsedFlags = [...source.matchAll(/(?:flag ===|args\.includes\()\s*["'](--[a-z-]+)["']/g)].map((match) => match[1]);
    expect([...new Set(parsedFlags)].sort()).toEqual([...flags].sort());
    expect(source).not.toContain('"--json"');

    expect(execFileSync(process.execPath, ["dist/cli.js", "--version"], { encoding: "utf8" }).trim()).toBe("0.1.0");
    expect(spawnSync(process.execPath, ["dist/cli.js", "unknown"], { encoding: "utf8" })).toMatchObject({ status: 2 });
  });

  it("@claim:stream-order accepts the documented stdin marker and streams ordered NDJSON chunks", () => {
    const result = spawnSync(
      process.execPath,
      ["dist/cli.js", "pack", "-", "--format", "ndjson", "--stream"],
      { input: '{"id":1}\n{"id":2}\n', encoding: "utf8" }
    );

    expect(result.status).toBe(0);
    expect(result.stderr).toBe("");
    const chunks = result.stdout.trim().split("\n").map((line) => JSON.parse(line) as { type: string });
    expect(chunks.map((chunk) => chunk.type)).toEqual(["manifest", "summary", "schema", "page"]);
  });

  it("runs the documented ESM example against the package exports", () => {
    const output = execFileSync(process.execPath, ["examples/basic.mjs"], { encoding: "utf8" });
    expect(output).toContain("2 rows · 3 fields · 2 pages");
    expect(output).toContain("rowStart: 1");
  });

  it("keeps the claim manifest in one-to-one sync with tagged tests", () => {
    const claims = JSON.parse(readFileSync(".factory/claims.json", "utf8")) as { id: string; test: string }[];
    const tests = ["tests/unit/envelope.test.ts", "tests/unit/package.test.ts", "tests/e2e/site.spec.ts"]
      .map((path) => readFileSync(path, "utf8"))
      .join("\n");
    const tags = [...tests.matchAll(/@claim:([a-z0-9-]+)/g)].map((match) => match[1]);
    expect(new Set(tags).size).toBe(tags.length);
    expect(tags.sort()).toEqual(claims.map((claim) => claim.id).sort());
    for (const claim of claims) expect(claim.test).toContain(`@claim:${claim.id}`);
  });
});
