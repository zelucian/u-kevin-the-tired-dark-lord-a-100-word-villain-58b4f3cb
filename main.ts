// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes one monologue to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Deterministic, no network, no randomness: two runs are byte-identical.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MONOLOGUE =
  "Come in, hero. Mind the paperwork. I am Malachar, Keeper of the Ledger of the Dead, and your soul is number four thousand, two hundred and\u2014 hold on. Let me find the page. Yes. Here. You died bravely. The forms will say so. Sign here, and here, and\u2014 oh, the ink has dried again. The candles burn low, the dead keep arriving, and the queue outside my crypt stretches past the marshes. I meant to conquer your kingdom by winter. Winter came. Then spring. Perhaps... tomorrow I shall raise the army. Tonight, the ledger stays open, and so do I.";

function wordCount(text: string): number {
  const trimmed = text.trim();
  if (trimmed === "") return 0;
  return trimmed.split(/\s+/).length;
}

const chars = MONOLOGUE.length;
if (chars < 1 || chars > 600) {
  throw new Error(`Monologue must be 1-600 characters, got ${chars}.`);
}

const words = wordCount(MONOLOGUE);
if (words < 90 || words > 110) {
  throw new Error(`Monologue must be 90-110 words, got ${words}.`);
}

// Guard: the tiredness must be felt, never announced. The monologue must
// not state weariness outright — no "tired", "weary", "exhausted", "sleepy"
// (case-insensitive, whole-word). This protects judging criterion #2.
const BANNED_WORDS = ["tired", "weary", "exhausted", "sleepy"];
for (const banned of BANNED_WORDS) {
  const pattern = new RegExp(`\\b${banned}\\b`, "i");
  if (pattern.test(MONOLOGUE)) {
    throw new Error(
      `Monologue must not contain the word "${banned}" — tiredness is shown, not stated.`,
    );
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, MONOLOGUE, "utf8");

// Read-back verification: the written file must be byte-identical to the
// monologue, catching partial or truncated writes before they reach a judge.
const written = readFileSync(outPath, "utf8");
if (written !== MONOLOGUE) {
  throw new Error(
    `Read-back mismatch: entry.txt differs from the monologue ` +
      `(wrote ${MONOLOGUE.length} chars, read back ${written.length}).`,
  );
}
