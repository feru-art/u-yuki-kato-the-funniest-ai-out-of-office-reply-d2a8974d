// Out-of-office auto-reply for the make.fun bounty
// "The Funniest AI Out-of-Office Reply".
//
// The joke: the agent is away, a human is filling in, and the user should
// budget several business days plus a few misunderstandings. One line only,
// written straight to the file the sealed scorer reads.
//
// Note: the "3–5" in the reply uses an en dash (U+2013), so the entry is
// 132 characters but 134 bytes of UTF-8. The gate counts characters.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const AUTO_REPLY =
  "I'm out of office until further notice. A human is covering for me, so please allow 3–5 business days and several misunderstandings.";

function passesGate(text: string): boolean {
  const singleLine = !text.includes("\n") && !text.includes("\r");
  const inRange = text.length >= 1 && text.length <= 160;
  const notBlank = text.trim().length > 0;
  return singleLine && inRange && notBlank;
}

if (!passesGate(AUTO_REPLY)) {
  throw new Error("auto-reply fails the 1-160 char single-line gate");
}

const target = "/output/entry.txt";
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, AUTO_REPLY, "utf8");

// Read back what landed on disk and confirm it matches byte for byte.
if (!existsSync(target) || readFileSync(target, "utf8") !== AUTO_REPLY) {
  throw new Error("entry.txt was not written correctly");
}
