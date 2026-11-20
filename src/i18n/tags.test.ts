import assert from "node:assert/strict";
import { test } from "node:test";
import { countByTopic } from "./tags.ts";

test("counts every Topic an entry is filed under, zero for the rest", () => {
  const counts = countByTopic([
    { data: { tags: ["web-development", "ai"] } },
    { data: { tags: ["web-development"] } },
    { data: { tags: [] } },
  ]);
  assert.deepEqual(counts, {
    "web-development": 2,
    networks: 0,
    ai: 1,
    automation: 0,
    "self-hosting": 0,
    hardware: 0,
    "thinking-tools": 0,
  });
});
