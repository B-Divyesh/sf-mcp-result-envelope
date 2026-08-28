import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("package and CLI", () => {
  it("@claim:free-license ships under MIT with no runtime dependencies", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8")) as { license: string; dependencies?: unknown };
    expect(pkg.license).toBe("MIT");
    expect(pkg.dependencies).toBeUndefined();
    expect(readFileSync("LICENSE", "utf8")).toContain("Permission is hereby granted");
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

  it("prints help and reports invalid JSON with exit code 2", () => {
    expect(execFileSync(process.execPath, ["dist/cli.js", "--help"], { encoding: "utf8" })).toContain("--max-bytes");
    expect(() => execFileSync(process.execPath, ["dist/cli.js", "pack", "-"], { input: "nope", encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] })).toThrow(expect.objectContaining({ status: 2 }));
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
});
