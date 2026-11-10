#!/usr/bin/env node
/**
 * Genera las ilustraciones provisionales de la biblioteca.
 *
 * Cada carta recibe un SVG independiente, con composición, color y glifos
 * propios. El objetivo es que la app pueda maquetarse y navegarse con arte
 * elegante sin reproducir ilustraciones con derechos. Para sustituirlo por el
 * arte final basta con reemplazar los archivos manteniendo las rutas.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cards = JSON.parse(
  readFileSync(join(root, "src/data/egyptian/cards.json"), "utf8"),
);

const OUT_CARDS = join(root, "public/images/cards/egyptian");
const OUT_BACK = join(root, "public/images/cards");
const OUT_DECKS = join(root, "public/images/decks");

const W = 640;
const H = 1000;

const palettes = [
  { accent: "#C9A227", soft: "#E8DCC0", deep: "#0A101C", glow: "#D9B54A" },
  { accent: "#2A9D8F", soft: "#BFE3DA", deep: "#08140F", glow: "#4FC3B4" },
  { accent: "#D2A65A", soft: "#F0E2C2", deep: "#121019", glow: "#E4C078" },
  { accent: "#B85C48", soft: "#F0C9B8", deep: "#150B0A", glow: "#D97A62" },
  { accent: "#5B7DB1", soft: "#C9D8EC", deep: "#0A0E19", glow: "#7FA3D8" },
  { accent: "#8A79B8", soft: "#D8CFEC", deep: "#100C19", glow: "#A898D6" },
  { accent: "#A7B3C2", soft: "#E6EBF2", deep: "#0B0F15", glow: "#C7D2DF" },
];

const seriesPalette = {
  bastos: { accent: "#C06A4B", soft: "#F0C4AE", deep: "#150C09", glow: "#DA8564" },
  copas: { accent: "#3E9E96", soft: "#BFE3DD", deep: "#08130F", glow: "#5CC0B6" },
  espadas: { accent: "#94A7BF", soft: "#DCE5F0", deep: "#0A0E15", glow: "#B7C8DC" },
  oros: { accent: "#B79A4A", soft: "#E9DCB4", deep: "#12100A", glow: "#D4B862" },
};

const majorMotifs = [
  "ankh", "moon", "lotus", "crown", "portal", "scales", "boat", "feather",
  "key", "wheel", "serpent", "obelisk", "scarab", "water", "flame", "mountain",
  "star", "eye", "sun", "tree", "cartouche", "djed",
];

const minorMotifs = [
  "lotus", "boat", "feather", "scarab", "water", "key", "sun", "serpent",
  "star", "ankh", "tree", "eye", "crown", "wheel", "scales", "obelisk",
  "moon", "flame", "portal", "djed", "cartouche", "mountain",
];

function mulberry32(seed) {
  let a = seed >>> 0;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function paletteFor(card) {
  if (card.category === "minor" && card.series) {
    const base = seriesPalette[card.series];
    const variant = palettes[card.number % palettes.length];
    return {
      accent: base.accent,
      soft: variant.soft,
      deep: base.deep,
      glow: base.glow,
    };
  }
  return palettes[(card.number - 1) % palettes.length];
}

function motif(kind, color, soft) {
  const stroke = `stroke="${color}" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
  const fill = `fill="${color}"`;
  const faint = `fill="${color}" opacity="0.16"`;
  const softStroke = `stroke="${soft}" fill="none" stroke-width="2" opacity="0.6"`;

  switch (kind) {
    case "ankh":
      return `<g ${stroke}>
        <circle cx="0" cy="-48" r="34"/>
        <circle cx="0" cy="-48" r="22" ${softStroke}/>
        <path d="M0 -14 V78"/>
        <path d="M-48 2 H48"/>
        <path d="M-14 78 H14"/>
      </g>`;
    case "moon":
      return `<g>
        <path d="M18 -72 A72 72 0 1 0 18 72 A56 56 0 0 1 18 -72 Z" ${fill} opacity="0.9"/>
        <circle cx="64" cy="-38" r="5" ${fill}/>
        <circle cx="82" cy="6" r="3.5" ${fill}/>
        <circle cx="56" cy="48" r="4" ${fill}/>
        <path d="M-80 -20 H-58 M-69 -31 V-9" ${softStroke}/>
      </g>`;
    case "lotus":
      return `<g ${stroke}>
        ${[0, 45, -45, 90, -90].map((angle) => `<path d="M0 54 C-42 24 -42 -32 0 -66 C42 -32 42 24 0 54 Z" transform="rotate(${angle})" opacity="0.8"/>`).join("")}
        <circle cx="0" cy="4" r="12" ${faint}/>
      </g>`;
    case "crown":
      return `<g ${stroke}>
        <path d="M-78 42 L-92 -38 L-34 2 L0 -62 L34 2 L92 -38 L78 42 Z"/>
        <path d="M-78 58 H78"/>
        <circle cx="-92" cy="-48" r="8" ${faint}/>
        <circle cx="0" cy="-72" r="8" ${faint}/>
        <circle cx="92" cy="-48" r="8" ${faint}/>
      </g>`;
    case "portal":
      return `<g ${stroke}>
        <path d="M-70 86 V-8 Q-70 -78 0 -78 Q70 -78 70 -8 V86"/>
        <path d="M-48 86 V-4 Q-48 -52 0 -52 Q48 -52 48 -4 V86" ${softStroke}/>
        <path d="M-92 86 H92"/>
        <path d="M-24 86 V16 Q-24 -8 0 -8 Q24 -8 24 16 V86"/>
        <circle cx="0" cy="-26" r="6" ${fill}/>
      </g>`;
    case "scales":
      return `<g ${stroke}>
        <path d="M0 -80 V80 M-64 -50 H64"/>
        <path d="M-64 -50 V-8 M64 -50 V-8"/>
        <path d="M-96 -8 Q-64 42 -32 -8 Z"/>
        <path d="M32 -8 Q64 42 96 -8 Z"/>
        <circle cx="0" cy="-80" r="8" ${faint}/>
        <path d="M-28 80 H28"/>
      </g>`;
    case "boat":
      return `<g ${stroke}>
        <path d="M-98 34 Q0 94 98 34 L72 58 Q0 106 -72 58 Z"/>
        <path d="M0 34 V-68"/>
        <path d="M0 -64 L58 -4 H0 Z" ${faint}/>
        <path d="M0 -50 L-46 -4 H0 Z" opacity="0.7"/>
        <path d="M-86 84 Q-64 72 -42 84 T4 84 T50 84 T96 84" ${softStroke}/>
      </g>`;
    case "feather":
      return `<g ${stroke}>
        <path d="M0 86 C-40 38 -34 -44 0 -84 C34 -44 40 38 0 86 Z"/>
        <path d="M0 -70 V72" ${softStroke}/>
        ${[-52, -30, -8, 14, 36, 58].map((y) => `<path d="M0 ${y} L-24 ${y - 16} M0 ${y} L24 ${y - 16}" ${softStroke}/>`).join("")}
      </g>`;
    case "key":
      return `<g ${stroke}>
        <circle cx="0" cy="-46" r="32"/>
        <circle cx="0" cy="-46" r="14" ${softStroke}/>
        <path d="M0 -14 V82 M0 46 H34 M0 64 H26"/>
      </g>`;
    case "wheel":
      return `<g ${stroke}>
        <circle cx="0" cy="0" r="82"/>
        <circle cx="0" cy="0" r="56" ${softStroke}/>
        ${Array.from({ length: 8 }, (_, i) => `<path d="M0 0 L0 -82" transform="rotate(${i * 45})" ${softStroke}/>`).join("")}
        <circle cx="0" cy="0" r="10" ${faint}/>
      </g>`;
    case "serpent":
      return `<g ${stroke}>
        <path d="M-76 58 C-24 58 -18 18 18 18 C46 18 54 -10 40 -34 C28 -54 4 -56 -6 -38"/>
        <path d="M-76 58 Q-94 42 -80 22 Q-68 6 -50 20"/>
        <circle cx="34" cy="-40" r="4" ${fill}/>
        <path d="M-58 42 Q-46 54 -34 42 Q-46 30 -58 42 Z" ${faint}/>
      </g>`;
    case "obelisk":
      return `<g ${stroke}>
        <path d="M-28 84 L-20 -44 L0 -78 L20 -44 L28 84 Z"/>
        <path d="M-20 -44 H20 M-24 -18 H24 M-25 10 H25 M-26 38 H26 M-27 64 H27" ${softStroke}/>
        <path d="M-46 84 H46"/>
      </g>`;
    case "scarab":
      return `<g ${stroke}>
        <ellipse cx="0" cy="10" rx="44" ry="58"/>
        <circle cx="0" cy="-56" r="22"/>
        <path d="M-10 -72 L0 -88 L10 -72 M-42 -14 Q-82 -26 -90 6 M42 -14 Q82 -26 90 6 M-44 26 Q-84 40 -86 72 M44 26 Q84 40 86 72 M-34 62 Q-56 78 -62 92 M34 62 Q56 78 62 92"/>
        <path d="M0 -8 V54" ${softStroke}/>
        <path d="M-24 20 Q0 32 24 20" ${softStroke}/>
      </g>`;
    case "water":
      return `<g ${stroke}>
        ${[-48, -16, 16, 48].map((y) => `<path d="M-90 ${y} Q-60 ${y - 22} -30 ${y} T30 ${y} T90 ${y}"/>`).join("")}
        <path d="M-90 ${-48} Q-60 ${-70} -30 ${-48} T30 ${-48} T90 ${-48}" ${softStroke}/>
      </g>`;
    case "flame":
      return `<g ${stroke}>
        <path d="M0 86 C-56 58 -50 14 -20 -10 C-24 -42 -6 -70 16 -88 C14 -54 48 -44 46 0 C45 40 22 66 0 86 Z"/>
        <path d="M0 54 C-22 40 -18 18 -2 2 C4 18 20 28 14 48 C10 60 4 68 0 54 Z" ${faint}/>
      </g>`;
    case "mountain":
      return `<g ${stroke}>
        <path d="M-98 64 L-24 -54 L18 8 L48 -32 L98 64 Z"/>
        <path d="M-66 22 L-24 -54 L8 -6" ${softStroke}/>
        <circle cx="56" cy="-58" r="16" ${faint}/>
      </g>`;
    case "star":
      return `<g ${stroke}>
        <path d="M0 -88 L20 -20 L88 0 L20 20 L0 88 L-20 20 L-88 0 L-20 -20 Z"/>
        <path d="M-62 -62 L62 62 M62 -62 L-62 62" ${softStroke}/>
        <circle cx="0" cy="0" r="10" ${faint}/>
      </g>`;
    case "eye":
      return `<g ${stroke}>
        <path d="M-92 0 Q0 -62 92 0 Q0 62 -92 0 Z"/>
        <circle cx="0" cy="0" r="26"/>
        <circle cx="0" cy="0" r="10" ${fill}/>
        <path d="M-64 -52 Q0 -92 64 -52" ${softStroke}/>
        <path d="M-70 44 Q0 74 70 44" ${softStroke}/>
      </g>`;
    case "sun":
      return `<g ${stroke}>
        <circle cx="0" cy="0" r="48"/>
        <circle cx="0" cy="0" r="28" ${faint}/>
        ${Array.from({ length: 16 }, (_, i) => `<path d="M0 -62 V-86" transform="rotate(${i * 22.5})"/>`).join("")}
        <circle cx="0" cy="0" r="7" ${fill}/>
      </g>`;
    case "tree":
      return `<g ${stroke}>
        <path d="M0 88 V-24"/>
        <path d="M0 44 L-42 12 M0 20 L44 -12 M0 -4 L-34 -40 M0 -18 L28 -56"/>
        <path d="M-22 88 Q0 76 22 88" ${softStroke}/>
        <circle cx="-44" cy="4" r="14" ${faint}/>
        <circle cx="46" cy="-20" r="14" ${faint}/>
        <circle cx="30" cy="-60" r="12" ${faint}/>
        <circle cx="-36" cy="-44" r="12" ${faint}/>
      </g>`;
    case "cartouche":
      return `<g ${stroke}>
        <path d="M0 -96 Q58 -96 58 -44 V52 Q58 94 0 94 Q-58 94 -58 52 V-44 Q-58 -96 0 -96 Z"/>
        <path d="M-34 -48 H34 M-34 -18 H34 M-34 12 H34 M-34 42 H34" ${softStroke}/>
        <path d="M-74 96 H74" ${softStroke}/>
      </g>`;
    case "djed":
      return `<g ${stroke}>
        <path d="M-40 82 V-32 H40 V82 Z"/>
        <path d="M-56 -32 H56 M-52 -48 H52 M-46 -64 H46 M-38 -80 H38"/>
        <path d="M-40 10 H40 M-40 38 H40 M-40 66 H40" ${softStroke}/>
        <path d="M-62 82 H62"/>
      </g>`;
    default:
      return `<g ${stroke}><circle cx="0" cy="0" r="72"/><circle cx="0" cy="0" r="40" ${softStroke}/></g>`;
  }
}

const glyphs = ["ankh", "eye", "feather", "sun", "water", "lotus", "star", "serpent", "djed", "scales"];

function miniGlyph(kind, color, x, y, size = 26, opacity = 0.55) {
  const stroke = `stroke="${color}" fill="none" stroke-width="2" stroke-linecap="round" opacity="${opacity}"`;
  const shapes = {
    ankh: `<circle cx="0" cy="-9" r="7"/><path d="M0 -2 V15 M-11 2 H11"/>`,
    eye: `<path d="M-14 0 Q0 -10 14 0 Q0 10 -14 0Z"/><circle cx="0" cy="0" r="3"/>`,
    feather: `<path d="M0 14 C-7 5 -6 -8 0 -15 C6 -8 7 5 0 14Z M0 -12 V12"/>`,
    sun: `<circle cx="0" cy="0" r="6"/><path d="M0 -11 V-15 M0 11 V15 M-11 0 H-15 M11 0 H15 M-8 -8 L-11 -11 M8 8 L11 11 M8 -8 L11 -11 M-8 8 L-11 11"/>`,
    water: `<path d="M-14 -5 Q-7 -11 0 -5 T14 -5 M-14 5 Q-7 -1 0 5 T14 5"/>`,
    lotus: `<path d="M0 12 C-10 5 -10 -6 0 -13 C10 -6 10 5 0 12Z"/><path d="M-9 12 Q0 6 9 12"/>`,
    star: `<path d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4 Z"/>`,
    serpent: `<path d="M-12 8 C-2 8 -4 -4 4 -4 C10 -4 10 -12 6 -14"/><path d="M-12 8 Q-16 4 -12 0"/>`,
    djed: `<path d="M-7 14 V-9 H7 V14 M-10 -9 H10 M-8 -14 H8 M-6 -19 H6"/>`,
    scales: `<path d="M0 -14 V14 M-10 -9 H10 M-10 -9 L-14 0 H-6 Z M10 -9 L6 0 H14 Z"/>`,
  };
  return `<g transform="translate(${x} ${y}) scale(${size / 26})" ${stroke}>${shapes[kind] ?? shapes.star}</g>`;
}

function starField(random, accent) {
  const stars = [];
  const count = 46;
  for (let i = 0; i < count; i += 1) {
    const x = 88 + random() * 464;
    const y = 210 + random() * 500;
    const r = random() < 0.82 ? 0.8 + random() * 1.5 : 2 + random() * 1.6;
    const opacity = 0.18 + random() * 0.55;
    stars.push(
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${accent}" opacity="${opacity.toFixed(2)}"/>`,
    );
  }
  return stars.join("");
}

function archPath() {
  return "M70 730 V340 Q70 190 320 190 Q570 190 570 340 V730 Z";
}

function cardSvg(card) {
  const palette = paletteFor(card);
  const { accent, soft, deep, glow } = palette;
  const random = mulberry32(card.number * 7919 + 17);
  const isMajor = card.category === "major";
  const kind = isMajor
    ? majorMotifs[(card.number - 1) % majorMotifs.length]
    : minorMotifs[(card.number * 5 + (card.series?.length ?? 0)) % minorMotifs.length];
  const rotation = Math.round((random() - 0.5) * 14);
  const glyphA = glyphs[card.number % glyphs.length];
  const glyphB = glyphs[(card.number * 3 + 2) % glyphs.length];
  const glyphC = glyphs[(card.number * 7 + 4) % glyphs.length];
  const title = escapeXml(card.name);
  const alternate = card.alternateName ? escapeXml(card.alternateName) : "";
  const categoryLabel = isMajor
    ? "ARCANO MAYOR"
    : `ESCENA ${card.number} · ${(card.series ?? "").toUpperCase()}`;
  const number = String(card.number).padStart(2, "0");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(card.name)}, carta ${card.number}">
  <title>${title}${alternate ? ` · ${alternate}` : ""}</title>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#0A0E17"/>
      <stop offset="0.55" stop-color="${deep}"/>
      <stop offset="1" stop-color="#06080D"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="46%" r="58%">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.22"/>
      <stop offset="0.55" stop-color="${glow}" stop-opacity="0.06"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accent}"/>
      <stop offset="0.5" stop-color="${soft}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="50%" r="72%">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.55"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.4"/></feComponentTransfer>
    </filter>
    <clipPath id="arch"><path d="${archPath()}"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="16" y="16" width="${W - 32}" height="${H - 32}" rx="10" fill="none" stroke="url(#gold)" stroke-width="2"/>
  <rect x="27" y="27" width="${W - 54}" height="${H - 54}" rx="7" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="1"/>
  <path d="M16 76 H70 M570 76 H624 M16 924 H70 M570 924 H624" stroke="${accent}" stroke-opacity="0.55"/>
  <path d="M44 54 L58 68 L44 82 L30 68 Z M596 54 L610 68 L596 82 L582 68 Z" fill="none" stroke="${accent}" stroke-opacity="0.55"/>

  <text x="320" y="70" text-anchor="middle" fill="${soft}" fill-opacity="0.72" font-family="Georgia, 'Times New Roman', serif" font-size="13" letter-spacing="6">TAROT EGIPCIO</text>
  <path d="M92 94 H288 M352 94 H548" stroke="${accent}" stroke-opacity="0.35"/>
  <circle cx="320" cy="94" r="3" fill="${accent}"/>

  <g clip-path="url(#arch)">
    <rect x="70" y="190" width="500" height="540" fill="${deep}"/>
    <rect x="70" y="190" width="500" height="540" fill="url(#glow)"/>
    ${starField(random, accent)}
    <g transform="translate(320 452) rotate(${rotation})" opacity="0.98">
      <circle cx="0" cy="0" r="206" fill="none" stroke="${accent}" stroke-opacity="0.28"/>
      <circle cx="0" cy="0" r="188" fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-dasharray="2 10"/>
      <circle cx="0" cy="0" r="150" fill="none" stroke="${soft}" stroke-opacity="0.22"/>
      ${Array.from({ length: 24 }, (_, i) => `<path d="M0 -198 V-212" stroke="${accent}" stroke-opacity="${i % 3 === 0 ? 0.75 : 0.3}" stroke-width="${i % 3 === 0 ? 2 : 1}" transform="rotate(${i * 15})"/>`).join("")}
      <circle cx="0" cy="0" r="126" fill="${deep}" fill-opacity="0.55" stroke="${accent}" stroke-opacity="0.35"/>
      ${motif(kind, accent, soft)}
      <g transform="rotate(30) scale(1.12)" opacity="0.3">
        ${motif(kind, soft, soft).replaceAll('stroke-width="3"', 'stroke-width="1"')}
      </g>
    </g>
    <rect x="70" y="190" width="500" height="540" fill="url(#vignette)"/>
    <g opacity="0.8">
      ${miniGlyph(glyphA, accent, 104, 300, 24, 0.55)}
      ${miniGlyph(glyphB, accent, 104, 390, 24, 0.4)}
      ${miniGlyph(glyphC, accent, 104, 480, 24, 0.3)}
      ${miniGlyph(glyphB, accent, 536, 300, 24, 0.3)}
      ${miniGlyph(glyphC, accent, 536, 390, 24, 0.4)}
      ${miniGlyph(glyphA, accent, 536, 480, 24, 0.55)}
    </g>
    <path d="M70 706 H570" stroke="${accent}" stroke-opacity="0.5"/>
  </g>
  <path d="${archPath()}" fill="none" stroke="url(#gold)" stroke-width="2.5"/>
  <path d="M84 730 V344 Q84 206 320 206 Q556 206 556 344 V730" fill="none" stroke="${accent}" stroke-opacity="0.28"/>

  <circle cx="320" cy="190" r="36" fill="#080B12" stroke="${accent}" stroke-width="2"/>
  <circle cx="320" cy="190" r="28" fill="none" stroke="${accent}" stroke-opacity="0.4"/>
  <text x="320" y="199" text-anchor="middle" fill="${soft}" font-family="Georgia, 'Times New Roman', serif" font-size="25" letter-spacing="1">${number}</text>

  <text x="320" y="776" text-anchor="middle" fill="${accent}" fill-opacity="0.9" font-family="Georgia, 'Times New Roman', serif" font-size="11" letter-spacing="4">${categoryLabel}</text>
  <text x="320" y="822" text-anchor="middle" fill="${soft}" font-family="Georgia, 'Times New Roman', serif" font-size="${card.name.length > 20 ? 30 : 36}" letter-spacing="1">${title}</text>
  ${alternate ? `<text x="320" y="858" text-anchor="middle" fill="${accent}" fill-opacity="0.85" font-family="Georgia, 'Times New Roman', serif" font-size="16" font-style="italic">${alternate}</text>` : ""}
  <path d="M220 ${alternate ? 880 : 848} H290 M350 ${alternate ? 880 : 848} H420" stroke="${accent}" stroke-opacity="0.55"/>
  <path d="M320 ${alternate ? 874 : 842} L326 ${alternate ? 880 : 848} L320 ${alternate ? 886 : 854} L314 ${alternate ? 880 : 848} Z" fill="${accent}" opacity="0.8"/>
  <text x="320" y="${alternate ? 916 : 892}" text-anchor="middle" fill="${soft}" fill-opacity="0.6" font-family="Georgia, 'Times New Roman', serif" font-size="10" letter-spacing="3">ARCANA · BIBLIOTECA DE TAROT</text>

  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.16"/>
</svg>
`;
}

function deckCover({ id, title, subtitle, kicker, accent, soft, deep, kind, note }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.7" y2="1">
      <stop offset="0" stop-color="#070A11"/>
      <stop offset="0.55" stop-color="${deep}"/>
      <stop offset="1" stop-color="#05070B"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="60%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.26"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accent}"/>
      <stop offset="0.5" stop-color="${soft}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="800" height="1100" fill="url(#bg)"/>
  <rect x="20" y="20" width="760" height="1060" rx="12" fill="none" stroke="url(#gold)" stroke-width="2.5"/>
  <rect x="34" y="34" width="732" height="1032" rx="8" fill="none" stroke="${accent}" stroke-opacity="0.35"/>
  <rect x="20" y="20" width="760" height="1060" rx="12" fill="url(#glow)"/>
  <path d="M60 90 L80 110 L60 130 L40 110 Z M740 90 L760 110 L740 130 L720 110 Z M60 990 L80 1010 L60 1030 L40 1010 Z M740 990 L760 1010 L740 1030 L720 1010 Z" fill="none" stroke="${accent}" stroke-opacity="0.6"/>

  <text x="400" y="108" text-anchor="middle" fill="${soft}" fill-opacity="0.7" font-family="Georgia, 'Times New Roman', serif" font-size="15" letter-spacing="8">${escapeXml(kicker)}</text>
  <path d="M170 132 H340 M460 132 H630" stroke="${accent}" stroke-opacity="0.4"/>
  <circle cx="400" cy="132" r="3" fill="${accent}"/>

  <g transform="translate(400 500)">
    <circle cx="0" cy="0" r="232" fill="none" stroke="${accent}" stroke-opacity="0.24"/>
    <circle cx="0" cy="0" r="212" fill="none" stroke="${accent}" stroke-opacity="0.42" stroke-dasharray="2 12"/>
    ${Array.from({ length: 36 }, (_, i) => `<path d="M0 -226 V-244" stroke="${accent}" stroke-opacity="${i % 3 === 0 ? 0.7 : 0.25}" transform="rotate(${i * 10})"/>`).join("")}
    <circle cx="0" cy="0" r="168" fill="${deep}" fill-opacity="0.6" stroke="${accent}" stroke-opacity="0.3"/>
    ${motif(kind, accent, soft)}
  </g>
  <text x="400" y="818" text-anchor="middle" fill="${soft}" font-family="Georgia, 'Times New Roman', serif" font-size="46" letter-spacing="2">${escapeXml(title)}</text>
  <text x="400" y="860" text-anchor="middle" fill="${accent}" font-family="Georgia, 'Times New Roman', serif" font-size="19" font-style="italic">${escapeXml(subtitle)}</text>
  <path d="M240 894 H360 M440 894 H560" stroke="${accent}" stroke-opacity="0.55"/>
  <path d="M400 884 L409 894 L400 904 L391 894 Z" fill="${accent}" opacity="0.85"/>
  <text x="400" y="944" text-anchor="middle" fill="${soft}" fill-opacity="0.6" font-family="Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4">${escapeXml(note)}</text>
  <text x="400" y="1024" text-anchor="middle" fill="${accent}" fill-opacity="0.7" font-family="Georgia, 'Times New Roman', serif" font-size="10" letter-spacing="5">ARCANA · BIBLIOTECA DE TAROT</text>
  <rect width="800" height="1100" filter="url(#grain)" opacity="0.15"/>
</svg>
`;
}

function backSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Dorso del Tarot Egipcio">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#0A0E17"/>
      <stop offset="0.6" stop-color="#101827"/>
      <stop offset="1" stop-color="#070A10"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="#C9A227" stroke-opacity="0.08"/>
    </pattern>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect x="18" y="18" width="${W - 36}" height="${H - 36}" rx="10" fill="none" stroke="#C9A227" stroke-width="2"/>
  <rect x="30" y="30" width="${W - 60}" height="${H - 60}" rx="8" fill="none" stroke="#C9A227" stroke-opacity="0.35"/>
  <g transform="translate(320 500)">
    <circle cx="0" cy="0" r="220" fill="none" stroke="#C9A227" stroke-opacity="0.25"/>
    <circle cx="0" cy="0" r="196" fill="none" stroke="#C9A227" stroke-opacity="0.45" stroke-dasharray="2 12"/>
    ${Array.from({ length: 32 }, (_, i) => `<path d="M0 -216 V-236" stroke="#C9A227" stroke-opacity="${i % 4 === 0 ? 0.75 : 0.25}" transform="rotate(${i * 11.25})"/>`).join("")}
    <circle cx="0" cy="0" r="158" fill="#0B1019" stroke="#C9A227" stroke-opacity="0.3"/>
    ${motif("scarab", "#C9A227", "#E8DCC0")}
    <circle cx="0" cy="0" r="248" fill="none" stroke="#C9A227" stroke-opacity="0.16"/>
  </g>
  <text x="320" y="830" text-anchor="middle" fill="#E8DCC0" fill-opacity="0.75" font-family="Georgia, 'Times New Roman', serif" font-size="13" letter-spacing="7">TAROT EGIPCIO</text>
  <path d="M200 856 H290 M350 856 H440" stroke="#C9A227" stroke-opacity="0.5"/>
  <text x="320" y="892" text-anchor="middle" fill="#C9A227" fill-opacity="0.8" font-family="Georgia, 'Times New Roman', serif" font-size="10" letter-spacing="4">ARCANA</text>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.15"/>
</svg>
`;
}

mkdirSync(OUT_CARDS, { recursive: true });
mkdirSync(OUT_BACK, { recursive: true });
mkdirSync(OUT_DECKS, { recursive: true });

for (const card of cards) {
  const filename = `${String(card.number).padStart(2, "0")}-${card.slug}.svg`;
  writeFileSync(join(OUT_CARDS, filename), cardSvg(card), "utf8");
}

writeFileSync(join(OUT_BACK, "back.svg"), backSvg(), "utf8");

writeFileSync(
  join(OUT_DECKS, "tarot-egipcio.svg"),
  deckCover({
    id: "tarot-egipcio",
    title: "TAROT EGIPCIO",
    subtitle: "de Margarita Arnal",
    kicker: "BIBLIOTECA DE ESTUDIO",
    accent: "#C9A227",
    soft: "#E8DCC0",
    deep: "#101827",
    kind: "scarab",
    note: "78 CARTAS · GUÍA DE ESTUDIO",
  }),
  "utf8",
);

writeFileSync(
  join(OUT_DECKS, "rider-waite.svg"),
  deckCover({
    id: "rider-waite",
    title: "RIDER-WAITE",
    subtitle: "El clásico ilustrado",
    kicker: "PRÓXIMAMENTE",
    accent: "#8FB3C9",
    soft: "#E9E3D5",
    deep: "#0C1420",
    kind: "sun",
    note: "78 CARTAS · EN PREPARACIÓN",
  }),
  "utf8",
);

// La portada de Marsella se genera con scripts/generate-marseille-art.mjs.

console.log(`Generadas ${cards.length} cartas, el dorso y 2 portadas en public/images.`);
