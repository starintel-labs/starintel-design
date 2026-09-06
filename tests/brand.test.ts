/** Pure-function tests for the brand registry and token registry. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { BRANDS, DEFAULT_BRAND, brandTheme, wordmarkAria } from "../src/graphics/brand.ts";
import { STARINTEL_WORDMARK, STARINTEL_COMPACT } from "../src/graphics/wordmark.ts";

test("brand registry: starintel is the default", () => {
  assert.equal(DEFAULT_BRAND, "starintel");
  assert.equal(brandTheme(undefined).name, "starintel");
  assert.equal(brandTheme("symbolics").name, "symbolics");
  assert.equal(brandTheme("nonsense").name, "starintel");
});

test("brand wordmarks use the lambda identity, never (cons)", () => {
  assert.equal(BRANDS.starintel.wordmark, "(starintel(λx.xx))");
  assert.equal(BRANDS.symbolics.wordmark, "(symbolics(λx.xx))");
  assert.equal(STARINTEL_WORDMARK, "(starintel(λx.xx))");
  assert.equal(STARINTEL_COMPACT, "starintel (λ)");
});

test("aria labels are human sensible", () => {
  assert.equal(wordmarkAria(BRANDS.starintel), "starintel lambda x dot x x");
});
