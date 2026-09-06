/**
 * Token contract tests: the semantic token surface is a public API.
 * These tests fail when a required token is renamed or dropped.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_TOKENS, TOKEN_GROUPS, DEFAULT_THEME } from "../src/tokens/tokens.ts";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const tokensCss = readFileSync(join(root, "src", "css", "tokens.css"), "utf8");

test("obsidian-gold is the default theme", () => {
  assert.equal(DEFAULT_THEME, "obsidian-gold");
  assert.match(tokensCss, /\[data-si-theme="obsidian-gold"\]/);
});

test("every declared semantic token exists in tokens.css", () => {
  for (const token of ALL_TOKENS) {
    assert.ok(tokensCss.includes(`${token}:`), `missing token: ${token}`);
  }
});

test("token groups cover the required semantic categories", () => {
  const groups = TOKEN_GROUPS.map((g) => g.group);
  for (const required of [
    "color.background",
    "color.text",
    "color.accent",
    "color.border",
    "color.status",
    "color.graph",
    "color.code",
    "color.terminal",
    "spacing",
    "typography",
    "motion",
  ]) {
    assert.ok(groups.includes(required), `missing token group: ${required}`);
  }
});

test("practical aliases documented in the design guide exist", () => {
  for (const token of [
    "--si-bg-canvas",
    "--si-bg-surface",
    "--si-text-primary",
    "--si-text-secondary",
    "--si-accent-primary",
    "--si-border",
    "--si-focus",
  ]) {
    assert.ok(tokensCss.includes(`${token}:`), `missing alias token: ${token}`);
  }
});

test("legacy aliases are marked deprecated", () => {
  assert.match(tokensCss, /Legacy aliases[\s\S]*DEPRECATED/);
  assert.match(tokensCss, /--si-gold: var\(--si-accent-primary\)/);
});

test("reduced motion neutralizes animation durations", () => {
  const motion = readFileSync(join(root, "src", "css", "motion.css"), "utf8");
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /--si-fast: 0ms/);
});
