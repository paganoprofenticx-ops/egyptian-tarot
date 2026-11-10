"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { CardCategory, CardSeries, CardSummary, TarotDeck } from "@/types/tarot";
import { CardTile } from "@/components/cards/CardTile";
import { DeckProgress } from "@/components/decks/DeckProgress";
import { normalizeText } from "@/lib/tarot/search";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | CardCategory;
type SeriesFilter = "all" | CardSeries;

interface DeckExplorerProps {
  deck: TarotDeck;
  cards: CardSummary[];
  initialCategory?: CategoryFilter;
}

export function DeckExplorer({ deck, cards, initialCategory = "all" }: DeckExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [series, setSeries] = useState<SeriesFilter>("all");

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const isMarseille = deck.id === "marseille";

  const categoryOptions = useMemo<Array<{ value: CategoryFilter; label: string }>>(
    () => [
      { value: "all", label: "Todas" },
      { value: "major", label: "Arcanos mayores" },
      { value: "minor", label: isMarseille ? "Arcanos menores" : "Escenas menores" },
    ],
    [isMarseille],
  );

  const seriesOptions = useMemo<Array<{ value: SeriesFilter; label: string }>>(
    () => [
      { value: "all", label: isMarseille ? "Todos los palos" : "Todas las series" },
      { value: "bastos", label: "Bastos" },
      { value: "copas", label: "Copas" },
      { value: "espadas", label: "Espadas" },
      { value: "oros", label: "Oros" },
    ],
    [isMarseille],
  );

  const filtered = useMemo(() => {
    const needle = normalizeText(query);
    return cards.filter((card) => {
      if (category !== "all" && card.category !== category) return false;
      if (series !== "all" && card.series !== series) return false;
      if (!needle) return true;
      const haystack = normalizeText(
        [
          card.name,
          card.alternateName ?? "",
          card.keywords.join(" "),
          card.centralConcept,
          card.series ?? "",
          card.category === "major"
            ? "arcano mayor"
            : isMarseille
              ? "arcano menor"
              : "escena menor",
          String(card.number),
        ].join(" "),
      );
      return needle.split(/\s+/).every((token) => haystack.includes(token));
    });
  }, [cards, category, isMarseille, query, series]);

  const isFiltering = query.length > 0 || category !== "all" || series !== "all";

  const reset = () => {
    setQuery("");
    setCategory("all");
    setSeries("all");
  };

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-start">
        <div>
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-papyrus-dim"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, símbolo o palabra clave…"
              className="field pl-11 pr-11"
              aria-label="Buscar en este mazo"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-papyrus-dim transition hover:bg-white/10 hover:text-papyrus"
                aria-label="Borrar búsqueda"
              >
                <X size={15} aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label="Filtrar por tipo de carta">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setCategory(option.value)}
                className={cn("chip", category === option.value && "chip-active")}
                aria-pressed={category === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <DeckProgress deckId={deck.id} total={deck.availableCards} />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-white/[0.07] py-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <SlidersHorizontal size={14} className="shrink-0 text-papyrus-dim" aria-hidden="true" />
          {seriesOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSeries(option.value)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-[0.7rem] transition",
                series === option.value
                  ? "bg-gold/15 text-gold-soft"
                  : "text-papyrus-dim hover:text-papyrus",
              )}
              aria-pressed={series === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-papyrus-dim">
          {filtered.length} de {cards.length} cartas
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((card, index) => (
            <CardTile
              key={card.id}
              card={card}
              deckName={deck.name}
              priority={index < 5}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
          <p className="font-display text-lg text-papyrus">No encontramos cartas con esos filtros</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-papyrus-muted">
            Prueba con otra palabra, revisa la ortografía o vuelve a mostrar todas las cartas del mazo.
          </p>
          <button type="button" onClick={reset} className="btn-ghost mt-5 text-xs">
            Limpiar filtros
          </button>
        </div>
      )}

      {isFiltering ? (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={reset} className="btn-quiet">
            <X size={13} aria-hidden="true" />
            Quitar filtros
          </button>
        </div>
      ) : null}
    </div>
  );
}
