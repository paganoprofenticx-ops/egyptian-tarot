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

export const egyptianBackImage = art.back ?? "/images/cards/back.svg";
export const egyptianCoverImage = art.cover ?? "/images/decks/tarot-egipcio.svg";

export const colorPalette: Record<string, ColorKey> = {
  gold: {
    name: "Oro envejecido",
    hex: "#C9A227",
    meaning: "La luz de la conciencia y lo que madura con el tiempo.",
  },
  lapis: {
    name: "Lapislázuli",
    hex: "#1F3A6E",
    meaning: "La profundidad del cielo nocturno, la memoria y el misterio.",
  },
  turquoise: {
    name: "Turquesa",
    hex: "#2A9D8F",
    meaning: "La protección, la salud y el fluir de la vida.",
  },
  carnelian: {
    name: "Cornalina",
    hex: "#B4472F",
    meaning: "El impulso vital, el deseo y la acción.",
  },
  papyrus: {
    name: "Papiro",
    hex: "#E3D3A8",
    meaning: "El soporte del conocimiento y la palabra escrita.",
  },
  emerald: {
    name: "Esmeralda",
    hex: "#2F7D5B",
    meaning: "El crecimiento, la regeneración y la promesa de fertilidad.",
  },
  silver: {
    name: "Plata",
    hex: "#B9C2CC",
    meaning: "La intuición, la reflexión y la luz lunar.",
  },
  black: {
    name: "Negro ritual",
    hex: "#17141C",
    meaning: "El silencio fértil y lo que aún no se ha dicho.",
  },
  ivory: {
    name: "Marfil",
    hex: "#EFE5CE",
    meaning: "La claridad, la pureza de intención y la verdad sencilla.",
  },
  violet: {
    name: "Violeta",
    hex: "#5B4B8A",
    meaning: "La visión interior, la transmutación y el umbral.",
  },
};

export function resolveColors(keys: string[] = []): ColorKey[] {
  return keys.map((key) => colorPalette[key]).filter(Boolean);
}

export function imageFor(number: number, slug: string): string {
  return (
    art.cards[String(number)] ??
    `/images/cards/egyptian/${String(number).padStart(2, "0")}-${slug}.svg`
  );
}
