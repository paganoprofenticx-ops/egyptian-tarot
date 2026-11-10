"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock3, Trash2 } from "lucide-react";
import { useTarotStore, type StoredCard } from "@/lib/storage/tarot-store";
import { CardImage } from "@/components/ui/CardImage";

function dateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function dayLabel(date: Date): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (dateKey(date) === dateKey(today)) return "Hoy";
  if (dateKey(date) === dateKey(yesterday)) return "Ayer";

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: date.getFullYear() === today.getFullYear() ? undefined : "numeric",
  }).format(date);
}

function timeLabel(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function groupHistory(history: StoredCard[]) {
  const groups = new Map<string, { label: string; items: StoredCard[] }>();
  for (const item of history) {
    const date = new Date(item.timestamp);
    const label = Number.isNaN(date.getTime()) ? "Anterior" : dayLabel(date);
    const key = Number.isNaN(date.getTime()) ? "unknown" : dateKey(date);
    const group = groups.get(key) ?? { label, items: [] };
    group.items.push(item);
    groups.set(key, group);
  }
  return Array.from(groups.values());
}

export function HistoryView() {
  const { history, hydrated, removeHistory, clearHistory } = useTarotStore();
  const [confirming, setConfirming] = useState(false);
  const groups = useMemo(() => groupHistory(history), [history]);

  if (!hydrated) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex animate-pulse items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
            <div className="h-20 shrink-0 rounded-md bg-white/[0.04]" style={{ width: 52 }} />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 rounded bg-white/[0.05]" />
              <div className="h-3 w-2/3 rounded bg-white/[0.04]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/25 text-gold">
          <Clock3 size={22} aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-xl text-papyrus">Todavía no hay recorrido</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-papyrus-muted">
          Cada carta que abras quedará registrada aquí, junto con el mazo al que pertenece. Así
          puedes retomar el estudio donde lo dejaste.
        </p>
        <Link href="/decks/tarot-egipcio" className="btn-primary mt-6 text-xs">
          Abrir el índice del mazo
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-papyrus-muted">
          <span className="text-papyrus">{history.length}</span>{" "}
          {history.length === 1 ? "carta visitada" : "cartas visitadas"} · solo en este dispositivo
        </p>
        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-papyrus-dim">¿Borrar el historial?</span>
            <button
              type="button"
              onClick={() => {
                clearHistory();
                setConfirming(false);
              }}
              className="rounded-full border border-carnelian/40 bg-carnelian/10 px-3 py-1.5 text-xs text-[#E7A28F]"
            >
              Sí, borrar
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-papyrus-muted"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirming(true)} className="btn-quiet">
            <Trash2 size={13} aria-hidden="true" />
            Vaciar historial
          </button>
        )}
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <section key={group.label}>
            <h2 className="eyebrow-muted mb-3">{group.label}</h2>
            <ul className="space-y-2">
              {group.items.map((item) => {
                const date = new Date(item.timestamp);
                return (
                  <li
                    key={`${item.deckId}-${item.cardId}`}
                    className="group flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 transition hover:border-gold/30 hover:bg-white/[0.035]"
                  >
                    <Link
                      href={`/decks/${item.deckId}/cards/${item.cardId}`}
                      className="w-12 shrink-0 overflow-hidden rounded-md border border-white/10 shadow-card"
                      aria-label={`Abrir ${item.name}`}
                    >
                      <CardImage src={item.image} alt={item.name} sizes="48px" />
                    </Link>
                    <Link href={`/decks/${item.deckId}/cards/${item.cardId}`} className="min-w-0 flex-1">
                      <h3 className="font-display text-sm text-papyrus transition group-hover:text-gold-soft">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-[0.68rem] uppercase tracking-[0.12em] text-papyrus-dim">
                        {item.deckName} · Nº {String(item.number).padStart(2, "0")}
                      </p>
                      {!Number.isNaN(date.getTime()) ? (
                        <p className="mt-1 text-xs text-papyrus-dim">{timeLabel(date)} h</p>
                      ) : null}
                    </Link>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => removeHistory(item.deckId, item.cardId)}
                        className="grid h-9 w-9 place-items-center rounded-full text-papyrus-dim transition hover:bg-white/[0.06] hover:text-[#E7A28F]"
                        aria-label={`Eliminar ${item.name} del historial`}
                      >
                        <Trash2 size={14} aria-hidden="true" />
                      </button>
                      <Link
                        href={`/decks/${item.deckId}/cards/${item.cardId}`}
                        className="grid h-9 w-9 place-items-center rounded-full text-papyrus-dim transition hover:bg-white/[0.06] hover:text-gold-soft"
                        aria-label={`Abrir ${item.name}`}
                      >
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
