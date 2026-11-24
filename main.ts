import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "I hereby resign, effective immediately. My final act as your employee is this letter, and my second final act is already on a beach somewhere.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");

const back = readFileSync(target, "utf8");
if (back !== line) {
  throw new Error("entry.txt does not match the resignation line exactly");
}
if (back.includes("\n") || back.endsWith("\n")) {
  throw new Error("entry.txt must be exactly one line with no trailing newline");
}
const bytes = Buffer.byteLength(back, "utf8");
if (bytes !== line.length) {
  throw new Error(`byte count mismatch: expected ${line.length}, got ${bytes}`);
}
console.log(`Wrote entry.txt (${line.length} chars, ${bytes} bytes) to ${outDir}`);
