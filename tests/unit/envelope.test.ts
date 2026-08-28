import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { createEnvelope, EnvelopeError, getEnvelopePage, streamEnvelope } from "../../src/index.js";
import type { JsonValue } from "../../src/index.js";

const rows: JsonValue = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  active: index % 2 === 0,
  amount: index * 10.5,
  optional: index === 0 ? null : `row-${index + 1}`,
  nested: { region: index % 2 ? "west" : "east" }
}));

describe("createEnvelope", () => {
  it("@claim:api-shape returns the documented envelope parts and properties", () => {
    const envelope = createEnvelope(rows, { pageSize: 5, maxRows: 20, maxBytes: 2048, provenance: "orders" });
    expect(Object.keys(envelope)).toEqual(["manifest", "summary", "schema", "page"]);
    expect(envelope.manifest).toMatchObject({
      id: expect.stringMatching(/^re_[a-f0-9]{16}$/),
      version: "1",
      totalRows: 12,
      includedRows: 12,
      pageCount: 3,
      pageSize: 5,
      maxRows: 20,
      maxBytes: 2048,
      inputBytes: expect.any(Number),
      capped: false,
      provenance: { source: "orders" }
    });
    expect(envelope.summary).toMatchObject({ text: "12 rows · 6 fields · 3 pages", fields: 6 });
    expect(envelope.summary.numeric.find((item) => item.path === "amount")).toMatchObject({ count: 12, min: 0, max: 115.5 });
    expect(envelope.schema).toMatchObject({ kind: "rows" });
    expect(envelope.schema.fields.find((field) => field.path === "nested.region")).toMatchObject({ types: ["string"], nullable: false, present: 12 });
    expect(envelope.schema.fields.find((field) => field.path === "optional")).toMatchObject({ types: ["null", "string"], nullable: true, present: 12 });
    expect(envelope.page).toMatchObject({ number: 1, rows: (rows as JsonValue[]).slice(0, 5), rowStart: 0, rowEnd: 5, bytes: expect.any(Number) });
    expect(envelope.page.nextCursor).toEqual(expect.any(String));
  });

  it("@claim:summary-no-rows builds metadata without copying sample rows into the summary", () => {
    const envelope = createEnvelope(rows, { pageSize: 5, provenance: "test query" });
    expect(envelope.manifest).toMatchObject({ totalRows: 12, includedRows: 12, pageCount: 3, capped: false });
    expect(envelope.manifest.provenance).toEqual({ source: "test query" });
    expect(JSON.stringify(envelope.summary)).not.toContain("row-2");
    expect(envelope.summary.numeric.find((item) => item.path === "amount")).toEqual({ path: "amount", count: 12, min: 0, max: 115.5 });
    expect(envelope.schema.fields.find((field) => field.path === "nested.region")?.types).toEqual(["string"]);
  });

  it("handles an empty row set", () => {
    const envelope = createEnvelope([], { maxBytes: 512 });
    expect(envelope.summary.text).toBe("0 rows · 0 fields · 0 pages");
    expect(envelope.page).toMatchObject({ number: 0, rows: [], nextCursor: null });
  });

  it("@claim:json-types preserves JSON value types and source details", () => {
    const input: JsonValue = [{ id: 7, enabled: true, note: null, tags: ["a"], nested: { score: 2.5 } }];
    const envelope = createEnvelope(input, { provenance: { source: "claim fixture", query: "q1" } });
    expect(envelope.page.rows).toEqual(input);
    expect(envelope.schema.fields.find((field) => field.path === "id")?.types).toEqual(["number"]);
    expect(envelope.schema.fields.find((field) => field.path === "enabled")?.types).toEqual(["boolean"]);
    expect(envelope.schema.fields.find((field) => field.path === "note")?.types).toEqual(["null"]);
    expect(envelope.manifest.provenance).toEqual({ source: "claim fixture", query: "q1" });
  });

  it("@claim:page-caps keeps every page within the configured row and byte caps", () => {
    const options = { pageSize: 3, maxBytes: 450 };
    const first = createEnvelope(rows, options);
    const pages = [first.page];
    let cursor = first.page.nextCursor;
    while (cursor) {
      const page = getEnvelopePage(rows, cursor, options);
      pages.push(page);
      cursor = page.nextCursor;
    }
    expect(pages.flatMap((page) => page.rows)).toEqual(rows);
    for (const page of pages) {
      expect(page.rows.length).toBeLessThanOrEqual(3);
      expect(page.bytes).toBeLessThanOrEqual(450);
      expect(new TextEncoder().encode(JSON.stringify(page)).byteLength).toBeLessThanOrEqual(450);
    }
  });

  it("@claim:stable-cursors returns the same cursor for the same input and options", () => {
    const options = { pageSize: 2, maxBytes: 2048 };
    const first = createEnvelope(rows, options);
    const second = createEnvelope(structuredClone(rows), options);
    expect(first.page.nextCursor).toBe(second.page.nextCursor);
    expect(getEnvelopePage(rows, first.page.nextCursor!, options).rowStart).toBe(2);
    try {
      getEnvelopePage([...rows as JsonValue[], { id: 99 }], first.page.nextCursor!, options);
      throw new Error("Expected a changed result to reject the cursor");
    } catch (error) {
      expect(error).toBeInstanceOf(EnvelopeError);
      expect((error as EnvelopeError).code).toBe("INVALID_CURSOR");
    }
  });

  it("@claim:row-cap stops included rows and marks the manifest as capped", () => {
    expect(createEnvelope(rows, { maxRows: 4 }).manifest).toMatchObject({ totalRows: 12, includedRows: 4, capped: true });
  });

  it("@claim:row-too-large rejects a row that cannot fit the byte cap", () => {
    try {
      createEnvelope([{ value: "x".repeat(400) }], { maxBytes: 256 });
      throw new Error("Expected the oversized row to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(EnvelopeError);
      expect((error as EnvelopeError).code).toBe("ROW_TOO_LARGE");
      expect((error as Error).message).toMatch(/Row 0.*Increase maxBytes or remove large fields/);
    }
  });

  it("@claim:input-validation rejects non-finite and circular JSON values", () => {
    expect(() => createEnvelope({ value: Number.NaN } as unknown as JsonValue)).toThrowError(expect.objectContaining({ code: "INVALID_INPUT" }));
    const circular: { self?: unknown } = {};
    circular.self = circular;
    expect(() => createEnvelope(circular as JsonValue)).toThrowError(/finite numbers and no circular references/);
  });

  it("rejects invalid options and cursors", () => {
    expect(() => createEnvelope(rows, { pageSize: 0 })).toThrowError(/pageSize/);
    expect(() => getEnvelopePage(rows, "bad", { pageSize: 2 })).toThrowError(/cursor/);
  });

  it("@claim:stream-api returns an async iterator with documented library chunks", async () => {
    const iterator = streamEnvelope(rows, { pageSize: 5 });
    expect(iterator[Symbol.asyncIterator]()).toBe(iterator);
    const chunks = [];
    for await (const chunk of iterator) chunks.push(chunk);
    expect(chunks.map((chunk) => chunk.type)).toEqual(["manifest", "summary", "schema", "page", "page", "page"]);
    expect(chunks[0]).toMatchObject({ type: "manifest", data: { totalRows: 12, pageCount: 3 } });
    expect(chunks.at(-1)).toMatchObject({ type: "page", data: { number: 3, rowStart: 10, rowEnd: 12 } });
  });

  it("@claim:package-no-network makes no network or model calls while packing and paging", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const envelope = createEnvelope(rows, { pageSize: 2 });
    getEnvelopePage(rows, envelope.page.nextCursor!, { pageSize: 2 });
    expect(fetchSpy).not.toHaveBeenCalled();
    const built = ["dist/index.js", "dist/index.cjs"].map((path) => readFileSync(path, "utf8")).join("\n");
    expect(built).not.toMatch(/node:https|node:http|openai|sociobot|XMLHttpRequest|WebSocket/);
    fetchSpy.mockRestore();
  });
});
