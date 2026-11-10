import type {
  CardCategory,
  CardSeries,
  CardSummary,
  DeckWithCards,
  TarotCard,
  TarotDeck,
} from "@/types/tarot";
import { decks } from "@/data/decks";
import { egyptianCards, egyptianFeaturedIds } from "@/data/egyptian";
import { marseilleCards, marseilleFeaturedIds } from "@/data/marseille";
import { riderWaiteCards, riderWaiteFeaturedIds } from "@/data/rider-waite";
import { normalizeText } from "@/lib/tarot/search";

export interface CardQuery {
  category?: CardCategory;
  series?: CardSeries;
  featuredOnly?: boolean;
}

export interface SearchHit {
  card: CardSummary;
  deckName: string;
  matchedOn: "nombre" | "palabra clave" | "concepto" | "contenido" | "número";
  excerpt: string;
}

export interface MajorArcanaEntry {
  card: TarotCard;
  deck: TarotDeck;
}

export interface TarotRepository {
  getDecks(): Promise<TarotDeck[]>;
  getDeck(deckId: string): Promise<TarotDeck | null>;
  getDeckWithCards(deckId: string): Promise<DeckWithCards | null>;
  getCards(deckId: string, query?: CardQuery): Promise<CardSummary[]>;
  getCard(deckId: string, cardId: string): Promise<TarotCard | null>;
  getMajorArcana(): Promise<MajorArcanaEntry[]>;
  getCardWithNeighbours(
    deckId: string,
    cardId: string,
  ): Promise<{
    card: TarotCard;
    deck: TarotDeck;
    previous: CardSummary | null;
    next: CardSummary | null;
    position: number;
    total: number;
  } | null>;
  getFeatured(deckId: string, limit?: number): Promise<CardSummary[]>;
  getGlobalSummaries(): Promise<Array<CardSummary & { deckName: string }>>;
  search(query: string, deckId?: string): Promise<SearchHit[]>;
}

const cardsByDeck: Record<string, TarotCard[]> = {
  "tarot-egipcio": egyptianCards,
  marseille: marseilleCards,
  "rider-waite": riderWaiteCards,
};

const featuredByDeck: Record<string, string[]> = {
  "tarot-egipcio": egyptianFeaturedIds,
  marseille: marseilleFeaturedIds,
  "rider-waite": riderWaiteFeaturedIds,
};

export function toSummary(card: TarotCard): CardSummary {
  return {
    id: card.id,
    deckId: card.deckId,
    number: card.number,
    name: card.name,
    alternateName: card.alternateName,
    image: card.image,
    category: card.category,
    series: card.series,
    keywords: card.keywords,
    centralConcept: card.centralConcept,
    contentStatus: card.contentStatus,
  };
}

function findDeck(deckId: string): TarotDeck | undefined {
  return decks.find((deck) => deck.id === deckId);
}

function filterCards(cards: TarotCard[], query: CardQuery = {}): TarotCard[] {
  return cards.filter((card) => {
    if (query.category && card.category !== query.category) return false;
    if (query.series && card.series !== query.series) return false;
    return true;
  });
}

function excerptFor(card: TarotCard): string {
  const text = card.generalMeaning;
  return text.length > 150 ? `${text.slice(0, 147).trimEnd()}…` : text;
}

class LocalTarotRepository implements TarotRepository {
  async getDecks(): Promise<TarotDeck[]> {
    return decks;
  }

  async getDeck(deckId: string): Promise<TarotDeck | null> {
    return findDeck(deckId) ?? null;
  }

  async getDeckWithCards(deckId: string): Promise<DeckWithCards | null> {
    const deck = findDeck(deckId);
    if (!deck) return null;

    return {
      ...deck,
      cards: (cardsByDeck[deckId] ?? []).map(toSummary),
    };
  }

  async getCards(deckId: string, query: CardQuery = {}): Promise<CardSummary[]> {
    const deck = findDeck(deckId);
    if (!deck) return [];

    const cards = cardsByDeck[deckId] ?? [];
    const featured = new Set(featuredByDeck[deckId] ?? []);

    return filterCards(cards, query)
      .filter((card) => !query.featuredOnly || featured.has(card.id))
      .sort((a, b) => a.number - b.number)
      .map(toSummary);
  }

  async getCard(deckId: string, cardId: string): Promise<TarotCard | null> {
    const deck = findDeck(deckId);
    if (!deck) return null;
    return (cardsByDeck[deckId] ?? []).find((card) => card.id === cardId) ?? null;
  }

  async getMajorArcana(): Promise<MajorArcanaEntry[]> {
    return decks
      .filter((deck) => deck.isAvailable)
      .flatMap((deck) =>
        (cardsByDeck[deck.id] ?? [])
          .filter((card) => card.category === "major")
          .map((card) => ({ card, deck })),
      );
  }

  async getCardWithNeighbours(deckId: string, cardId: string) {
    const deck = findDeck(deckId);
    if (!deck) return null;

    const cards = [...(cardsByDeck[deckId] ?? [])].sort((a, b) => a.number - b.number);
    const index = cards.findIndex((card) => card.id === cardId);
    if (index === -1) return null;

    return {
      card: cards[index],
      deck,
      previous: index > 0 ? toSummary(cards[index - 1]) : null,
      next: index < cards.length - 1 ? toSummary(cards[index + 1]) : null,
      position: index + 1,
      total: cards.length,
    };
  }

  async getFeatured(deckId: string, limit = 6): Promise<CardSummary[]> {
    const cards = await this.getCards(deckId, { featuredOnly: true });
    return cards.slice(0, limit);
  }

  async getGlobalSummaries(): Promise<Array<CardSummary & { deckName: string }>> {
    return Object.entries(cardsByDeck).flatMap(([deckId, cards]) => {
      const deckName = findDeck(deckId)?.name ?? deckId;
      return cards.map((card) => ({ ...toSummary(card), deckName }));
    });
  }

  async search(query: string, deckId?: string): Promise<SearchHit[]> {
    const normalized = normalizeText(query);
    if (!normalized) return [];

    const hits: Array<SearchHit & { score: number }> = [];
    const entries = deckId
      ? [[deckId, cardsByDeck[deckId] ?? []] as const]
      : Object.entries(cardsByDeck);

    for (const [currentDeckId, cards] of entries) {
      const deck = findDeck(currentDeckId);
      if (!deck) continue;

      for (const card of cards) {
        const name = normalizeText(`${card.name} ${card.alternateName ?? ""}`);
        const keywords = normalizeText(card.keywords.join(" "));
        const concept = normalizeText(
          `${card.centralConcept} ${card.category === "minor" ? card.series ?? "" : "arcano mayor"}`,
        );
        const content = normalizeText(
          `${card.generalMeaning} ${card.message} ${card.uprightMeaning} ${card.advice}`,
        );

        let score = -1;
        let matchedOn: SearchHit["matchedOn"] = "contenido";

        if (normalized === String(card.number)) {
          score = 110;
          matchedOn = "número";
        } else if (name.startsWith(normalized)) {
          score = 100;
          matchedOn = "nombre";
        } else if (name.includes(normalized)) {
          score = 80;
          matchedOn = "nombre";
        } else if (keywords.includes(normalized)) {
          score = 60;
          matchedOn = "palabra clave";
        } else if (concept.includes(normalized)) {
          score = 40;
          matchedOn = "concepto";
        } else if (content.includes(normalized)) {
          score = 20;
          matchedOn = "contenido";
        }

        if (score >= 0) {
          hits.push({
            card: toSummary(card),
            deckName: deck.name,
            matchedOn,
            excerpt: excerptFor(card),
            score,
          });
        }
      }
    }

    return hits
      .sort((a, b) => b.score - a.score || a.card.number - b.card.number)
      .map((hit) => ({
        card: hit.card,
        deckName: hit.deckName,
        matchedOn: hit.matchedOn,
        excerpt: hit.excerpt,
      }));
  }
}

export const tarotRepository: TarotRepository = new LocalTarotRepository();
