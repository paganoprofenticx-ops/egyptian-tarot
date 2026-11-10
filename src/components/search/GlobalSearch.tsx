"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, X } from "lucide-react";
import type { CardSummary } from "@/types/tarot";
import { CardImage } from "@/components/ui/CardImage";
import { normalizeText } from "@/lib/tarot/search";
import { cn } from "@/lib/utils";

type SearchCard = CardSummary & { deckName: string };

interface GlobalSearchProps {
  cards: SearchCard[];
  initialQuery?: string;
}

const suggestions = [
  "amor",
  "trabajo",
  "comienzo",
  "ciclo",
  "transformación",
  "intuición",
  "paciencia",
  "renacimiento",
];

export function GlobalSearch({ cards, initialQuery = "" }: GlobalSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [deckFilter, setDeckFilter] = useState("all");

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const deckNames = useMemo(
    () => Array.from(new Set(cards.map((card) => card.deckName))),
    [cards],
  );

  const results = useMemo(() => {
    const needle = normalizeText(query);
    if (!needle) return [];
    const tokens = needle.split(/\s+/).filter(Boolean);

    return cards
      .filter((card) => deckFilter === "all" || card.deckName === deckFilter)
      .map((card) => {
        const name = normalizeText(`${card.name} ${card.alternateName ?? ""}`);
        const keywords = normalizeText(card.keywords.join(" "));
        const concept = normalizeText(`${card.centralConcept} ${card.series ?? ""}`);
        const haystack = normalizeText(
          `${name} ${keywords} ${concept} ${card.category} ${card.number} ${card.deckName}`,
        );
        if (!tokens.every((token) => haystack.includes(token))) return null;

        let score = 1;
        if (name.startsWith(needle)) score = 5;
        else if (name.includes(needle)) score = 4;
        else if (keywords.includes(needle)) score = 3;
        else if (concept.includes(needle)) score = 2;
        if (String(card.number) === needle) score = 6;

        return { card, score };
      })
      .filter((entry): entry is { card: SearchCard; score: number } => entry !== null)
      .sort((a, b) => b.score - a.score || a.card.number - b.card.number)
      .slice(0, 40)
      .map((entry) => entry.card);
  }, [cards, deckFilter, query]);

  return (
    <div>
      <div className="relative">
        <Search
          size={20}
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-papyrus-dim"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Una carta, un símbolo, una pregunta…"
          className="h-14 w-full rounded-full border border-white/15 bg-ink-900/85 pl-12 pr-12 text-base text-papyrus placeholder:text-papyrus-dim focus:border-gold/60"
          aria-label="Buscar en toda la biblioteca"
          autoFocus
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-papyrus-dim transition hover:bg-white/10 hover:text-papyrus"
            aria-label="Borrar búsqueda"
          >
            <X size={17} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {deckNames.length > 1 ? (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setDeckFilter("all")}
            className={cn("chip", deckFilter === "all" && "chip-active")}
            aria-pressed={deckFilter === "all"}
          >
            Todos los mazos
          </button>
          {deckNames.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setDeckFilter(name)}
              className={cn("chip", deckFilter === name && "chip-active")}
              aria-pressed={deckFilter === name}
            >
              {name}
            </button>
          ))}
        </div>
      ) : null}

      {!query ? (
        <div className="mt-10">
          <p className="eyebrow-muted flex items-center gap-2">
            <Sparkles size={13} aria-hidden="true" />
            Prueba con un tema
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-papyrus-muted transition hover:border-gold/40 hover:text-gold-soft"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <p className="font-display text-lg text-papyrus">Busca como leerías una tirada</p>
            <p className="mt-2 max-w-xl text-sm leading-7 text-papyrus-muted">
              Puedes escribir el nombre de una carta, una palabra clave, un número o una idea.
              La búsqueda ignora mayúsculas y acentos: «ilusion» encontrará «La Ilusión».
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-papyrus-muted">
              {results.length > 0 ? (
                <>
                  <span className="text-papyrus">{results.length}</span>{" "}
                  {results.length === 1 ? "carta encontrada" : "cartas encontradas"}
                </>
              ) : (
                "Sin resultados"
              )}
            </p>
            {results.length === 40 ? (
              <p className="text-[0.68rem] uppercase tracking-[0.14em] text-papyrus-dim">
                Mostrando las 40 más relevantes
              </p>
            ) : null}
          </div>

          {results.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {results.map((card) => (
                <li key={`${card.deckId}-${card.id}`}>
                  <Link
                    href={`/decks/${card.deckId}/cards/${card.id}`}
                    className="group flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 transition hover:border-gold/40 hover:bg-white/[0.04] sm:p-4"
                  >
                    <div className="w-12 shrink-0 overflow-hidden rounded-md border border-white/10 shadow-card sm:w-14">
                      <CardImage
                        src={card.image}
                        alt={card.name}
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <h3 className="font-display text-sm text-papyrus transition group-hover:text-gold-soft sm:text-base">
                          {card.name}
                        </h3>
                        <span className="text-[0.62rem] uppercase tracking-[0.14em] text-papyrus-dim">
                          {card.deckName} · {String(card.number).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-1 text-xs leading-5 text-papyrus-muted sm:text-sm">
                        {card.centralConcept}
                      </p>
                      <p className="mt-1 truncate text-[0.66rem] text-papyrus-dim">
                        {card.keywords.slice(0, 4).join(" · ")}
                      </p>
                    </div>
                    <ArrowRight
                      size={15}
                      className="shrink-0 text-papyrus-dim transition group-hover:translate-x-0.5 group-hover:text-gold"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
              <p className="font-display text-lg text-papyrus">No encontramos esa palabra</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-papyrus-muted">
                Prueba con un término más general, revisa la ortografía o busca por el número de la
                carta. También puedes explorar el índice completo del mazo.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={() => setQuery("")} className="btn-ghost text-xs">
                  Borrar búsqueda
                </button>
                <Link href="/decks/tarot-egipcio" className="btn-quiet">
                  Ver todas las cartas
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
