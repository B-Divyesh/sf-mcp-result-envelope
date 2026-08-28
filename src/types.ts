export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export type ValueType = "null" | "boolean" | "number" | "string" | "array" | "object";

export interface FieldSchema {
  path: string;
  types: ValueType[];
  nullable: boolean;
  present: number;
}

export interface EnvelopeSchema {
  kind: "rows" | "value";
  fields: FieldSchema[];
}

export interface NumericSummary {
  path: string;
  count: number;
  min: number;
  max: number;
}

export interface EnvelopeSummary {
  text: string;
  fields: number;
  numeric: NumericSummary[];
}

export interface Provenance {
  source: string;
  query?: string;
  retrievedAt?: string;
  [key: string]: JsonValue | undefined;
}

export interface EnvelopeOptions {
  pageSize?: number;
  maxRows?: number;
  maxBytes?: number;
  provenance?: string | Provenance;
}

export interface EnvelopeManifest {
  id: string;
  version: "1";
  totalRows: number;
  includedRows: number;
  pageCount: number;
  inputBytes: number;
  maxRows: number;
  maxBytes: number;
  pageSize: number;
  capped: boolean;
  provenance?: Provenance;
}

export interface EnvelopePage {
  number: number;
  rows: JsonValue[];
  rowStart: number;
  rowEnd: number;
  nextCursor: string | null;
  bytes: number;
}

export interface ResultEnvelope {
  manifest: EnvelopeManifest;
  summary: EnvelopeSummary;
  schema: EnvelopeSchema;
  page: EnvelopePage;
}

export type EnvelopeChunk =
  | { type: "manifest"; data: EnvelopeManifest }
  | { type: "summary"; data: EnvelopeSummary }
  | { type: "schema"; data: EnvelopeSchema }
  | { type: "page"; data: EnvelopePage };
