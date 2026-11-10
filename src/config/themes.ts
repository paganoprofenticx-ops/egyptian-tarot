import type { DeckTheme } from "@/types/tarot";

export interface ThemeConfig {
  label: string;
  description: string;
  dataTheme: DeckTheme;
  swatches: string[];
}

export const deckThemes: Record<DeckTheme, ThemeConfig> = {
  egyptian: {
    label: "Oro y papiro",
    description:
      "Negro azulado, oro envejecido y marfil. Inspirado en las láminas del libro de Thot.",
    dataTheme: "egyptian",
    swatches: ["#0B0F18", "#C9A227", "#E8DCC0", "#2A9D8F"],
  },
  "rider-waite": {
    label: "Cielo y arcano",
    description:
      "Azul profundo, plata y pequeños destellos de color. Una lectura clásica y luminosa.",
    dataTheme: "rider-waite",
    swatches: ["#0C1420", "#8FB3C9", "#E9E3D5", "#C9A227"],
  },
  marseille: {
    label: "Terracota histórica",
    description:
      "Marfil, rojo terracota y azul añil. Ecos de los naipes grabados de la tradición europea.",
    dataTheme: "marseille",
    swatches: ["#14100D", "#B65A4A", "#E9DCC3", "#3E5A78"],
  },
};

export const seriesLabels: Record<string, string> = {
  bastos: "Serie de Bastos",
  copas: "Serie de Copas",
  espadas: "Serie de Espadas",
  oros: "Serie de Oros",
};
