import type { ColorKey } from "@/types/tarot";
import {
  buildNumerology,
  capitalize,
  lowerFirst,
  numberDescriptions,
  numberTitles,
  reduceNumber,
  seriesInfo,
  type SeriesInfo,
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
export type { SeriesInfo };

interface ArtManifest {
  cards: Record<string, string>;
  back: string | null;
  cover: string | null;
}

const art = artManifest as ArtManifest;

/**
 * Mientras no existan las láminas definitivas, todas las cartas apuntan a un
 * marcador neutro. No se genera arte por carta: las imágenes se incorporarán
 * después mediante `npm run art:import:rider-waite`.
 */
export const RIDER_WAITE_PLACEHOLDER = "/images/cards/rider-waite/placeholder.svg";

export const riderWaiteBackImage = art.back ?? RIDER_WAITE_PLACEHOLDER;
export const riderWaiteCoverImage = art.cover ?? "/images/decks/rider-waite.svg";

export const riderWaiteColorPalette: Record<string, ColorKey> = {
  sky: {
    name: "Azul cielo",
    hex: "#7FA8C9",
    meaning: "La claridad mental, la verdad y la promesa de un horizonte abierto.",
  },
  gold: {
    name: "Oro",
    hex: "#D4AF37",
    meaning: "La conciencia, la luz y lo que se ha ganado con madurez.",
  },
  ivory: {
    name: "Marfil",
    hex: "#F0E6D2",
    meaning: "La pureza de intención, el pergamino y la inocencia.",
  },
  crimson: {
    name: "Carmesí",
    hex: "#B23A48",
    meaning: "La pasión, la sangre y el impulso vital que no se reprime.",
  },
  emerald: {
    name: "Esmeralda",
    hex: "#3F7D5B",
    meaning: "El crecimiento, la naturaleza y la salud que se cultiva.",
  },
  indigo: {
    name: "Añil",
    hex: "#2E4057",
    meaning: "La profundidad del cielo nocturno y la memoria del misterio.",
  },
  sunflower: {
    name: "Girasol",
    hex: "#E0A526",
    meaning: "La alegría, la confianza y la energía que se comparte.",
  },
  rose: {
    name: "Rosa",
    hex: "#C98B8B",
    meaning: "La ternura, el vínculo y la vulnerabilidad del corazón.",
  },
  earth: {
    name: "Tierra",
    hex: "#8B6B4A",
    meaning: "El cuerpo, los recursos y lo que se construye paso a paso.",
  },
  violet: {
    name: "Violeta",
    hex: "#6B5B95",
    meaning: "La intuición, la transmutación y el umbral entre mundos.",
  },
  silver: {
    name: "Plata",
    hex: "#B9C2CC",
    meaning: "La luz lunar, la reflexión y lo que se percibe sin ver.",
  },
  black: {
    name: "Negro",
    hex: "#141821",
    meaning: "El silencio fértil, la sombra y lo que aún no se ha nombrado.",
  },
};

export function resolveRiderWaiteColors(keys: string[] = []): ColorKey[] {
  return keys.map((key) => riderWaiteColorPalette[key]).filter(Boolean);
}

export function riderWaiteImageFor(number: number): string {
  return art.cards[String(number)] ?? RIDER_WAITE_PLACEHOLDER;
}

// Nombres de los arcanos mayores en la tradición Rider-Waite-Smith.
export const riderWaiteMajorNames: Record<
  number,
  { name: string; alternateName: string; slug: string }
> = {
  0: { name: "El Loco", alternateName: "El Caminante", slug: "el-loco" },
  1: { name: "El Mago", alternateName: "El Artesano", slug: "el-mago" },
  2: { name: "La Sacerdotisa", alternateName: "La Suma Sacerdotisa", slug: "la-sacerdotisa" },
  3: { name: "La Emperatriz", alternateName: "La Gran Madre", slug: "la-emperatriz" },
  4: { name: "El Emperador", alternateName: "El Padre", slug: "el-emperador" },
  5: { name: "El Hierofante", alternateName: "El Sumo Sacerdote", slug: "el-hierofante" },
  6: { name: "Los Enamorados", alternateName: "La Elección", slug: "los-enamorados" },
  7: { name: "El Carro", alternateName: "El Triunfo", slug: "el-carro" },
  8: { name: "La Fuerza", alternateName: "La Fortaleza", slug: "la-fuerza" },
  9: { name: "El Ermitaño", alternateName: "El Sabio", slug: "el-ermitano" },
  10: { name: "La Rueda de la Fortuna", alternateName: "El Destino", slug: "la-rueda-de-la-fortuna" },
  11: { name: "La Justicia", alternateName: "El Equilibrio", slug: "la-justicia" },
  12: { name: "El Colgado", alternateName: "El Sacrificio", slug: "el-colgado" },
  13: { name: "La Muerte", alternateName: "La Transformación", slug: "la-muerte" },
  14: { name: "La Templanza", alternateName: "La Moderación", slug: "la-templanza" },
  15: { name: "El Diablo", alternateName: "La Sombra", slug: "el-diablo" },
  16: { name: "La Torre", alternateName: "La Liberación", slug: "la-torre" },
  17: { name: "La Estrella", alternateName: "La Esperanza", slug: "la-estrella" },
  18: { name: "La Luna", alternateName: "La Noche del Alma", slug: "la-luna" },
  19: { name: "El Sol", alternateName: "La Alegría", slug: "el-sol" },
  20: { name: "El Juicio", alternateName: "La Resurrección", slug: "el-juicio" },
  21: { name: "El Mundo", alternateName: "La Realización", slug: "el-mundo" },
};

export const riderWaiteSuits = ["bastos", "copas", "espadas", "oros"] as const;
export type RiderWaiteSuit = (typeof riderWaiteSuits)[number];

export function riderWaiteSuitByNumber(number: number): RiderWaiteSuit {
  if (number <= 35) return "bastos";
  if (number <= 49) return "copas";
  if (number <= 63) return "espadas";
  return "oros";
}

export function riderWaiteMinorName(
  number: number,
  suit: RiderWaiteSuit,
): { name: string; slug: string } {
  const rank = ((number - 22) % 14) + 1; // 1-14
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
    12: { name: "Caballero", slug: "caballero" },
    13: { name: "Reina", slug: "reina" },
    14: { name: "Rey", slug: "rey" },
  };
  const rankInfo = rankNames[rank];
  const suitNames: Record<RiderWaiteSuit, string> = {
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
