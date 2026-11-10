#!/usr/bin/env node
/**
 * Importa las láminas del Rider-Waite-Smith cuando estén disponibles.
 *
 * Coloca los archivos en `art-source/rider-waite/` con el número de carta como
 * nombre (`00.jpg`, `01.png`, … `77.webp`). También se aceptan nombres como
 * `00-el-loco.jpg` o `22-as-de-bastos.png`. Para el dorso y la portada usa
 * `dorso.jpg` y `portada.jpg`.
 *
 * El script copia cada imagen a `public/`, actualiza `art-manifest.json` y deja
 * el marcador neutro para las cartas que aún no tengan imagen.
 *
 * Uso:
 *   npm run art:import:rider-waite
 *   npm run art:import:rider-waite -- --source=C:\ruta\a\mis\cartas
 *   npm run art:import:rider-waite -- --clean
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cards = JSON.parse(
  readFileSync(join(root, "src/data/rider-waite/cards.json"), "utf8"),
);
const byNumber = new Map(cards.map((card) => [card.number, card]));

const DEFAULT_SOURCE = join(root, "art-source/rider-waite");
const OUT_CARDS = join(root, "public/images/cards/rider-waite");
const OUT_BACK = join(root, "public/images/cards/rider-waite");
const OUT_DECKS = join(root, "public/images/decks");
const MANIFEST = join(root, "src/data/rider-waite/art-manifest.json");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const args = process.argv.slice(2);
const clean = args.includes("--clean");
const sourceArg = args.find((arg) => arg.startsWith("--source="));
const source = sourceArg
  ? resolve(sourceArg.slice("--source=".length).replace(/^"|"$/g, ""))
  : DEFAULT_SOURCE;

const emptyManifest = { cards: {}, back: null, cover: null };

function readManifest() {
  try {
    const parsed = JSON.parse(readFileSync(MANIFEST, "utf8"));
    return {
      cards: parsed.cards ?? {},
      back: parsed.back ?? null,
      cover: parsed.cover ?? null,
    };
  } catch {
    return { ...emptyManifest, cards: {} };
  }
}

function writeManifest(manifest) {
  const orderedCards = Object.fromEntries(
    Object.entries(manifest.cards).sort(([a], [b]) => Number(a) - Number(b)),
  );
  writeFileSync(
    MANIFEST,
    `${JSON.stringify({ ...manifest, cards: orderedCards }, null, 2)}\n`,
    "utf8",
  );
}

function publicPathToFile(publicPath) {
  if (!publicPath || !publicPath.startsWith("/")) return null;
  const publicRoot = join(root, "public");
  const target = join(publicRoot, publicPath.replace(/^\/+/, ""));
  return target === publicRoot || target.startsWith(publicRoot + sep)
    ? target
    : null;
}

if (clean) {
  const current = readManifest();
  const files = [
    ...Object.values(current.cards),
    current.back,
    current.cover,
  ].filter(Boolean);

  let removed = 0;
  for (const publicPath of files) {
    const file = publicPathToFile(publicPath);
    if (file && existsSync(file)) {
      unlinkSync(file);
      removed += 1;
    }
  }

  writeManifest({ ...emptyManifest, cards: {} });
  console.log(`Limpiado: ${removed} imagen(es) importada(s).`);
  console.log("La app vuelve a usar el marcador neutro.");
  process.exit(0);
}

if (!existsSync(source) || !statSync(source).isDirectory()) {
  mkdirSync(source, { recursive: true });
  console.error(`No se encontró la carpeta de origen: ${source}`);
  console.error(
    "He creado la carpeta. Coloca allí las imágenes (00.jpg … 77.jpg, dorso.jpg, portada.jpg) y vuelve a ejecutar el comando.",
  );
  process.exit(1);
}

const files = readdirSync(source, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((name) => IMAGE_EXTENSIONS.has(extname(name).toLowerCase()));

if (files.length === 0) {
  console.error(`La carpeta ${source} no contiene imágenes JPG, PNG o WebP.`);
  process.exit(1);
}

mkdirSync(OUT_CARDS, { recursive: true });
mkdirSync(OUT_BACK, { recursive: true });
mkdirSync(OUT_DECKS, { recursive: true });

const manifest = readManifest();
const found = new Map();
const extraFiles = [];

function normalizedExtension(name) {
  const extension = extname(name).toLowerCase();
  return extension === ".jpeg" ? ".jpg" : extension;
}

for (const name of files) {
  const base = name.slice(0, -extname(name).length).trim();
  const lower = base.toLowerCase();

  if (/^(dorso|reverso|revers|back|reverse)$/.test(lower)) {
    extraFiles.push({ kind: "back", name });
    continue;
  }
  if (/^(portada|tapa|cover|front)$/.test(lower)) {
    extraFiles.push({ kind: "cover", name });
    continue;
  }

  const match = base.match(/^(\d{1,2})(?:[\s._-].*)?$/);
  if (!match) {
    console.log(`IGNORADO ${name} · no empieza por el número de carta`);
    continue;
  }

  const number = Number.parseInt(match[1], 10);
  const card = byNumber.get(number);
  if (!card) {
    console.log(`IGNORADO ${name} · no existe la carta ${number}`);
    continue;
  }

  if (found.has(number)) {
    console.log(
      `AVISO ${name} · la carta ${number} ya tenía ${found.get(number).name}; se conserva la primera`,
    );
    continue;
  }

  found.set(number, { name, extension: normalizedExtension(name) });
}

for (const [number, { name, extension }] of [...found.entries()].sort(
  ([a], [b]) => a - b,
)) {
  const card = byNumber.get(number);
  const targetName = `${String(number).padStart(2, "0")}-${card.slug}${extension}`;
  const target = join(OUT_CARDS, targetName);

  copyFileSync(join(source, name), target);
  manifest.cards[String(number)] = `/images/cards/rider-waite/${targetName}`;

  const size = statSync(target).size;
  console.log(
    `OK ${String(number).padStart(2, "0")} · ${card.name} · ${targetName} · ${(size / 1024).toFixed(0)} KB`,
  );
  if (size > 1_500_000) {
    console.log(
      `   AVISO: el archivo supera 1,5 MB; conviene reducirlo para la galería móvil.`,
    );
  }
}

for (const { kind, name } of extraFiles) {
  const extension = normalizedExtension(name);
  const target = join(
    kind === "back" ? OUT_BACK : OUT_DECKS,
    kind === "back" ? `back${extension}` : `rider-waite${extension}`,
  );

  copyFileSync(join(source, name), target);
  manifest[kind] =
    kind === "back"
      ? `/images/cards/rider-waite/back${extension}`
      : `/images/decks/rider-waite${extension}`;

  console.log(
    `OK ${kind === "back" ? "dorso" : "portada"} · ${name} · ${(statSync(target).size / 1024).toFixed(0)} KB`,
  );
}

writeManifest(manifest);

const missing = cards.length - Object.keys(manifest.cards).length;
console.log("");
console.log(`Importadas ${Object.keys(manifest.cards).length} de ${cards.length} cartas.`);
if (missing > 0) {
  console.log(
    `Faltan ${missing} cartas: se seguirá mostrando el marcador neutro.`,
  );
}
console.log(`Manifiesto: ${MANIFEST.replace(root, ".")}`);
console.log("Reinicia el servidor de desarrollo si estaba en marcha.");
