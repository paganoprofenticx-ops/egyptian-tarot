"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CardCategory } from "@/types/tarot";

const STORAGE_PREFIX = "arcana:v1";
const KEYS = {
  favorites: `${STORAGE_PREFIX}:favorites`,
  history: `${STORAGE_PREFIX}:history`,
  progress: `${STORAGE_PREFIX}:progress`,
  lastCard: `${STORAGE_PREFIX}:last-card`,
} as const;

const MAX_HISTORY = 60;

export interface StoredCard {
  deckId: string;
  deckName: string;
  cardId: string;
  number: number;
  name: string;
  image: string;
  category: CardCategory;
  /** Fecha ISO del guardado o de la última visita, según la lista. */
  timestamp: string;
}

export type LastCard = Omit<StoredCard, "timestamp"> & { timestamp: string };

type ProgressState = Record<string, string[]>;

export interface TarotStoreValue {
  hydrated: boolean;
  favorites: StoredCard[];
  history: StoredCard[];
  lastCard: LastCard | null;
  progress: ProgressState;
  isFavorite: (deckId: string, cardId: string) => boolean;
  toggleFavorite: (card: Omit<StoredCard, "timestamp">) => void;
  removeFavorite: (deckId: string, cardId: string) => void;
  clearFavorites: () => void;
  isViewed: (deckId: string, cardId: string) => boolean;
  viewedCount: (deckId: string) => number;
  recordView: (card: Omit<StoredCard, "timestamp">) => void;
  removeHistory: (deckId: string, cardId: string) => void;
  clearHistory: () => void;
}

const TarotStoreContext = createContext<TarotStoreValue | null>(null);

function isStoredCard(value: unknown): value is StoredCard {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<StoredCard>;
  return (
    typeof candidate.deckId === "string" &&
    typeof candidate.deckName === "string" &&
    typeof candidate.cardId === "string" &&
    typeof candidate.number === "number" &&
    typeof candidate.name === "string" &&
    typeof candidate.image === "string" &&
    (candidate.category === "major" || candidate.category === "minor") &&
    typeof candidate.timestamp === "string"
  );
}

function readList(key: string): StoredCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isStoredCard) : [];
  } catch {
    return [];
  }
}

function readProgress(): ProgressState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEYS.progress);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>)
        .filter(([, value]) => Array.isArray(value))
        .map(([deckId, value]) => [
          deckId,
          (value as unknown[]).filter((id): id is string => typeof id === "string"),
        ]),
    );
  } catch {
    return {};
  }
}

function readLastCard(): LastCard | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEYS.lastCard);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isStoredCard(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function persist(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Almacenamiento no disponible (modo privado, cuota llena): la app sigue funcionando.
  }
}

export function TarotStoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [favorites, setFavorites] = useState<StoredCard[]>([]);
  const [history, setHistory] = useState<StoredCard[]>([]);
  const [progress, setProgress] = useState<ProgressState>({});
  const [lastCard, setLastCard] = useState<LastCard | null>(null);

  const load = useCallback(() => {
    setFavorites(readList(KEYS.favorites));
    setHistory(readList(KEYS.history));
    setProgress(readProgress());
    setLastCard(readLastCard());
  }, []);

  useEffect(() => {
    load();
    setHydrated(true);

    const onStorage = (event: StorageEvent) => {
      if (!event.key || !event.key.startsWith(STORAGE_PREFIX)) return;
      load();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [load]);

  useEffect(() => {
    if (hydrated) persist(KEYS.favorites, favorites);
  }, [favorites, hydrated]);

  useEffect(() => {
    if (hydrated) persist(KEYS.history, history);
  }, [history, hydrated]);

  useEffect(() => {
    if (hydrated) persist(KEYS.progress, progress);
  }, [progress, hydrated]);

  useEffect(() => {
    if (hydrated) persist(KEYS.lastCard, lastCard);
  }, [lastCard, hydrated]);

  const isFavorite = useCallback(
    (deckId: string, cardId: string) =>
      favorites.some((item) => item.deckId === deckId && item.cardId === cardId),
    [favorites],
  );

  const toggleFavorite = useCallback((card: Omit<StoredCard, "timestamp">) => {
    setFavorites((current) => {
      const exists = current.some(
        (item) => item.deckId === card.deckId && item.cardId === card.cardId,
      );
      if (exists) {
        return current.filter(
          (item) => !(item.deckId === card.deckId && item.cardId === card.cardId),
        );
      }
      return [{ ...card, timestamp: new Date().toISOString() }, ...current];
    });
  }, []);

  const removeFavorite = useCallback((deckId: string, cardId: string) => {
    setFavorites((current) =>
      current.filter((item) => !(item.deckId === deckId && item.cardId === cardId)),
    );
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const isViewed = useCallback(
    (deckId: string, cardId: string) => (progress[deckId] ?? []).includes(cardId),
    [progress],
  );

  const viewedCount = useCallback(
    (deckId: string) => (progress[deckId] ?? []).length,
    [progress],
  );

  const recordView = useCallback((card: Omit<StoredCard, "timestamp">) => {
    const timestamp = new Date().toISOString();
    const entry: StoredCard = { ...card, timestamp };

    setHistory((current) => [
      entry,
      ...current.filter(
        (item) => !(item.deckId === card.deckId && item.cardId === card.cardId),
      ),
    ].slice(0, MAX_HISTORY));
    setProgress((current) => {
      const viewed = current[card.deckId] ?? [];
      if (viewed.includes(card.cardId)) return current;
      return { ...current, [card.deckId]: [...viewed, card.cardId] };
    });
    setLastCard(entry);
  }, []);

  const removeHistory = useCallback((deckId: string, cardId: string) => {
    setHistory((current) =>
      current.filter((item) => !(item.deckId === deckId && item.cardId === cardId)),
    );
    setLastCard((current) =>
      current && current.deckId === deckId && current.cardId === cardId ? null : current,
    );
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setLastCard(null);
  }, []);

  const value = useMemo<TarotStoreValue>(
    () => ({
      hydrated,
      favorites,
      history,
      lastCard,
      progress,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      isViewed,
      viewedCount,
      recordView,
      removeHistory,
      clearHistory,
    }),
    [
      hydrated,
      favorites,
      history,
      lastCard,
      progress,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      isViewed,
      viewedCount,
      recordView,
      removeHistory,
      clearHistory,
    ],
  );

  return <TarotStoreContext.Provider value={value}>{children}</TarotStoreContext.Provider>;
}

export function useTarotStore(): TarotStoreValue {
  const context = useContext(TarotStoreContext);
  if (!context) {
    throw new Error("useTarotStore debe usarse dentro de TarotStoreProvider");
  }
  return context;
}

export { KEYS as TAROT_STORAGE_KEYS };
