import type { ColorKey } from "@/types/tarot";
import {
  buildNumerology,
  capitalize,
  lowerFirst,
  numberDescriptions,
  numberTitles,
  reduceNumber,
  seriesInfo,
} from "@/data/common";
import artManifest from "./art-manifest.json";

export {
  buildNumerology,
  capitalize,
  lowerFirst,
  numberDescriptions,
  numberTitles,
  reduceNumber,
  seriesInfo,
};
export type { SeriesInfo } from "@/data/common";

interface ArtManifest {
  cards: Record<string, string>;
  back: string | null;
  cover: string | null;
}

const art = artManifest as ArtManifest;

export const marseilleBackImage = art.back ?? "/images/cards/marseille/back.svg";
export const marseilleCoverImage = art.cover ?? "/images/decks/marseille.svg";

export const marseilleColorPalette: Record<string, ColorKey> = {
  terracotta: {
    name: "Terracota",
    hex: "#B65A4A",
    meaning: "La tierra cocida, la acción y el impulso vital.",
  },
  indigo: {
    name: "Añil",
    hex: "#3E5A78",
    meaning: "La profundidad del cielo nocturno y la sabiduría ancestral.",
  },
  ivory: {
    name: "Marfil",
    hex: "#E9DCC3",
    meaning: "El pergamino, la claridad y la tradición escrita.",
  },
  gold: {
    name: "Oro envejecido",
    hex: "#C9A227",
    meaning: "La luz de la conciencia y la maestría.",
  },
  vermilion: {
    name: "Vermillón",
    hex: "#C84B31",
    meaning: "La pasión, la sangre y la fuerza creadora.",
  },
  sage: {
    name: "Salvia",
    hex: "#7A8B6B",
    meaning: "La naturaleza, la curación y el crecimiento silencioso.",
  },
  charcoal: {
    name: "Carbón",
    hex: "#14100D",
    meaning: "El grabado, la sombra y el misterio del origen.",
  },
  ochre: {
    name: "Ocre",
    hex: "#CC8B4B",
    meaning: "La tierra, la cosecha y la materia transformada.",
  },
  lapis: {
    name: "Lapislázuli",
    hex: "#1F3A6E",
    meaning: "El cielo, la revelación y la verdad celeste.",
  },
  rose: {
    name: "Rosa antiguo",
    hex: "#A86B6B",
    meaning: "El amor humano, la compasión y la ternura.",
  },
};

export function resolveMarseilleColors(keys: string[] = []): ColorKey[] {
  return keys.map((key) => marseilleColorPalette[key]).filter(Boolean);
}

export function marseilleImageFor(number: number, slug: string): string {
  return (
    art.cards[String(number)] ??
    `/images/cards/marseille/${String(number).padStart(2, "0")}-${slug}.svg`
  );
}

// Nombres tradicionales de los arcanos mayores en el Tarot de Marsella
export const marseilleMajorNames: Record<number, { name: string; alternateName: string; slug: string }> = {
  0: { name: "El Loco", alternateName: "El Excéntrico", slug: "el-loco" },
  1: { name: "El Mago", alternateName: "El Juglar", slug: "el-mago" },
  2: { name: "La Papisa", alternateName: "La Suma Sacerdotisa", slug: "la-papisa" },
  3: { name: "La Emperatriz", alternateName: "La Reina", slug: "la-emperatriz" },
  4: { name: "El Emperador", alternateName: "El Rey", slug: "el-emperador" },
  5: { name: "El Papa", alternateName: "El Sumo Pontífice", slug: "el-papa" },
  6: { name: "Los Enamorados", alternateName: "El Enamorado", slug: "los-enamorados" },
  7: { name: "El Carro", alternateName: "La Victoria", slug: "el-carro" },
  8: { name: "La Justicia", alternateName: "El Equilibrio", slug: "la-justicia" },
  9: { name: "El Ermitaño", alternateName: "El Sabio", slug: "el-ermitano" },
  10: { name: "La Rueda de la Fortuna", alternateName: "El Destino", slug: "la-rueda-de-la-fortuna" },
  11: { name: "La Fuerza", alternateName: "La Fortaleza", slug: "la-fuerza" },
  12: { name: "El Colgado", alternateName: "El Sacrificado", slug: "el-colgado" },
  13: { name: "La Muerte", alternateName: "Arcano XIII", slug: "la-muerte" },
  14: { name: "La Templanza", alternateName: "La Moderación", slug: "la-templanza" },
  15: { name: "El Diablo", alternateName: "El Encadenado", slug: "el-diablo" },
  16: { name: "La Torre", alternateName: "La Casa de Dios", slug: "la-torre" },
  17: { name: "La Estrella", alternateName: "La Esperanza", slug: "la-estrella" },
  18: { name: "La Luna", alternateName: "La Ilusión", slug: "la-luna" },
  19: { name: "El Sol", alternateName: "La Claridad", slug: "el-sol" },
  20: { name: "El Juicio", alternateName: "La Resurrección", slug: "el-juicio" },
  21: { name: "El Mundo", alternateName: "La Realización", slug: "el-mundo" },
};

// Series para los arcanos menores (palos tradicionales del Marsella)
export const marseilleSuits = ["bastos", "copas", "espadas", "oros"] as const;
export type MarseilleSuit = (typeof marseilleSuits)[number];

export function marseilleSuitByNumber(number: number): MarseilleSuit {
  if (number <= 36) return "bastos";
  if (number <= 50) return "copas";
  if (number <= 64) return "espadas";
  return "oros";
}

export function marseilleMinorName(number: number, suit: MarseilleSuit): { name: string; slug: string } {
  const rank = ((number - 23) % 14) + 1; // 1-14
  const rankNames: Record<number, { name: string; slug: string }> = {
    1: { name: "As", slug: "as" },
    2: { name: "Dos", slug: "dos" },
    3: { name: "Tres", slug: "tres" },
    4: { name: "Cuatro", slug: "cuatro" },
    5: { name: "Cinco", slug: "cinco" },
    6: { name: "Seis", slug: "seis" },
    7: { name: "Siete", slug: "siete" },
    8: { name: "Ocho", slug: "ocho" },
    9: { name: "Nueve", slug: "nueve" },
    10: { name: "Diez", slug: "diez" },
    11: { name: "Sota", slug: "sota" },
    12: { name: "Caballo", slug: "caballo" },
    13: { name: "Reina", slug: "reina" },
    14: { name: "Rey", slug: "rey" },
  };
  const rankInfo = rankNames[rank];
  const suitNames: Record<MarseilleSuit, string> = {
    bastos: "Bastos",
    copas: "Copas",
    espadas: "Espadas",
    oros: "Oros",
  };
  return {
    name: `${rankInfo.name} de ${suitNames[suit]}`,
    slug: `${rankInfo.slug}-de-${suit}`,
  };
}