// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes one monologue to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Deterministic, no network, no randomness: two runs are byte-identical.

import { mkdirSync, writeFileSync } from "node:fs";
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

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), MONOLOGUE, "utf8");
