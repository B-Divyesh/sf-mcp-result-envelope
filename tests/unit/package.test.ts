import { execFileSync } from "node:child_process";
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
});
