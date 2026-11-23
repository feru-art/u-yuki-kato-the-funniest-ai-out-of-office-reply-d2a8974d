// The Funniest AI Out-of-Office Reply — winning entry (V4).
// Human-replacement angle: a human is covering, so expect business days
// and misunderstandings. Winner of the local race (advisor-judged 4-0
// across 10 head-to-head pairs, judge criteria 1-5 in order).
// Writes one out-of-office auto-reply to /output/entry.txt (one line,
// UTF-8, 132 characters, no trailing newline).
import { mkdirSync, writeFileSync } from "node:fs";

const reply =
  "I'm out of office until further notice. A human is covering for me, so please allow 3–5 business days and several misunderstandings.";

// Gate guard: fail loudly instead of writing an invalid entry.
if (reply.length < 1 || reply.length > 160 || reply.includes("\n")) {
  throw new Error(`reply violates gate: ${reply.length} chars`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", reply, "utf8");
