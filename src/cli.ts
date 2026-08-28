import { readFile, writeFile, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createEnvelope, EnvelopeError, getEnvelopePage, streamEnvelope } from "./index.js";
import type { EnvelopeOptions, JsonValue } from "./types.js";

const HELP = `Result Envelope 0.1.0

Pack structured results into bounded, stable pages.

Usage:
  result-envelope pack [file|-] [options]
  result-envelope page [file|-] --cursor <cursor> [options]
  result-envelope demo

Options:
  --format <json|ndjson>  Input format. Default: json
  --page-size <rows>      Maximum rows per page. Default: 25
  --max-rows <rows>       Maximum rows included. Default: 10000
  --max-bytes <bytes>     Maximum bytes per page. Default: 16384
  --provenance <source>   Record the result source
  --stream                Print one JSON chunk per line
  --cursor <cursor>       Resolve a page cursor
  --compact               Print JSON without indentation
  --help                   Show this help
  --version                Print the version

Examples:
  result-envelope pack results.json --page-size 20
  cat results.ndjson | result-envelope pack - --format ndjson --stream
  result-envelope demo
`;

interface CliOptions extends EnvelopeOptions {
  format: "json" | "ndjson";
  stream: boolean;
  compact: boolean;
  cursor?: string;
}

function parseNumber(flag: string, value: string | undefined): number {
  const number = Number(value);
  if (!value || !Number.isInteger(number)) throw new EnvelopeError("INVALID_OPTION", `${flag} needs a whole number.`);
  return number;
}

function parseArgs(args: string[]): { command: string; file: string; options: CliOptions } {
  const command = args[0] && !args[0].startsWith("-") ? args[0] : "pack";
  let index = command === "pack" && args[0] !== "pack" ? 0 : 1;
  let file = "-";
  if (args[index] && (args[index] === "-" || !args[index].startsWith("-"))) file = args[index++];
  const options: CliOptions = { format: "json", stream: false, compact: false };
  while (index < args.length) {
    const flag = args[index++];
    if (flag === "--format") {
      const format = args[index++];
      if (format !== "json" && format !== "ndjson") throw new EnvelopeError("INVALID_OPTION", "--format must be json or ndjson.");
      options.format = format;
    } else if (flag === "--page-size") options.pageSize = parseNumber(flag, args[index++]);
    else if (flag === "--max-rows") options.maxRows = parseNumber(flag, args[index++]);
    else if (flag === "--max-bytes") options.maxBytes = parseNumber(flag, args[index++]);
    else if (flag === "--provenance") options.provenance = args[index++] || "unknown";
    else if (flag === "--cursor") options.cursor = args[index++];
    else if (flag === "--stream") options.stream = true;
    else if (flag === "--compact") options.compact = true;
    else throw new EnvelopeError("INVALID_OPTION", `Unknown option: ${flag}. Run with --help.`);
  }
  return { command, file, options };
}

async function readStdin(): Promise<string> {
  let text = "";
  process.stdin.setEncoding("utf8");
  for await (const chunk of process.stdin) text += chunk;
  return text;
}

function parseInput(text: string, format: CliOptions["format"]): JsonValue {
  try {
    if (format === "ndjson") return text.split(/\r?\n/).filter((line) => line.trim()).map((line) => JSON.parse(line) as JsonValue);
    return JSON.parse(text) as JsonValue;
  } catch {
    throw new EnvelopeError("INVALID_INPUT", `Input is not valid ${format.toUpperCase()}. Fix the input and run the command again.`);
  }
}

async function load(file: string, format: CliOptions["format"]): Promise<JsonValue> {
  const text = file === "-" ? await readStdin() : await readFile(resolve(file), "utf8");
  return parseInput(text, format);
}

function libraryOptions(options: CliOptions): EnvelopeOptions {
  return {
    ...(options.pageSize ? { pageSize: options.pageSize } : {}),
    ...(options.maxRows ? { maxRows: options.maxRows } : {}),
    ...(options.maxBytes ? { maxBytes: options.maxBytes } : {}),
    ...(options.provenance ? { provenance: options.provenance } : {})
  };
}

async function runDemo(): Promise<void> {
  const cliDir = dirname(fileURLToPath(import.meta.url));
  const samplePath = resolve(cliDir, "../examples/orders.json");
  const rows = parseInput(await readFile(samplePath, "utf8"), "json");
  const outputDir = await mkdtemp(join(tmpdir(), "result-envelope-demo-"));
  const outputPath = join(outputDir, "envelope.json");
  const envelope = createEnvelope(rows, { pageSize: 5, maxRows: 50, maxBytes: 4096, provenance: "bundled order export" });
  await writeFile(outputPath, `${JSON.stringify(envelope, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(envelope, null, 2)}\n\nDemo output: ${outputPath}\n`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args[0] === "help") {
    process.stdout.write(HELP);
    return;
  }
  if (args.includes("--version")) {
    process.stdout.write("0.1.0\n");
    return;
  }
  if (args[0] === "demo") {
    await runDemo();
    return;
  }
  const { command, file, options } = parseArgs(args);
  if (command !== "pack" && command !== "page") throw new EnvelopeError("INVALID_OPTION", `Unknown command: ${command}. Run with --help.`);
  const input = await load(file, options.format);
  const envelopeOptions = libraryOptions(options);
  if (command === "page") {
    if (!options.cursor) throw new EnvelopeError("INVALID_OPTION", "page needs --cursor. Copy nextCursor from the previous page.");
    process.stdout.write(`${JSON.stringify(getEnvelopePage(input, options.cursor, envelopeOptions), null, options.compact ? 0 : 2)}\n`);
    return;
  }
  if (options.stream) {
    for await (const chunk of streamEnvelope(input, envelopeOptions)) process.stdout.write(`${JSON.stringify(chunk)}\n`);
    return;
  }
  process.stdout.write(`${JSON.stringify(createEnvelope(input, envelopeOptions), null, options.compact ? 0 : 2)}\n`);
}

main().catch((error: unknown) => {
  if (error instanceof EnvelopeError) {
    process.stderr.write(`result-envelope: ${error.message}\n`);
    process.exitCode = 2;
  } else if (error instanceof Error && "code" in error && error.code === "ENOENT") {
    process.stderr.write("result-envelope: The input file was not found. Check the path and run the command again.\n");
    process.exitCode = 2;
  } else {
    process.stderr.write(`result-envelope: ${error instanceof Error ? error.message : "The command failed."}\n`);
    process.exitCode = 1;
  }
});
