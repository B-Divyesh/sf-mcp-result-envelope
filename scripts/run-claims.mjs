import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const claims = JSON.parse(readFileSync(new URL("../.factory/claims.json", import.meta.url), "utf8"));
let passed = 0;

for (const claim of claims) {
  process.stdout.write(`\n[claim:${claim.id}] ${claim.test}\n`);
  const result = spawnSync(claim.test, { shell: true, stdio: "inherit" });
  if (result.status !== 0) {
    process.stderr.write(`[claim:${claim.id}] FAIL (${result.status ?? "signal"})\n`);
    process.exit(result.status ?? 1);
  }
  passed += 1;
  process.stdout.write(`[claim:${claim.id}] PASS\n`);
}

process.stdout.write(`\n${passed}/${claims.length} claim tests passed.\n`);
