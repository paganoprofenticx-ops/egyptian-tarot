export type DeckTheme = "egyptian" | "rider-waite" | "marseille";

export type CardCategory = "major" | "minor";

export type CardSeries = "bastos" | "copas" | "espadas" | "oros";

export type ContentStatus = "complete" | "didactic";

export interface SymbolismItem {
  title: string;
  description: string;
  icon?: string;
}

export interface ColorKey {
  name: string;
  hex: string;
  meaning: string;
}

export interface NumerologyInfo {
  number: number;
  reduced: number;
  title: string;
  description: string;
}

export interface AstrologyInfo {
  planet?: string;
  sign?: string;
  element?: string;
  description: string;
  isStudyCorrespondence?: boolean;
}

export interface EsotericInfo {
  label: string;
  value: string;
  description?: string;
}

export interface TarotCard {
  id: string;
  deckId: string;
  number: number;
  name: string;
  alternateName?: string;
  image: string;
  category: CardCategory;
  series?: CardSeries;
  centralConcept: string;
  generalMeaning: string;
  message: string;
  keywords: string[];
  symbolism: SymbolismItem[];
  colors?: ColorKey[];
  numerology: NumerologyInfo;
  astrology?: AstrologyInfo;
  esoteric: EsotericInfo[];
  spiritualPlane: string;
  mentalPlane: string;
  materialPlane: string;
  uprightMeaning: string;
  reversedMeaning: string;
  loveMeaning: string;
  workMeaning: string;
  healthMeaning: string;
  personalDevelopment: string;
  advice: string;
  isFeatured?: boolean;
  contentStatus: ContentStatus;
}

export interface TarotDeck {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  origin: string;
  totalCards: number;
  availableCards: number;
  coverImage: string;
  backImage?: string;
  theme: DeckTheme;
  isAvailable: boolean;
  isFeatured?: boolean;
  features: string[];
  accentLabel: string;
}

/** Lightweight card shape used by galleries, search and local storage views. */
export interface CardSummary {
  id: string;
  deckId: string;
  number: number;
  name: string;
  alternateName?: string;
  image: string;
  category: CardCategory;
  series?: CardSeries;
  keywords: string[];
  centralConcept: string;
  contentStatus: ContentStatus;
}

export interface DeckWithCards extends TarotDeck {
  cards: CardSummary[];
}

export interface CardWithNeighbours {
  card: TarotCard;
  deck: TarotDeck;
  previous: CardSummary | null;
  next: CardSummary | null;
  position: number;
  total: number;
}
