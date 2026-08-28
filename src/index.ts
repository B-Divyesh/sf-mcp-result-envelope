export type {
  EnvelopeChunk,
  EnvelopeManifest,
  EnvelopeOptions,
  EnvelopePage,
  EnvelopeSchema,
  EnvelopeSummary,
  FieldSchema,
  JsonValue,
  NumericSummary,
  Provenance,
  ResultEnvelope,
  ValueType
} from "./types.js";

import type {
  EnvelopeChunk,
  EnvelopeManifest,
  EnvelopeOptions,
  EnvelopePage,
  EnvelopeSchema,
  EnvelopeSummary,
  FieldSchema,
  JsonValue,
  Provenance,
  ResultEnvelope,
  ValueType
} from "./types.js";

const encoder = new TextEncoder();
const DEFAULTS = { pageSize: 25, maxRows: 10_000, maxBytes: 16_384 } as const;

export class EnvelopeError extends Error {
  readonly code: "INVALID_INPUT" | "INVALID_OPTION" | "INVALID_CURSOR" | "ROW_TOO_LARGE";

  constructor(code: EnvelopeError["code"], message: string) {
    super(message);
    this.name = "EnvelopeError";
    this.code = code;
  }
}

interface NormalizedOptions {
  pageSize: number;
  maxRows: number;
  maxBytes: number;
  provenance?: Provenance;
}

interface Prepared {
  rows: JsonValue[];
  allRows: JsonValue[];
  options: NormalizedOptions;
  id: string;
  starts: number[];
  schema: EnvelopeSchema;
  summary: EnvelopeSummary;
  manifest: EnvelopeManifest;
}

function byteLength(value: unknown): number {
  return encoder.encode(JSON.stringify(value)).byteLength;
}

function assertInteger(name: string, value: number, minimum: number): void {
  if (!Number.isInteger(value) || value < minimum) {
    throw new EnvelopeError("INVALID_OPTION", `${name} must be an integer of at least ${minimum}.`);
  }
}

function normalizeOptions(options: EnvelopeOptions = {}): NormalizedOptions {
  const normalized: NormalizedOptions = {
    pageSize: options.pageSize ?? DEFAULTS.pageSize,
    maxRows: options.maxRows ?? DEFAULTS.maxRows,
    maxBytes: options.maxBytes ?? DEFAULTS.maxBytes
  };
  assertInteger("pageSize", normalized.pageSize, 1);
  assertInteger("maxRows", normalized.maxRows, 1);
  assertInteger("maxBytes", normalized.maxBytes, 256);
  if (typeof options.provenance === "string") normalized.provenance = { source: options.provenance };
  else if (options.provenance) normalized.provenance = options.provenance;
  return normalized;
}

function isJsonValue(value: unknown, seen = new Set<object>()): value is JsonValue {
  if (value === null || ["string", "boolean"].includes(typeof value)) return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value !== "object") return false;
  if (seen.has(value)) return false;
  seen.add(value);
  const valid = Array.isArray(value)
    ? value.every((item) => isJsonValue(item, seen))
    : Object.entries(value).every(([key, item]) => key.length > 0 && isJsonValue(item, seen));
  seen.delete(value);
  return valid;
}

function toRows(input: JsonValue): JsonValue[] {
  return Array.isArray(input) ? input : [input];
}

function typeOf(value: JsonValue): ValueType {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value as ValueType;
}

function flatten(value: JsonValue, prefix = "", output = new Map<string, JsonValue>()): Map<string, JsonValue> {
  if (value !== null && !Array.isArray(value) && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      const path = prefix ? `${prefix}.${key}` : key;
      output.set(path, child);
      if (child !== null && !Array.isArray(child) && typeof child === "object") flatten(child, path, output);
    }
  } else {
    output.set(prefix || "$", value);
  }
  return output;
}

function inferSchema(rows: JsonValue[], kind: EnvelopeSchema["kind"]): EnvelopeSchema {
  const records = new Map<string, { types: Set<ValueType>; present: number }>();
  for (const row of rows) {
    for (const [path, value] of flatten(row)) {
      const entry = records.get(path) ?? { types: new Set<ValueType>(), present: 0 };
      entry.types.add(typeOf(value));
      entry.present += 1;
      records.set(path, entry);
    }
  }
  const order: ValueType[] = ["null", "boolean", "number", "string", "array", "object"];
  const fields: FieldSchema[] = [...records.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, entry]) => ({
      path,
      types: [...entry.types].sort((a, b) => order.indexOf(a) - order.indexOf(b)),
      nullable: entry.types.has("null") || entry.present < rows.length,
      present: entry.present
    }));
  return { kind, fields };
}

function summarize(rows: JsonValue[], schema: EnvelopeSchema, pageCount: number): EnvelopeSummary {
  const numeric = schema.fields
    .filter((field) => field.types.includes("number"))
    .map((field) => {
      const values = rows
        .map((row) => flatten(row).get(field.path))
        .filter((value): value is number => typeof value === "number");
      return values.length
        ? { path: field.path, count: values.length, min: Math.min(...values), max: Math.max(...values) }
        : null;
    })
    .filter((value): value is NonNullable<typeof value> => value !== null);
  const rowWord = rows.length === 1 ? "row" : "rows";
  const fieldWord = schema.fields.length === 1 ? "field" : "fields";
  const pageWord = pageCount === 1 ? "page" : "pages";
  return {
    text: `${rows.length} ${rowWord} · ${schema.fields.length} ${fieldWord} · ${pageCount} ${pageWord}`,
    fields: schema.fields.length,
    numeric
  };
}

function stableHash(text: string): string {
  let hash = 0xcbf29ce484222325n;
  for (const byte of encoder.encode(text)) {
    hash ^= BigInt(byte);
    hash = BigInt.asUintN(64, hash * 0x100000001b3n);
  }
  return hash.toString(16).padStart(16, "0");
}

function base64UrlEncode(text: string): string {
  if (typeof Buffer !== "undefined") return Buffer.from(text).toString("base64url");
  const bytes = encoder.encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(text: string): string {
  try {
    if (typeof Buffer !== "undefined") return Buffer.from(text, "base64url").toString();
    const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
    return new TextDecoder().decode(Uint8Array.from(binary, (character) => character.charCodeAt(0)));
  } catch {
    throw new EnvelopeError("INVALID_CURSOR", "The page cursor is malformed. Start again without a cursor.");
  }
}

function cursorFor(id: string, offset: number): string {
  return base64UrlEncode(JSON.stringify({ v: 1, id, offset }));
}

function pageShape(rows: JsonValue[], number: number, start: number, nextCursor: string | null): EnvelopePage {
  const shape = { number, rows, rowStart: start, rowEnd: start + rows.length, nextCursor, bytes: 0 };
  let measured = byteLength(shape);
  while (shape.bytes !== measured) {
    shape.bytes = measured;
    measured = byteLength(shape);
  }
  return shape;
}

function calculateStarts(rows: JsonValue[], id: string, options: NormalizedOptions): number[] {
  const starts = [0];
  let offset = 0;
  while (offset < rows.length) {
    let end = Math.min(rows.length, offset + options.pageSize);
    let accepted = false;
    while (end > offset) {
      const next = end < rows.length ? cursorFor(id, end) : null;
      if (byteLength(pageShape(rows.slice(offset, end), starts.length, offset, next)) <= options.maxBytes) {
        accepted = true;
        break;
      }
      end -= 1;
    }
    if (!accepted) {
      throw new EnvelopeError(
        "ROW_TOO_LARGE",
        `Row ${offset} does not fit within maxBytes (${options.maxBytes}). Increase maxBytes or remove large fields.`
      );
    }
    offset = end;
    if (offset < rows.length) starts.push(offset);
  }
  return rows.length ? starts : [0];
}

function prepare(input: JsonValue, options: EnvelopeOptions = {}): Prepared {
  if (!isJsonValue(input)) {
    throw new EnvelopeError("INVALID_INPUT", "Input must be JSON data with finite numbers and no circular references.");
  }
  const normalized = normalizeOptions(options);
  const allRows = toRows(input);
  const rows = allRows.slice(0, normalized.maxRows);
  const identity = JSON.stringify({ rows, pageSize: normalized.pageSize, maxRows: normalized.maxRows, maxBytes: normalized.maxBytes });
  const id = `re_${stableHash(identity)}`;
  const starts = calculateStarts(rows, id, normalized);
  const schema = inferSchema(rows, Array.isArray(input) ? "rows" : "value");
  const summary = summarize(rows, schema, rows.length ? starts.length : 0);
  const manifest: EnvelopeManifest = {
    id,
    version: "1",
    totalRows: allRows.length,
    includedRows: rows.length,
    pageCount: rows.length ? starts.length : 0,
    inputBytes: byteLength(input),
    maxRows: normalized.maxRows,
    maxBytes: normalized.maxBytes,
    pageSize: normalized.pageSize,
    capped: rows.length < allRows.length,
    ...(normalized.provenance ? { provenance: normalized.provenance } : {})
  };
  return { rows, allRows, options: normalized, id, starts, schema, summary, manifest };
}

function resolveCursor(cursor: string | undefined, prepared: Prepared): number {
  if (!cursor) return 0;
  let value: unknown;
  try {
    value = JSON.parse(base64UrlDecode(cursor));
  } catch (error) {
    if (error instanceof EnvelopeError) throw error;
    throw new EnvelopeError("INVALID_CURSOR", "The page cursor is malformed. Start again without a cursor.");
  }
  if (
    !value || typeof value !== "object" ||
    (value as { v?: unknown }).v !== 1 ||
    (value as { id?: unknown }).id !== prepared.id ||
    !Number.isInteger((value as { offset?: unknown }).offset)
  ) {
    throw new EnvelopeError("INVALID_CURSOR", "The page cursor does not match this result. Start again without a cursor.");
  }
  const offset = (value as { offset: number }).offset;
  if (!prepared.starts.includes(offset)) {
    throw new EnvelopeError("INVALID_CURSOR", "The page cursor points outside this result. Start again without a cursor.");
  }
  return offset;
}

function makePage(prepared: Prepared, offset: number): EnvelopePage {
  if (!prepared.rows.length) return pageShape([], 0, 0, null);
  const index = prepared.starts.indexOf(offset);
  const end = prepared.starts[index + 1] ?? prepared.rows.length;
  const nextCursor = end < prepared.rows.length ? cursorFor(prepared.id, end) : null;
  return pageShape(prepared.rows.slice(offset, end), index + 1, offset, nextCursor);
}

/** Build a manifest, compact summary, schema, and first stable page. */
export function createEnvelope(input: JsonValue, options: EnvelopeOptions = {}): ResultEnvelope {
  const prepared = prepare(input, options);
  return {
    manifest: prepared.manifest,
    summary: prepared.summary,
    schema: prepared.schema,
    page: makePage(prepared, 0)
  };
}

/** Resolve one stable page. Run the same query and pass its cursor back in. */
export function getEnvelopePage(input: JsonValue, cursor?: string, options: EnvelopeOptions = {}): EnvelopePage {
  const prepared = prepare(input, options);
  return makePage(prepared, resolveCursor(cursor, prepared));
}

/** Yield metadata first, then one bounded page at a time. */
export async function* streamEnvelope(input: JsonValue, options: EnvelopeOptions = {}): AsyncGenerator<EnvelopeChunk> {
  const prepared = prepare(input, options);
  yield { type: "manifest", data: prepared.manifest };
  yield { type: "summary", data: prepared.summary };
  yield { type: "schema", data: prepared.schema };
  for (const start of prepared.starts) {
    if (!prepared.rows.length) break;
    yield { type: "page", data: makePage(prepared, start) };
  }
}
