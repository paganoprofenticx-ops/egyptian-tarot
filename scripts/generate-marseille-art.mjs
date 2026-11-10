#!/usr/bin/env node
/**
 * Genera las ilustraciones provisionales del Tarot de Marsella.
 *
 * El estilo busca evocar los naipes grabados europeos: papel marfil, tinta
 * oscura, terracota, añil y oro viejo. Cada arcano mayor recibe una composición
 * propia y cada arcano menor respeta la lectura por palos (bastos, copas,
 * espadas y oros) con pips y figuras de corte.
 *
 * Las imágenes son originales y se generan por código. No reproducen ninguna
 * edición comercial. Para sustituirlas por arte final basta con reemplazar los
 * archivos manteniendo la ruta y el nombre.
 *
 * Uso: npm run art:marseille
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cards = JSON.parse(
  readFileSync(join(root, "src/data/marseille/cards.json"), "utf8"),
);

const OUT_CARDS = join(root, "public/images/cards/marseille");
const OUT_DECKS = join(root, "public/images/decks");

const W = 640;
const H = 1000;

const C = {
  paper: "#EFE3C8",
  paperLight: "#F8EFDB",
  paperSoft: "#E6D5B6",
  paperDeep: "#D4BE97",
  ink: "#2A2018",
  inkSoft: "#4B3A2B",
  charcoal: "#211A14",
  red: "#B65A4A",
  redDeep: "#8E3B32",
  blue: "#3E5A78",
  blueDeep: "#293F56",
  gold: "#A98131",
  goldLight: "#D8B863",
  green: "#6F8060",
  ochre: "#C08A4A",
  rose: "#A86B6B",
  violet: "#6C5B7B",
};

const suitStyles = {
  bastos: { accent: C.red, fill: "#EAC5B7", deep: C.redDeep, label: "Bastos", element: "Fuego" },
  copas: { accent: C.blue, fill: "#C6D7E7", deep: C.blueDeep, label: "Copas", element: "Agua" },
  espadas: { accent: "#4C5F70", fill: "#D6DEE5", deep: "#2E3B47", label: "Espadas", element: "Aire" },
  oros: { accent: C.gold, fill: "#EED9A4", deep: "#77571F", label: "Oros", element: "Tierra" },
};

const majorAccents = [
  C.red, C.gold, C.blue, C.red, C.blueDeep, C.ochre, C.rose, C.blue,
  C.red, C.inkSoft, C.gold, C.red, C.blue, C.charcoal, C.blue, C.redDeep,
  C.red, C.blue, C.blueDeep, C.gold, C.ochre, C.green,
];

const majorFrench = {
  0: "Le Mat",
  1: "Le Bateleur",
  2: "La Papesse",
  3: "L'Impératrice",
  4: "L'Empereur",
  5: "Le Pape",
  6: "L'Amoureux",
  7: "Le Chariot",
  8: "La Justice",
  9: "L'Hermite",
  10: "La Roue de Fortune",
  11: "La Force",
  12: "Le Pendu",
  13: "L'Arcane sans Nom",
  14: "La Tempérance",
  15: "Le Diable",
  16: "La Maison Dieu",
  17: "L'Étoile",
  18: "La Lune",
  19: "Le Soleil",
  20: "Le Jugement",
  21: "Le Monde",
};

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function roman(number) {
  if (number === 0) return "0";
  const values = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let remaining = number;
  let result = "";
  for (const [value, numeral] of values) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return result;
}

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

const path = (d, color = C.ink, width = 3, extra = "") =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;

const shape = (d, fill, color = C.ink, width = 2.5, extra = "") =>
  `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linejoin="round" ${extra}/>`;

const circle = (cx, cy, r, fill = "none", color = C.ink, width = 2.5, extra = "") =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${color === "none" ? "none" : color}" stroke-width="${width}" ${extra}/>`;

const dot = (cx, cy, r, fill = C.ink, opacity = 1) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}"/>`;

const line = (x1, y1, x2, y2, color = C.ink, width = 3, extra = "") =>
  `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" ${extra}/>`;

function body({
  x = 0,
  y = 0,
  s = 1,
  robe = C.paperLight,
  accent = C.red,
  crown = false,
  hood = false,
  halo = false,
  face = true,
  seated = false,
}) {
  const hem = seated ? 76 : 88;
  const robePath = seated
    ? `M-42 ${hem} Q-48 16 -26 -46 L26 -46 Q48 16 42 ${hem} Z`
    : `M-25 ${hem} Q-31 22 -20 -46 L20 -46 Q31 22 25 ${hem} Z`;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${halo ? circle(0, -96, 31, "none", accent, 1.5, 'stroke-dasharray="2 5"') : ""}
    <path d="${robePath}" fill="${robe}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-20 -46 Q0 -58 20 -46" fill="${robe}" stroke="${C.ink}" stroke-width="3"/>
    ${seated ? path(`M-42 ${hem - 6} Q0 ${hem + 10} 42 ${hem - 6}`, C.ink, 2.5) : ""}
    <circle cx="0" cy="-70" r="16" fill="${C.paperLight}" stroke="${C.ink}" stroke-width="3"/>
    ${face ? path("M-8 -67 Q0 -60 8 -67", C.ink, 1.6) : ""}
    ${
      crown
        ? `<path d="M-16 -83 L-16 -99 L-8 -90 L0 -105 L8 -90 L16 -99 L16 -83 Z" fill="${C.goldLight}" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/>
           ${dot(-8, -89, 1.7, C.red)}${dot(0, -96, 1.7, C.red)}${dot(8, -89, 1.7, C.red)}`
        : ""
    }
    ${
      hood
        ? `<path d="M-23 -78 Q0 -104 23 -78 Q16 -54 0 -51 Q-16 -54 -23 -78 Z" fill="${accent}" fill-opacity="0.32" stroke="${C.ink}" stroke-width="2.5"/>`
        : ""
    }
  </g>`;
}

function arm(x, y, shoulderX, shoulderY, handX, handY, accent = C.ink) {
  return path(`M${x + shoulderX} ${y + shoulderY} Q${(x + shoulderX + handX) / 2} ${y + (shoulderY + handY) / 2 - 8} ${x + handX} ${y + handY}`, accent, 3);
}

function suitMark(suit, scale = 1, accent = C.ink, fill = "none", deep = C.ink) {
  const s = `transform="scale(${scale})"`;
  switch (suit) {
    case "bastos":
      return `<g ${s}>
        ${path("M0 -48 V48", deep, 7)}
        ${path("M0 -30 C-18 -40 -30 -30 -34 -18 C-19 -20 -8 -12 0 -2", deep, 3)}
        ${path("M0 -30 C18 -40 30 -30 34 -18 C19 -20 8 -12 0 -2", deep, 3)}
        ${path("M0 4 C-18 -6 -30 4 -34 16 C-19 14 -8 22 0 32", deep, 3)}
        ${path("M0 4 C18 -6 30 4 34 16 C19 14 8 22 0 32", deep, 3)}
        ${dot(0, -50, 5, accent)}${dot(0, 50, 5, accent)}
        ${circle(0, 0, 7, fill, deep, 2)}
      </g>`;
    case "copas":
      return `<g ${s}>
        ${shape("M-31 -32 H31 Q28 2 0 20 Q-28 2 -31 -32 Z", fill, deep, 3)}
        ${path("M-31 -32 H31", deep, 3)}
        ${path("M0 20 V49", deep, 5)}
        ${path("M-21 52 H21", deep, 5)}
        ${path("M-22 -22 Q0 -8 22 -22", accent, 2, 'opacity="0.8"')}
        ${dot(0, -37, 3, accent)}${dot(-14, -24, 2.3, accent)}${dot(14, -24, 2.3, accent)}
      </g>`;
    case "espadas":
      return `<g ${s}>
        ${shape("M0 -56 L9 -22 V22 H-9 V-22 Z", fill, deep, 3)}
        ${path("M0 -50 V18", accent, 2)}
        ${path("M-30 22 H30", deep, 5)}
        ${path("M0 22 V46", deep, 5)}
        ${circle(0, 51, 7, fill, deep, 3)}
        ${path("M-17 29 Q0 39 17 29", deep, 2)}
      </g>`;
    case "oros":
    default:
      return `<g ${s}>
        ${circle(0, 0, 38, fill, deep, 3)}
        ${circle(0, 0, 29, "none", accent, 2)}
        ${path("M0 -21 L7 -7 L21 0 L7 7 L0 21 L-7 7 L-21 0 L-7 -7 Z",deep,2.4)}
        ${dot(0, 0, 4.5, accent)}
        ${dot(-18, -18, 2.4, accent)}${dot(18, -18, 2.4, accent)}${dot(-18, 18, 2.4, accent)}${dot(18, 18, 2.4, accent)}
      </g>`;
  }
}

/* ------------------------------------------------------------------ */
/* Arcanos mayores                                                     */
/* ------------------------------------------------------------------ */

function majorArt(number, accent) {
  const ink = C.ink;
  const soft = C.paperLight;
  const gold = C.goldLight;

  switch (number) {
    case 0: {
      // El Loco: caminante, bastón con hatillo y perro.
      return `
        ${shape("M-190 176 L-38 176 L-12 188 L-26 210 L-190 210 Z", "#D9C39C", ink, 2.5)}
        ${path("M-38 176 L-12 188 L-26 210", ink, 2)}
        ${path("M-190 176 H-38", ink, 2)}
        ${circle(-110, -128, 28, "none", accent, 2)}
        ${Array.from({ length: 12 }, (_, i) => path(`M-110 ${-160} V-176`, accent, 1.7, `transform="rotate(${i * 30} -110 -128)"`)).join("")}
        ${body({ x: 18, y: 6, s: 1.18, robe: "#E7CDAF", accent, hood: false })}
        ${path("M-2 -86 Q18 -112 38 -86", ink, 2.5)}
        ${path("M38 -86 Q50 -96 54 -84", accent, 3)}
        ${arm(18, 6, -16, -34, 34, 8)}
        ${arm(18, 6, 16, -34, 58, -24)}
        ${path("M58 -24 L108 164", ink, 5)}
        ${shape("M58 -24 Q38 -46 20 -36 Q44 -14 58 -24 Z", soft, ink, 2.5)}
        ${shape("M58 -24 Q76 -48 96 -38 Q74 -12 58 -24 Z", soft, ink, 2.5)}
        ${line(58, -24, 90, 4, accent, 2.2)}
        ${body({ x: -104, y: 138, s: 0.44, robe: "#D8B98B", accent, face: true })}
        ${path("M-126 150 Q-150 142 -166 154 Q-150 164 -128 158", ink, 2.5)}
        ${path("M-104 174 L-104 196 M-86 174 L-86 196 M-120 174 L-120 196", ink, 3)}
        ${path("M-166 154 Q-180 142 -186 156", ink, 2.5)}
        ${dot(-112, 132, 2.2, ink)}
      `;
    }
    case 1: {
      // El Bateleur: mesa con los cuatro palos.
      return `
        ${path("M-168 178 H168", ink, 4)}
        ${body({ x: -8, y: -24, s: 1.08, robe: "#E8CDAE", accent })}
        ${shape("M-40 -114 H24 L34 -94 H-50 Z", "#D8B863", ink, 2.5)}
        ${path("M-50 -94 Q-8 -84 34 -94", ink, 2)}
        ${arm(-8, -24, -18, -38, -72, -8)}
        ${arm(-8, -24, 18, -38, 64, -44)}
        ${shape("M-118 86 H118 L104 108 H-104 Z", "#D9C39C", ink, 3)}
        ${path("M-88 108 V178 M88 108 V178", ink, 4)}
        ${path("M-118 86 H118", ink, 2)}
        <g transform="translate(-76 44)">${suitMark("copas", 0.55, C.blue, "#C6D7E7", C.blueDeep)}</g>
        <g transform="translate(-22 44)">${suitMark("oros", 0.5, C.gold, "#EED9A4", "#77571F")}</g>
        <g transform="translate(30 44)">${suitMark("espadas", 0.5, "#4C5F70", "#D6DEE5", "#2E3B47")}</g>
        <g transform="translate(82 44)">${suitMark("bastos", 0.5, C.red, "#EAC5B7", C.redDeep)}</g>
      `;
    }
    case 2: {
      // La Papisa: figura sedente, libro y velo.
      return `
        ${path("M-164 182 V-140 Q-164 -198 0 -198 Q164 -198 164 -140 V182",ink,3)}
        ${path("M-146 182 V-136 Q-146 -180 0 -180 Q146 -180 146 -136 V182",accent,1.5,'stroke-dasharray="3 7"')}
        ${body({ x: 0, y: 22, s: 1.15, robe: "#E9D5B7", accent, seated: true, crown: true })}
        ${path("M-50 -80 Q0 -112 50 -80", accent, 2.5)}
        ${arm(0, 22, -22, -32, -68, 8)}
        ${arm(0, 22, 22, -32, 62, 4)}
        ${shape("M-35 22 H35 V74 H-35 Z", soft, ink, 2.5)}
        ${path("M-35 38 H35 M-35 52 H35 M-35 66 H35", ink, 1.4)}
        ${path("M-22 30 Q0 38 22 30", accent, 1.6)}
        ${path("M-108 178 H108", ink, 3)}
        ${path("M-122 154 Q-108 178 -94 154", ink, 2)}
      `;
    }
    case 3: {
      // La Emperatriz: corona, cetro y escudo con águila.
      return `
        ${path("M-166 182 V-150 Q-166 -196 0 -196 Q166 -196 166 -150 V182",ink,2.5)}
        ${body({ x: -8, y: 26, s: 1.18, robe: "#E7C7B6", accent, seated: true, crown: true })}
        ${arm(-8, 26, -24, -30, -76, -64)}
        ${path("M-76 -64 V-152", ink, 5)}
        ${circle(-76, -158, 8, gold, ink, 2.5)}
        ${arm(-8, 26, 24, -30, 72, -10)}
        ${shape("M40 -10 Q92 -44 132 -10 V96 Q92 130 40 96 Z", "#D6DEE5", ink, 2.5)}
        ${path("M84 -26 L60 20 L84 8 L108 26 L96 58", ink, 2.5)}
        ${path("M84 0 V72", accent, 1.6)}
        ${path("M-128 178 H128", ink, 3)}
        ${dot(-130, -112, 3, accent)}${dot(130, -112, 3, accent)}
      `;
    }
    case 4: {
      // El Emperador: trono, orbe y cetro.
      return `
        ${path("M-152 184 V-156 H152 V184",ink,3)}
        ${path("M-132 184 V-136 H132 V184",accent,1.5,'stroke-dasharray="3 7"')}
        ${body({ x: 0, y: 28, s: 1.16, robe: "#C9D6E4", accent, seated: true, crown: true })}
        ${arm(0, 28, -24, -30, -82, -78)}
        ${path("M-82 -78 L-98 -156", ink, 5)}
        ${circle(-99, -162, 8, gold, ink, 2.5)}
        ${arm(0, 28, 24, -30, 76, -18)}
        ${circle(82, -28, 20, "#EED9A4", ink, 2.5)}
        ${path("M82 -48 V-8 M62 -28 H102", accent, 2)}
        ${path("M-70 184 V118 H70 V184", ink, 2.5)}
        ${path("M-58 130 H58", accent, 1.8)}
        ${path("M-116 184 H116", ink, 3)}
      `;
    }
    case 5: {
      // El Papa: triple cruz, bendición y dos columnas.
      return `
        ${path("M-158 182 V-150", ink, 4)}
        ${path("M158 182 V-150", ink, 4)}
        ${path("M-158 -150 H158", ink, 3)}
        ${body({ x: 6, y: 26, s: 1.16, robe: "#E9D6BA", accent, seated: true, crown: true })}
        ${shape("M-36 -118 H48 L64 -98 H-50 Z", "#D8B863", ink, 2.5)}
        ${arm(6, 26, -22, -32, -70, -60)}
        ${path("M-70 -60 V-170", ink, 5)}
        ${path("M-90 -140 H-50 M-86 -162 H-54 M-82 -118 H-58", ink, 3.5)}
        ${arm(6, 26, 26, -30, 82, -76)}
        ${path("M82 -76 L74 -94 M82 -76 L92 -90", ink, 2.5)}
        ${path("M-120 182 H120", ink, 3)}
        ${path("M-120 156 Q-106 178 -92 156", ink, 2)}
        ${dot(-158, -170, 4, accent)}${dot(158, -170, 4, accent)}
      `;
    }
    case 6: {
      // Los Enamorados: dos figuras, cupido y sol.
      return `
        ${circle(0, -150, 34, "none", accent, 2)}
        ${Array.from({ length: 12 }, (_, i) => path("M0 -190 V-204", accent, 1.7, `transform="rotate(${i * 30} 0 -150)"`)).join("")}
        ${body({ x: -66, y: 38, s: 0.98, robe: "#E7C7B6", accent, hood: false })}
        ${body({ x: 66, y: 38, s: 0.98, robe: "#C9D6E4", accent, hood: false })}
        ${path("M-66 -54 Q-40 -92 -8 -136", ink, 3)}
        ${path("M66 -54 Q40 -92 8 -136", ink, 3)}
        ${shape("M-12 -136 L0 -154 L12 -136 Z", accent, ink, 2)}
        ${path("M-150 172 H150", ink, 3)}
        ${body({ x: 0, y: -96, s: 0.45, robe: soft, accent })}
        ${path("M-22 -136 Q0 -154 22 -136", ink, 2.5)}
        ${path("M-38 -108 L-72 -92 M38 -108 L72 -92", ink, 2)}
        ${path("M-72 -92 L-84 -84 M72 -92 L84 -84", ink, 2)}
        ${path("M-84 -84 L-92 -76 M84 -84 L92 -76", ink, 1.5)}
        ${path("M-92 -76 L-98 -70 M92 -76 L98 -70", ink, 1.5)}
        ${dot(-66, -104, 2.5, accent)}${dot(66, -104, 2.5, accent)}
      `;
    }
    case 7: {
      // El Carro: conductor, dos caballos y dosel.
      return `
        ${path("M-160 -170 H160", ink, 4)}
        ${path("M-130 -170 V-60 M130 -170 V-60", ink, 3)}
        ${path("M-130 -166 Q0 -138 130 -166", ink, 2.5)}
        ${shape("M-128 44 H128 L110 112 H-110 Z", "#D8B863", ink, 3)}
        ${path("M-128 44 H128", ink, 2)}
        ${body({ x: 0, y: -36, s: 0.86, robe: "#E7C7B6", accent, crown: true })}
        ${arm(0, -36, -20, -30, -78, -64)}
        ${path("M-78 -64 V-140", ink, 4)}
        ${path("M-94 -140 H-62", ink, 4)}
        ${arm(0, -36, 20, -30, 78, -64)}
        ${path("M78 -64 L96 -110", ink, 4)}
        ${circle(98, -116, 7, gold, ink, 2)}
        ${body({ x: -82, y: 136, s: 0.62, robe: "#D8B98B", accent, face: true })}
        ${body({ x: 82, y: 136, s: 0.62, robe: "#D8B98B", accent, face: true })}
        ${path("M-140 182 H140", ink, 3)}
        ${path("M-104 146 Q-82 120 -60 146 M104 146 Q82 120 60 146", ink, 2.5)}
      `;
    }
    case 8: {
      // La Justicia: balanza y espada.
      return `
        ${path("M-160 182 V-150 H160 V182",ink,2.5)}
        ${body({ x: 0, y: 26, s: 1.14, robe: "#E7C7B6", accent, seated: true, crown: true })}
        ${arm(0, 26, -22, -32, -72, -42)}
        ${path("M-72 -42 V-150 M-126 -150 H-18", ink, 4)}
        ${path("M-126 -150 V-116 M-18 -150 V-116", ink, 3)}
        ${shape("M-150 -116 Q-126 -80 -102 -116 Z", soft, ink, 2.5)}
        ${shape("M-42 -116 Q-18 -80 6 -116 Z", soft, ink, 2.5)}
        ${arm(0, 26, 24, -30, 78, -66)}
        ${path("M78 -66 V-164", ink, 5)}
        ${path("M58 -40 H98", ink, 4)}
        ${shape("M78 -164 L84 -148 L78 -132 L72 -148 Z", gold, ink, 2)}
        ${path("M-130 182 H130", ink, 3)}
        ${path("M-128 158 Q-114 180 -100 158", ink, 2)}
      `;
    }
    case 9: {
      // El Ermitaño: capucha, farol y bastón.
      return `
        ${path("M-170 182 Q-120 160 -70 182 T30 182 T130 182 T190 182",ink,2.5)}
        ${body({ x: -4, y: 14, s: 1.18, robe: "#D7C5A9", accent, hood: true })}
        ${arm(-4, 14, -24, -34, -78, -48)}
        ${path("M-78 -48 V-128", ink, 4)}
        ${shape("M-106 -128 H-50 V-88 H-106 Z", "#F3E2B7", ink, 2.5)}
        ${path("M-98 -128 V-88 M-86 -128 V-88 M-74 -128 V-88 M-62 -128 V-88", ink, 1.2)}
        ${circle(-78, -140, 5, gold, ink, 2)}
        ${arm(-4, 14, 24, -30, 72, 30)}
        ${path("M72 30 L86 176", ink, 4)}
        ${path("M-150 182 H150", ink, 3)}
        ${dot(-134, -132, 2.5, accent)}${dot(132, -102, 2.5, accent)}
      `;
    }
    case 10: {
      // La Rueda de la Fortuna.
      return `
        ${circle(0, 0, 148, "none", ink, 4)}
        ${circle(0, 0, 124, "none", accent, 2)}
        ${circle(0, 0, 52, "none", ink, 3)}
        ${Array.from({ length: 8 }, (_, i) => path("M0 -140 V-54", ink, 3, `transform="rotate(${i * 45})"`)).join("")}
        ${Array.from({ length: 8 }, (_, i) => circle(Math.cos((i * 45 * Math.PI) / 180) * 140, Math.sin((i * 45 * Math.PI) / 180) * 140, 7, gold, ink, 2)).join("")}
        ${circle(0, 0, 22, C.paperLight, ink, 3)}
        ${path("M0 -22 L7 -7 L22 0 L7 7 L0 22 L-7 7 L-22 0 L-7 -7 Z",accent,2)}
        ${body({ x: -104, y: 120, s: 0.42, robe: "#D8B98B", accent })}
        ${body({ x: 0, y: -166, s: 0.42, robe: "#C9D6E4", accent, crown: true })}
        ${body({ x: 104, y: 120, s: 0.42, robe: "#E7C7B6", accent })}
        ${path("M-30 -148 Q0 -170 30 -148", ink, 2)}
        ${path("M-126 138 Q-104 116 -84 138", ink, 2)}
        ${path("M84 138 Q104 116 126 138", ink, 2)}
      `;
    }
    case 11: {
      // La Fuerza: mujer y león.
      return `
        ${path("M-160 182 H160", ink, 3)}
        ${body({ x: -28, y: 12, s: 1.1, robe: "#E7C7B6", accent, halo: true })}
        ${path("M-52 -118 Q-28 -140 -4 -118", ink, 2.5)}
        ${arm(-28, 12, -24, -34, -88, -10)}
        ${arm(-28, 12, 8, -36, 58, -24)}
        ${shape("M-110 48 Q-138 10 -120 -26 Q-100 -64 -54 -54 Q-18 -46 -18 0 Q-18 44 -56 58 Q-88 68 -110 48 Z", "#E5C995", ink, 3)}
        ${shape("M-120 -26 Q-142 -44 -150 -24 Q-144 -4 -124 -8", "#E5C995", ink, 2.5)}
        ${circle(-96, -16, 6, ink)}
        ${path("M-64 -44 Q-76 -22 -60 -6 M-34 -40 Q-48 -20 -30 -2", accent, 2.5)}
        ${path("M-112 48 Q-96 62 -76 56", ink, 2)}
        ${path("M-156 78 Q-132 58 -106 74", ink, 2)}
        ${path("M-104 74 L-92 88 M-128 70 L-120 86", ink, 2)}
      `;
    }
    case 12: {
      // El Colgado: horca y figura invertida.
      return `
        ${path("M-132 182 V-176 H132", ink, 5)}
        ${path("M-132 -176 H-52", ink, 4)}
        ${path("M-96 -176 V-132", ink, 3)}
        ${path("M-96 -132 Q-96 -108 -74 -108", ink, 3)}
        ${body({ x: -74, y: 20, s: 1.05, robe: "#E7C7B6", accent, face: true }).replace(
          "</g>",
          `<path d="M-20 20 Q0 10 20 20" fill="none" stroke="${ink}" stroke-width="2.5"/></g>`,
        )}
        ${path("M-74 -90 V-108", ink, 3)}
        ${path("M-74 -90 L-52 -54", ink, 3)}
        ${path("M-54 -68 L-36 -44", ink, 3)}
        ${path("M-92 -66 L-112 -42", ink, 3)}
        ${circle(-74, -8, 20, "none", accent, 2)}
        ${circle(-74, -8, 12, "none", accent, 1.5, 'stroke-dasharray="2 4"')}
        ${path("M-160 182 H160", ink, 3)}
        ${dot(-130, 150, 3, gold)}${dot(130, 150, 3, gold)}
      `;
    }
    case 13: {
      // La Muerte: esqueleto con guadaña.
      return `
        ${path("M-146 182 H146", ink, 3)}
        ${body({ x: 0, y: 18, s: 1.15, robe: C.charcoal, accent, hood: true })}
        ${shape("M-22 -74 Q0 -98 22 -74", C.paperLight, ink, 2)}
        ${circle(-8, -70, 3, C.paperLight)}${circle(8, -70, 3, C.paperLight)}
        ${path("M-18 -56 H18 M-18 -42 H18 M-18 -28 H18", C.paperLight, 2)}
        ${arm(0, 18, -24, -32, -88, -70)}
        ${path("M-88 -70 L-30 -136", ink, 4)}
        ${path("M-30 -136 Q-6 -160 20 -132 Q-4 -112 -30 -136 Z",C.paperLight,3)}
        ${path("M-160 -136 Q-118 -156 -76 -136", ink, 2.5)}
        ${arm(0, 18, 24, -32, 78, -8)}
        ${path("M78 -8 L104 84", ink, 4)}
        ${shape("M36 -156 Q52 -170 68 -156 Q52 -142 36 -156 Z", gold, ink, 2)}
        ${path("M-74 170 L-52 156 L-30 170", ink, 2)}
      `;
    }
    case 14: {
      // La Templanza: ángel que vierte entre dos copas.
      return `
        ${path("M-170 182 Q-110 160 -60 182 T40 182 T140 182 T190 182",ink,2.5)}
        ${body({ x: 0, y: 18, s: 1.12, robe: "#C9D6E4", accent, halo: true })}
        ${shape("M-58 -26 Q-116 -78 -154 -26 Q-118 22 -58 -26 Z", "#E6D5B6", ink, 2.5)}
        ${shape("M58 -26 Q116 -78 154 -26 Q118 22 58 -26 Z", "#E6D5B6", ink, 2.5)}
        ${arm(0, 18, -22, -34, -82, -48)}
        ${arm(0, 18, 22, -34, 82, -48)}
        <g transform="translate(-92 -78)">${suitMark("copas", 0.55, C.blue, "#C6D7E7", C.blueDeep)}</g>
        <g transform="translate(92 -78)">${suitMark("copas", 0.55, C.blue, "#C6D7E7", C.blueDeep)}</g>
        ${path("M-70 -54 Q-30 -18 70 -54", accent, 3, 'stroke-dasharray="4 6"')}
        ${path("M-120 182 H120", ink, 3)}
        ${dot(-132, -120, 2.5, accent)}${dot(132, -120, 2.5, accent)}
      `;
    }
    case 15: {
      // El Diablo: figura cornuda y dos cautivos.
      return `
        ${shape("M-118 182 H118 L94 138 H-94 Z", "#D9C39C", ink, 3)}
        ${body({ x: 0, y: -8, s: 1.08, robe: "#E7C7B6", accent })}
        ${path("M-28 -80 Q-44 -124 -60 -134 M28 -80 Q44 -124 60 -134", ink, 4)}
        ${path("M-28 -80 Q-30 -98 -22 -108 M28 -80 Q30 -98 22 -108", accent, 3)}
        ${circle(-9, -74, 3, ink)}${circle(9, -74, 3, ink)}
        ${path("M-14 -58 Q0 -50 14 -58", ink, 2)}
        ${arm(0, -8, -24, -34, -74, 16)}
        ${arm(0, -8, 24, -34, 74, 16)}
        ${path("M-110 138 Q-78 114 -56 138 M110 138 Q78 114 56 138", ink, 3)}
        ${body({ x: -96, y: 128, s: 0.54, robe: "#D8B98B", accent })}
        ${body({ x: 96, y: 128, s: 0.54, robe: "#C9D6E4", accent })}
        ${path("M-82 116 Q-48 136 -16 116 M82 116 Q48 136 16 116", ink, 3)}
        ${circle(0, -148, 16, "none", gold, 2)}
        ${path("M0 -164 V-132 M-16 -148 H16", gold, 2)}
        ${dot(-146, 74, 3, accent)}${dot(146, 74, 3, accent)}
      `;
    }
    case 16: {
      // La Torre: rayo, llamas y figuras que caen.
      return `
        ${shape("M-50 -36 H50 L64 182 H-64 Z", "#D9C39C", ink, 3)}
        ${path("M-64 182 H64", ink, 3)}
        ${shape("M-24 -36 V-96 H24 V-36", "#D8B863", ink, 2.5)}
        ${path("M-38 0 H38 M-42 44 H42 M-46 88 H46 M-50 132 H50", ink, 2)}
        ${path("M-12 0 H12 V26 H-12 Z M-12 44 H12 V70 H-12 Z",ink,2)}
        ${path("M50 -96 L108 -176 L126 -116 L170 -160", accent, 4)}
        ${path("M108 -176 L98 -140 L126 -116", accent, 3)}
        ${path("M-64 -30 Q-96 -66 -74 -100 Q-60 -70 -36 -84 Q-56 -48 -38 -24", C.red, 3)}
        ${path("M64 -24 Q96 -60 78 -94 Q60 -66 42 -80 Q58 -48 38 -22", C.red, 3)}
        ${body({ x: -102, y: 86, s: 0.48, robe: "#E7C7B6", accent })}
        ${body({ x: 102, y: 86, s: 0.48, robe: "#C9D6E4", accent })}
        ${path("M-102 86 L-132 54 M102 86 L132 54", ink, 2.5)}
        ${path("M-148 182 H148", ink, 3)}
      `;
    }
    case 17: {
      // La Estrella: mujer que vierte dos vasijas bajo las estrellas.
      return `
        ${Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          return `<g transform="translate(${Math.cos(angle) * 128} ${Math.sin(angle) * 128 - 42})">${path("M0 -13 L3 -3 L13 0 L3 3 L0 13 L-3 3 L-13 0 L-3 -3 Z",gold,1.8)}</g>`;
        }).join("")}
        ${path("M-170 182 Q-110 156 -60 182 T40 182 T140 182 T190 182",C.blue,2.5)}
        ${body({ x: 0, y: 20, s: 1.1, robe: "#C9D6E4", accent, halo: true })}
        ${arm(0, 20, -22, -34, -84, -18)}
        ${arm(0, 20, 22, -34, 84, -18)}
        <g transform="translate(-96 -52)">${suitMark("copas", 0.48, C.blue, "#C6D7E7", C.blueDeep)}</g>
        <g transform="translate(96 -52)">${suitMark("copas", 0.48, C.blue, "#C6D7E7", C.blueDeep)}</g>
        ${path("M-78 -18 Q-98 26 -112 76 M78 -18 Q98 18 108 62", C.blue, 2.5)}
        ${path("M-142 92 Q-126 76 -110 92 M-110 92 Q-94 76 -78 92", C.blue, 2)}
        ${path("M-152 122 Q-136 106 -120 122 M-120 122 Q-104 106 -88 122", C.blue, 2)}
        ${path("M-170 182 H170", C.ink, 3)}
      `;
    }
    case 18: {
      // La Luna: dos torres, animales y cangrejo.
      return `
        ${shape("M-44 -144 A62 62 0 1 0 44 -144 A44 44 0 0 1 -44 -144 Z", "#EED9A4", ink, 3)}
        ${path("M-16 -154 Q0 -144 16 -154", ink, 2)}
        ${dot(-14, -160, 2.4, ink)}${dot(14, -160, 2.4, ink)}
        ${shape("M-164 -104 V58 H-104 V-104 Z", "#D9C39C", ink, 2.5)}
        ${shape("M164 -104 V58 H104 V-104 Z", "#D9C39C", ink, 2.5)}
        ${path("M-164 -104 L-134 -134 L-104 -104 M104 -104 L134 -134 L164 -104", ink, 2.5)}
        ${shape("M-24 58 L0 22 L24 58", "#EED9A4", ink, 2.5)}
        ${path("M-122 58 Q-92 30 -62 58", ink, 2.5)}
        ${path("M122 58 Q92 30 62 58", ink, 2.5)}
        ${body({ x: -78, y: 116, s: 0.5, robe: "#D8B98B", accent })}
        ${body({ x: 78, y: 116, s: 0.5, robe: "#D8B98B", accent })}
        ${path("M-98 100 L-122 84 M-58 100 L-34 84 M98 100 L122 84 M58 100 L34 84", ink, 2.5)}
        ${path("M-170 182 Q-120 158 -70 182 T30 182 T130 182 T190 182",C.blue,2.5)}
        ${shape("M-28 174 Q0 150 28 174 Q0 194 -28 174 Z", "#E7C7B6", ink, 2.5)}
        ${path("M-44 170 L-58 160 M-36 174 L-48 178 M28 170 L42 160 M20 174 L32 178", ink, 2)}
      `;
    }
    case 19: {
      // El Sol: rostro radiante y dos niños.
      return `
        ${circle(0, -92, 78, "#EED9A4", ink, 3)}
        ${Array.from({ length: 20 }, (_, i) => path("M0 -178 V-200", gold, i % 2 === 0 ? 3 : 1.8, `transform="rotate(${i * 18} 0 -92)"`)).join("")}
        ${circle(-24, -104, 4, ink)}${circle(24, -104, 4, ink)}
        ${path("M-20 -76 Q0 -58 20 -76", ink, 2.5)}
        ${path("M-50 -112 Q-38 -124 -26 -112 M26 -112 Q38 -124 50 -112", ink, 2)}
        ${path("M-160 182 H160", ink, 3)}
        ${body({ x: -70, y: 94, s: 0.7, robe: "#E7C7B6", accent })}
        ${body({ x: 70, y: 94, s: 0.7, robe: "#C9D6E4", accent })}
        ${path("M-70 94 Q-38 66 0 94 Q38 66 70 94", ink, 2.5)}
        ${path("M-94 150 Q-70 128 -46 150 M94 150 Q70 128 46 150", ink, 2)}
        ${path("M-128 182 V120 H128 V182", ink, 2.5)}
      `;
    }
    case 20: {
      // El Juicio: ángel con trompeta y resurrección.
      return `
        ${path("M-170 46 Q-120 10 -70 46 T30 46 T130 46 T190 46",C.paperLight,3)}
        ${body({ x: 0, y: -48, s: 0.88, robe: "#E9D5B7", accent, halo: true })}
        ${shape("M-54 -92 Q-104 -120 -152 -96 Q-104 -78 -54 -92 Z", soft, ink, 2.5)}
        ${shape("M54 -92 Q104 -120 152 -96 Q104 -78 54 -92 Z", soft, ink, 2.5)}
        ${arm(0, -48, -22, -32, -98, -58)}
        ${arm(0, -48, 22, -32, 86, -34)}
        ${path("M-98 -58 L-164 -92", ink, 4)}
        ${shape("M-164 -92 L-184 -112 L-150 -104 Z", gold, ink, 2.5)}
        ${shape("M-150 -104 L-136 -96 L-152 -88", gold, ink, 2)}
        ${path("M-146 -96 Q-176 -92 -190 -108", ink, 2)}
        ${path("M-130 182 H130", ink, 3)}
        ${body({ x: -84, y: 138, s: 0.52, robe: "#D8B98B", accent })}
        ${body({ x: 0, y: 126, s: 0.56, robe: "#E7C7B6", accent })}
        ${body({ x: 84, y: 138, s: 0.52, robe: "#C9D6E4", accent })}
        ${path("M-124 182 V154 H-44 V182 M-20 182 V146 H20 V182 M44 182 V154 H124 V182", ink, 2.5)}
        ${path("M-84 126 V96 M0 114 V84 M84 126 V96", accent, 2)}
      `;
    }
    case 21: {
      // El Mundo: figura danzante en mandorla y cuatro símbolos.
      return `
        ${path("M0 -206 Q112 -206 112 -74 Q112 76 0 190 Q-112 76 -112 -74 Q-112 -206 0 -206 Z",accent,3)}
        ${path("M0 -186 Q94 -186 94 -72 Q94 62 0 166 Q-94 62 -94 -72 Q-94 -186 0 -186 Z",accent,1.5,'stroke-dasharray="3 7"')}
        ${body({ x: 0, y: 12, s: 1.02, robe: "#E7C7B6", accent, halo: true })}
        ${path("M-44 -64 Q0 -92 44 -64 M-40 44 Q0 70 40 44", ink, 2.5)}
        ${arm(0, 12, -22, -34, -74, -68)}
        ${arm(0, 12, 22, -34, 74, -68)}
        ${path("M-74 -68 L-92 -92 M74 -68 L92 -92", ink, 3)}
        ${circle(-92, -96, 8, gold, ink, 2)}
        ${circle(92, -96, 8, gold, ink, 2)}
        ${path("M-160 -166 Q-128 -190 -96 -166 M160 -166 Q128 -190 96 -166", ink, 2.5)}
        ${path("M-160 150 Q-128 126 -96 150 M160 150 Q128 126 96 150", ink, 2.5)}
        ${shape("M-160 -166 L-150 -140 L-170 -140 Z M160 -166 L150 -140 L170 -140 Z", gold, ink, 1.8)}
        ${shape("M-160 150 L-150 176 L-170 176 Z M160 150 L150 176 L170 176 Z", gold, ink, 1.8)}
        ${dot(-160, -166, 4, C.red)}${dot(160, -166, 4, C.blue)}${dot(-160, 150, 4, C.green)}${dot(160, 150, 4, C.ochre)}
      `;
    }
    default:
      return `${circle(0, 0, 120, "none", accent, 3)}${suitMark("oros", 1.3, accent, C.paperLight, ink)}`;
  }
}

/* ------------------------------------------------------------------ */
/* Arcanos menores                                                     */
/* ------------------------------------------------------------------ */

const pipLayouts = {
  1: [[0, 0, 1.9]],
  2: [[0, -96, 1.2], [0, 96, 1.2]],
  3: [[0, -116, 1.12], [-82, 78, 1.12], [82, 78, 1.12]],
  4: [[-82, -96, 1.1], [82, -96, 1.1], [-82, 96, 1.1], [82, 96, 1.1]],
  5: [[-88, -116, 1.05], [88, -116, 1.05], [0, 0, 1.18], [-88, 116, 1.05], [88, 116, 1.05]],
  6: [[-82, -136, 1], [82, -136, 1], [-82, 0, 1], [82, 0, 1], [-82, 136, 1], [82, 136, 1]],
  7: [[-88, -140, 0.95], [88, -140, 0.95], [-88, 0, 0.95], [88, 0, 0.95], [0, -70, 1], [-88, 140, 0.95], [88, 140, 0.95]],
  8: [[-82, -146, 0.95], [82, -146, 0.95], [-82, -50, 0.95], [82, -50, 0.95], [-82, 50, 0.95], [82, 50, 0.95], [-82, 146, 0.95], [82, 146, 0.95]],
  9: [[-96, -130, 0.94], [0, -130, 0.94], [96, -130, 0.94], [-96, 0, 0.94], [0, 0, 0.94], [96, 0, 0.94], [-96, 130, 0.94], [0, 130, 0.94], [96, 130, 0.94]],
  10: [[-80, -158, 0.9], [80, -158, 0.9], [-80, -79, 0.9], [80, -79, 0.9], [-80, 0, 0.9], [80, 0, 0.9], [-80, 79, 0.9], [80, 79, 0.9], [-80, 158, 0.9], [80, 158, 0.9]],
};

function minorPips(rank, suit) {
  const style = suitStyles[suit];
  const layout = pipLayouts[rank] ?? pipLayouts[1];
  return layout
    .map(([x, y, scale], index) => {
      const accent = index % 3 === 0 ? style.accent : index % 3 === 1 ? C.gold : style.accent;
      return `<g transform="translate(${x} ${y})">${suitMark(suit, scale, accent, style.fill, style.deep)}</g>`;
    })
    .join("");
}

function courtArt(rank, suit) {
  const style = suitStyles[suit];
  const { accent, fill, deep } = style;
  const mark = (x, y, scale) =>
    `<g transform="translate(${x} ${y})">${suitMark(suit, scale, accent, fill, deep)}</g>`;

  if (rank === 11) {
    // Sota: joven de pie con el emblema en alto.
    return `
      ${path("M-146 182 H146", C.ink, 3)}
      ${body({ x: -4, y: 26, s: 1.05, robe: fill, accent })}
      ${shape("M-34 -80 Q-4 -104 26 -80 L20 -62 H-28 Z", accent, C.ink, 2.5)}
      ${arm(-4, 26, -22, -34, -78, -52)}
      ${arm(-4, 26, 22, -34, 68, -86)}
      ${mark(78, -108, 0.62)}
      ${path("M-130 182 Q-96 150 -62 182 M130 182 Q96 150 62 182", C.ink, 2.5)}
      ${dot(-126, -128, 3, accent)}${dot(126, -128, 3, accent)}
    `;
  }

  if (rank === 12) {
    // Caballo: jinete sobre caballo con estandarte.
    return `
      ${path("M-150 182 H150", C.ink, 3)}
      ${shape("M-118 86 Q-126 34 -82 26 L48 26 Q92 34 96 86 L70 146 H-92 Z", "#D9C39C", C.ink, 3)}
      ${path("M-92 146 L-108 182 M70 146 L88 182 M-46 146 L-56 182 M26 146 L38 182", C.ink, 4)}
      ${shape("M48 26 Q88 6 94 -32 Q72 -48 52 -30 L36 12 Z", "#D9C39C", C.ink, 3)}
      ${path("M82 -36 L102 -62 M72 -30 L90 -58", C.ink, 2.5)}
      ${dot(76, -30, 3, C.ink)}
      ${path("M-118 70 Q-150 52 -168 76", C.ink, 3)}
      ${body({ x: -10, y: -36, s: 0.72, robe: fill, accent })}
      ${shape("M-28 -116 Q-10 -134 8 -116 L2 -102 H-22 Z", accent, C.ink, 2)}
      ${arm(-10, -36, -16, -30, -54, -8)}
      ${arm(-10, -36, 16, -30, 58, -70)}
      ${path("M58 -70 V-156", C.ink, 4)}
      ${shape("M58 -156 L104 -144 L58 -124 Z", accent, C.ink, 2.5)}
      ${mark(96, -84, 0.38)}
      ${dot(-130, -140, 3, accent)}${dot(130, -140, 3, accent)}
    `;
  }

  if (rank === 13) {
    // Reina: sedente, corona y emblema.
    return `
      ${path("M-150 182 H150", C.ink, 3)}
      ${body({ x: 0, y: 28, s: 1.12, robe: fill, accent, seated: true, crown: true })}
      ${path("M-52 -88 Q0 -112 52 -88", accent, 2)}
      ${arm(0, 28, -24, -32, -78, 2)}
      ${arm(0, 28, 24, -32, 78, 2)}
      ${mark(-96, -22, 0.56)}
      ${mark(96, -22, 0.56)}
      ${path("M-108 182 Q-88 154 -68 182 M108 182 Q88 154 68 182", C.ink, 2.5)}
      ${path("M-136 -116 Q-120 -138 -104 -116 M136 -116 Q120 -138 104 -116", accent, 2)}
      ${dot(-136, -150, 3, C.gold)}${dot(136, -150, 3, C.gold)}
    `;
  }

  // Rey: sedente con corona, orbe y emblema.
  return `
    ${path("M-150 182 H150", C.ink, 3)}
    ${body({ x: 0, y: 28, s: 1.14, robe: fill, accent, seated: true, crown: true })}
    ${path("M-54 -90 Q0 -116 54 -90", accent, 2)}
    ${arm(0, 28, -24, -32, -80, -66)}
    ${path("M-80 -66 V-144", C.ink, 4)}
    ${circle(-80, -150, 8, C.goldLight, C.ink, 2.5)}
    ${arm(0, 28, 24, -32, 74, -22)}
    ${circle(80, -30, 20, C.goldLight, C.ink, 2.5)}
    ${path("M80 -50 V-10 M60 -30 H100", accent, 2)}
    ${mark(0, 52, 0.6)}
    ${path("M-108 182 Q-88 154 -68 182 M108 182 Q88 154 68 182", C.ink, 2.5)}
    ${dot(-132, -136, 3, C.gold)}${dot(132, -136, 3, C.gold)}
  `;
}

/* ------------------------------------------------------------------ */
/* Composición de la carta                                             */
/* ------------------------------------------------------------------ */

function cornerOrnament(x, y, rotate) {
  return `<g transform="translate(${x} ${y}) rotate(${rotate})" fill="none" stroke="${C.gold}" stroke-width="1.8" opacity="0.9">
    <path d="M0 26 V0 H26"/>
    <path d="M8 18 Q8 8 18 8"/>
    <path d="M2 30 L8 24 M30 2 L24 8"/>
    <circle cx="10" cy="10" r="2.2" fill="${C.gold}" stroke="none"/>
  </g>`;
}

const minorRankNames = [
  "As",
  "Dos",
  "Tres",
  "Cuatro",
  "Cinco",
  "Seis",
  "Siete",
  "Ocho",
  "Nueve",
  "Diez",
  "Sota",
  "Caballo",
  "Reina",
  "Rey",
];

function cardSvg(card) {
  const isMajor = card.category === "major";
  const rank = isMajor ? null : ((card.number - 23) % 14) + 1;
  const rankLabel = isMajor ? null : card.rankLabel ?? minorRankNames[rank - 1];
  const accent = isMajor ? majorAccents[card.number % majorAccents.length] : suitStyles[card.series].accent;
  const style = isMajor ? null : suitStyles[card.series];
  const random = mulberry32(card.number * 7919 + 31);
  const title = escapeXml(card.name);
  const alternate = card.alternateName ? escapeXml(card.alternateName) : "";
  const numberLabel = isMajor ? roman(card.number) : suitStyles[card.series].label;
  const categoryLabel = isMajor
    ? "ARCANO MAYOR"
    : rank >= 11
      ? `${rankLabel.toUpperCase()} · ${style.label.toUpperCase()}`
      : `${style.label.toUpperCase()} · ${rankLabel.toUpperCase()}`;
  const subtitle = isMajor
    ? majorFrench[card.number] ?? alternate
    : `PALO DE ${style.element.toUpperCase()}${alternate ? ` · ${alternate}` : ""}`;
  const art = isMajor
    ? majorArt(card.number, accent)
    : rank >= 11
      ? courtArt(rank, card.series)
      : minorPips(rank, card.series);

  const motes = Array.from({ length: 18 }, () => {
    const x = 88 + random() * 464;
    const y = 176 + random() * 590;
    const r = 0.8 + random() * 1.5;
    return dot(x, y, r, accent, 0.12 + random() * 0.2);
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(card.name)}, carta ${card.number}">
  <title>${title}${alternate ? ` · ${alternate}` : ""}</title>
  <defs>
    <linearGradient id="paper" x1="0" y1="0" x2="0.45" y2="1">
      <stop offset="0" stop-color="${C.paperLight}"/>
      <stop offset="0.46" stop-color="${C.paper}"/>
      <stop offset="1" stop-color="${C.paperDeep}"/>
    </linearGradient>
    <radialGradient id="panel" cx="50%" cy="42%" r="66%">
      <stop offset="0" stop-color="${C.paperLight}" stop-opacity="0.96"/>
      <stop offset="0.7" stop-color="${C.paperSoft}" stop-opacity="0.72"/>
      <stop offset="1" stop-color="${C.paperDeep}" stop-opacity="0.5"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="44%" r="58%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.18"/>
      <stop offset="0.6" stop-color="${accent}" stop-opacity="0.04"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(34)">
      <path d="M0 0 V9" stroke="${C.ink}" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.34"/></feComponentTransfer>
    </filter>
    <filter id="rough">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.1" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <clipPath id="panelClip">
      <rect x="68" y="150" width="504" height="632" rx="3"/>
    </clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#paper)"/>
  <rect width="${W}" height="${H}" fill="url(#hatch)" opacity="0.65"/>

  <rect x="14" y="14" width="${W - 28}" height="${H - 28}" rx="7" fill="none" stroke="${C.ink}" stroke-width="3.2"/>
  <rect x="26" y="26" width="${W - 52}" height="${H - 52}" rx="4" fill="none" stroke="${accent}" stroke-width="1.6"/>
  <rect x="32" y="32" width="${W - 64}" height="${H - 64}" rx="3" fill="none" stroke="${C.gold}" stroke-width="0.8" opacity="0.8"/>

  ${cornerOrnament(26, 26, 0)}
  ${cornerOrnament(W - 26, 26, 90)}
  ${cornerOrnament(W - 26, H - 26, 180)}
  ${cornerOrnament(26, H - 26, 270)}

  <text x="320" y="58" text-anchor="middle" fill="${C.inkSoft}" font-family="Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="5.5">TAROT DE MARSEILLE</text>
  <path d="M150 72 H286 M354 72 H490" stroke="${accent}" stroke-width="1.2" opacity="0.75"/>
  <path d="M320 67 L326 73 L320 79 L314 73 Z" fill="${accent}"/>

  <rect x="42" y="90" width="${W - 84}" height="754" rx="3" fill="none" stroke="${C.ink}" stroke-width="2.2"/>
  <rect x="50" y="98" width="${W - 100}" height="738" rx="2" fill="none" stroke="${accent}" stroke-width="1" opacity="0.85"/>

  <circle cx="320" cy="90" r="27" fill="${C.paperLight}" stroke="${C.ink}" stroke-width="2.4"/>
  <circle cx="320" cy="90" r="21" fill="none" stroke="${accent}" stroke-width="1"/>
  ${
    isMajor
      ? `<text x="320" y="99" text-anchor="middle" fill="${C.ink}" font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="1">${numberLabel}</text>`
      : `<g transform="translate(320 90)">${suitMark(card.series, 0.26, accent, style.fill, style.deep)}</g>`
  }

  <text x="320" y="130" text-anchor="middle" fill="${accent}" font-family="Georgia, 'Times New Roman', serif" font-size="10.5" letter-spacing="3.8">${categoryLabel}</text>

  <g clip-path="url(#panelClip)">
    <rect x="68" y="150" width="504" height="632" fill="url(#panel)"/>
    <rect x="68" y="150" width="504" height="632" fill="url(#glow)"/>
    ${motes}
    <rect x="68" y="150" width="504" height="632" fill="url(#hatch)" opacity="0.45"/>
    <circle cx="320" cy="454" r="238" fill="none" stroke="${accent}" stroke-width="1" opacity="0.16"/>
    <circle cx="320" cy="454" r="222" fill="none" stroke="${accent}" stroke-width="0.8" opacity="0.26" stroke-dasharray="2 9"/>
    <g transform="translate(320 452)" filter="url(#rough)">
      ${art}
    </g>
    <rect x="68" y="150" width="504" height="632" fill="none" stroke="${C.ink}" stroke-width="0.8" opacity="0.2"/>
    <path d="M84 166 H154 M486 166 H556 M84 766 H154 M486 766 H556" stroke="${accent}" stroke-width="1.2" opacity="0.5"/>
    <path d="M84 166 L100 166 L84 182 Z M556 166 L540 166 L556 182 Z M84 766 L100 766 L84 750 Z M556 766 L540 766 L556 750 Z" fill="${accent}" opacity="0.25"/>
  </g>

  <path d="M68 782 H572" stroke="${accent}" stroke-width="1.8" opacity="0.8"/>
  <path d="M84 792 H556" stroke="${C.ink}" stroke-width="0.8" opacity="0.28"/>

  <text x="320" y="846" text-anchor="middle" fill="${accent}" font-family="Georgia, 'Times New Roman', serif" font-size="10" letter-spacing="4">${isMajor ? "ARCANO MAYOR" : categoryLabel}</text>
  <text x="320" y="892" text-anchor="middle" fill="${C.ink}" font-family="Georgia, 'Times New Roman', serif" font-size="${card.name.length > 22 ? 28 : 35}" letter-spacing="0.6">${title}</text>
  <text x="320" y="922" text-anchor="middle" fill="${accent}" font-family="Georgia, 'Times New Roman', serif" font-size="14" font-style="italic">${subtitle}</text>
  <path d="M220 942 H292 M348 942 H420" stroke="${accent}" stroke-width="1.2" opacity="0.8"/>
  <path d="M320 936 L326 942 L320 948 L314 942 Z" fill="${accent}"/>
  <text x="320" y="972" text-anchor="middle" fill="${C.inkSoft}" font-family="Georgia, 'Times New Roman', serif" font-size="8.5" letter-spacing="3.2" opacity="0.72">ARCANA · BIBLIOTECA DE TAROT</text>

  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.14"/>
</svg>
`;
}

function backSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Dorso del Tarot de Marsella">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.7" y2="1">
      <stop offset="0" stop-color="#2B2018"/>
      <stop offset="0.58" stop-color="#1B130E"/>
      <stop offset="1" stop-color="#120D09"/>
    </linearGradient>
    <pattern id="lattice" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M28 0 L56 28 L28 56 L0 28 Z" fill="none" stroke="#C1735F" stroke-opacity="0.16"/>
      <path d="M28 14 L42 28 L28 42 L14 28 Z" fill="none" stroke="#B08A3C" stroke-opacity="0.12"/>
    </pattern>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.86" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.32"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#lattice)"/>
  <rect x="16" y="16" width="${W - 32}" height="${H - 32}" rx="8" fill="none" stroke="#C1735F" stroke-width="2.5"/>
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" rx="5" fill="none" stroke="#B08A3C" stroke-width="1"/>
  <circle cx="320" cy="500" r="224" fill="none" stroke="#C1735F" stroke-opacity="0.3"/>
  <circle cx="320" cy="500" r="196" fill="none" stroke="#C1735F" stroke-opacity="0.5" stroke-dasharray="2 11"/>
  ${Array.from({ length: 32 }, (_, i) => `<path d="M320 276 V256" stroke="#B08A3C" stroke-opacity="${i % 4 === 0 ? 0.8 : 0.24}" stroke-width="${i % 4 === 0 ? 2 : 1}" transform="rotate(${i * 11.25} 320 500)"/>`).join("")}
  <circle cx="320" cy="500" r="160" fill="#1B130E" stroke="#C1735F" stroke-opacity="0.4"/>
  <g transform="translate(320 500)">
    ${circle(0, 0, 98, "none", "#C1735F", 2.5)}
    ${circle(0, 0, 74, "none", "#B08A3C", 1.5)}
    ${Array.from({ length: 12 }, (_, i) => path("M0 -98 V-122", "#C1735F", i % 3 === 0 ? 3 : 1.5, `transform="rotate(${i * 30})"`)).join("")}
    ${path("M0 -66 L18 -22 L66 0 L18 22 L0 66 L-18 22 L-66 0 L-18 -22 Z","#B08A3C",2)}
    ${circle(0, 0, 22, "none", "#C1735F", 2)}
    ${dot(0, 0, 7, "#B08A3C")}
  </g>
  <text x="320" y="840" text-anchor="middle" fill="#E9DCC3" fill-opacity="0.82" font-family="Georgia, 'Times New Roman', serif" font-size="13" letter-spacing="6">TAROT DE MARSEILLE</text>
  <path d="M190 866 H290 M350 866 H450" stroke="#C1735F" stroke-width="1.3" opacity="0.8"/>
  <path d="M320 858 L328 866 L320 874 L312 866 Z" fill="#C1735F"/>
  <text x="320" y="902" text-anchor="middle" fill="#B08A3C" fill-opacity="0.85" font-family="Georgia, 'Times New Roman', serif" font-size="9" letter-spacing="4">ARCANA · BIBLIOTECA DE TAROT</text>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.14"/>
</svg>
`;
}

function deckCover() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" role="img" aria-label="Tarot de Marsella">
  <defs>
    <linearGradient id="paper" x1="0" y1="0" x2="0.5" y2="1">
      <stop offset="0" stop-color="#F6ECD6"/>
      <stop offset="0.5" stop-color="#E8D8B9"/>
      <stop offset="1" stop-color="#D3BB93"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="64%">
      <stop offset="0" stop-color="#C1735F" stop-opacity="0.24"/>
      <stop offset="1" stop-color="#C1735F" stop-opacity="0"/>
    </radialGradient>
    <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(34)">
      <path d="M0 0 V10" stroke="#2A2018" stroke-opacity="0.055" stroke-width="1"/>
    </pattern>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.84" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="800" height="1100" fill="url(#paper)"/>
  <rect width="800" height="1100" fill="url(#hatch)"/>
  <rect x="20" y="20" width="760" height="1060" rx="12" fill="none" stroke="#2A2018" stroke-width="3"/>
  <rect x="34" y="34" width="732" height="1032" rx="8" fill="none" stroke="#B65A4A" stroke-width="1.8"/>
  <rect x="20" y="20" width="760" height="1060" rx="12" fill="url(#glow)"/>
  <path d="M60 90 L80 110 L60 130 L40 110 Z M740 90 L760 110 L740 130 L720 110 Z M60 990 L80 1010 L60 1030 L40 1010 Z M740 990 L760 1010 L740 1030 L720 1010 Z" fill="none" stroke="#B65A4A" stroke-width="1.6"/>
  <text x="400" y="108" text-anchor="middle" fill="#4B3A2B" font-family="Georgia, 'Times New Roman', serif" font-size="14" letter-spacing="7">BIBLIOTECA DE ESTUDIO</text>
  <path d="M170 132 H340 M460 132 H630" stroke="#B65A4A" stroke-width="1.4"/>
  <circle cx="400" cy="132" r="3" fill="#B65A4A"/>
  <g transform="translate(400 500)">
    <circle cx="0" cy="0" r="232" fill="none" stroke="#B65A4A" stroke-opacity="0.28" stroke-width="2"/>
    <circle cx="0" cy="0" r="212" fill="none" stroke="#B65A4A" stroke-opacity="0.55" stroke-dasharray="2 12"/>
    ${Array.from({ length: 36 }, (_, i) => `<path d="M0 -226 V-246" stroke="#B08A3C" stroke-opacity="${i % 3 === 0 ? 0.85 : 0.3}" stroke-width="${i % 3 === 0 ? 2 : 1}" transform="rotate(${i * 10})"/>`).join("")}
    <circle cx="0" cy="0" r="168" fill="#E8D8B9" stroke="#2A2018" stroke-width="2.5"/>
    <circle cx="0" cy="0" r="142" fill="none" stroke="#B65A4A" stroke-width="1.5"/>
    ${Array.from({ length: 12 }, (_, i) => `<g transform="rotate(${i * 30})">${path("M0 -54 V-128", i % 3 === 0 ? "#B65A4A" : "#B08A3C", i % 3 === 0 ? 3 : 1.5)}</g>`).join("")}
    ${circle(0, 0, 58, "none", "#2A2018", 2.5)}
    ${path("M0 -40 L12 -12 L40 0 L12 12 L0 40 L-12 12 L-40 0 L-12 -12 Z","#B65A4A",2.5)}
    ${dot(0, 0, 9, "#B08A3C")}
    ${Array.from({ length: 4 }, (_, i) => `<g transform="rotate(${i * 90}) translate(0 -168)"><circle cx="0" cy="0" r="12" fill="#F6ECD6" stroke="#2A2018" stroke-width="2"/>${suitMark(["bastos", "copas", "espadas", "oros"][i], 0.16, "#B65A4A", "#F6ECD6", "#2A2018")}</g>`).join("")}
  </g>
  <text x="400" y="818" text-anchor="middle" fill="#2A2018" font-family="Georgia, 'Times New Roman', serif" font-size="52" letter-spacing="3">MARSEILLE</text>
  <text x="400" y="862" text-anchor="middle" fill="#B65A4A" font-family="Georgia, 'Times New Roman', serif" font-size="20" font-style="italic">La tradición grabada</text>
  <path d="M240 896 H360 M440 896 H560" stroke="#B65A4A" stroke-width="1.5"/>
  <path d="M400 886 L409 896 L400 906 L391 896 Z" fill="#B65A4A"/>
  <text x="400" y="946" text-anchor="middle" fill="#4B3A2B" font-family="Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4">78 CARTAS · GUÍA DE ESTUDIO</text>
  <text x="400" y="1024" text-anchor="middle" fill="#B65A4A" font-family="Georgia, 'Times New Roman', serif" font-size="9" letter-spacing="5">ARCANA · BIBLIOTECA DE TAROT</text>
  <rect width="800" height="1100" filter="url(#grain)" opacity="0.14"/>
</svg>
`;
}

mkdirSync(OUT_CARDS, { recursive: true });
mkdirSync(OUT_DECKS, { recursive: true });

let written = 0;
for (const card of cards) {
  const filename = `${String(card.number).padStart(2, "0")}-${card.slug}.svg`;
  writeFileSync(join(OUT_CARDS, filename), cardSvg(card), "utf8");
  written += 1;
}

writeFileSync(join(OUT_CARDS, "back.svg"), backSvg(), "utf8");
writeFileSync(join(OUT_DECKS, "marseille.svg"), deckCover(), "utf8");

console.log(`Generadas ${written} cartas del Tarot de Marsella, el dorso y la portada.`);
