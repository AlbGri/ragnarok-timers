/**
 * Imposta il codice di accesso della versione web.
 *
 * Scrive in `docs/app/gate.js` solo l'impronta SHA-256 del codice, mai il
 * codice. Senza argomenti rimuove il codice e lascia l'applicazione aperta.
 *
 * Uso:
 *   node tools/set-access-code.mjs "codice"
 *   node tools/set-access-code.mjs --clear
 */

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const gatePath = join(dirname(fileURLToPath(import.meta.url)), "..", "docs", "app", "gate.js");
const argument = process.argv[2];

if (argument === undefined) {
  console.error('Uso: node tools/set-access-code.mjs "codice" | --clear');
  process.exit(1);
}

// Il confronto nel browser normalizza allo stesso modo: niente spazi ai bordi,
// niente distinzione fra maiuscole e minuscole.
const hash =
  argument === "--clear"
    ? ""
    : createHash("sha256").update(argument.trim().toLowerCase()).digest("hex");

const source = readFileSync(gatePath, "utf-8");
const updated = source.replace(/const ACCESS_HASH = "[^"]*";/, `const ACCESS_HASH = "${hash}";`);
if (updated === source) {
  console.error("Impronta non trovata in gate.js: il file e' stato modificato a mano?");
  process.exit(1);
}
writeFileSync(gatePath, updated, "utf-8");

console.log(
  hash === ""
    ? "Codice rimosso: l'applicazione e' aperta a tutti."
    : `Codice impostato. Impronta: ${hash.slice(0, 16)}...`,
);
