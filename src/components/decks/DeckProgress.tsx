"use client";

import { useTarotStore } from "@/lib/storage/tarot-store";

interface DeckProgressProps {
  deckId: string;
  total: number;
  compact?: boolean;
}

export function DeckProgress({ deckId, total, compact = false }: DeckProgressProps) {
  const { viewedCount, hydrated } = useTarotStore();
  const viewed = hydrated ? Math.min(viewedCount(deckId), total) : 0;
  const percentage = total > 0 ? Math.round((viewed / total) * 100) : 0;

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-bright transition-[width] duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="shrink-0 text-[0.68rem] uppercase tracking-[0.16em] text-papyrus-dim">
          {viewed}/{total}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="eyebrow-muted">Tu recorrido</p>
          <p className="mt-1.5 text-sm text-papyrus">
            {viewed === 0
              ? "Aún no has abierto ninguna carta"
              : `${viewed} de ${total} cartas visitadas`}
          </p>
        </div>
        <span className="font-display text-xl text-gold-soft">{percentage}%</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-bright transition-[width] duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
