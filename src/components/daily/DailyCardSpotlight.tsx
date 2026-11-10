import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { DailyCardSelection } from "@/lib/tarot/daily";
import { formatDailyCardDate } from "@/lib/tarot/daily";
import { CardImage } from "@/components/ui/CardImage";

interface DailyCardSpotlightProps {
  daily: DailyCardSelection;
}

export function DailyCardSpotlight({ daily }: DailyCardSpotlightProps) {
  const { card, deck, dateKey, total } = daily;

  return (
    <article className="panel-gold ornament-corner relative overflow-hidden p-5 sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative grid gap-6 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] sm:items-center lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-10">
        <Link
          href={`/decks/${deck.id}/cards/${card.id}`}
          className="group mx-auto block w-36 max-w-full sm:mx-0 sm:w-full"
          aria-label={`Abrir la ficha de ${card.name}`}
        >
          <div className="relative overflow-hidden rounded-xl border border-gold/30 shadow-card transition duration-500 group-hover:-translate-y-1 group-hover:border-gold/60 group-hover:shadow-gold">
            <CardImage
              src={card.image}
              alt={card.name}
              priority
              sizes="(max-width: 640px) 144px, 220px"
            />
            <span className="absolute left-2 top-2 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-gold/30 bg-ink-950/75 px-2 font-display text-[0.66rem] tracking-wider text-gold-soft backdrop-blur-sm">
              {String(card.number).padStart(2, "0")}
            </span>
          </div>
        </Link>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="eyebrow flex items-center gap-2">
              <Sparkles size={13} aria-hidden="true" />
              La carta del día
            </p>
            <span className="text-[0.65rem] uppercase tracking-[0.16em] text-papyrus-dim">
              {formatDailyCardDate(dateKey)}
            </span>
          </div>

          <h2 className="mt-3 font-display text-2xl text-papyrus sm:text-3xl">{card.name}</h2>
          <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-gold-soft/80">
            {deck.name} · Arcano mayor {String(card.number).padStart(2, "0")}
          </p>

          <p className="mt-4 font-serif text-base italic leading-7 text-papyrus-muted sm:text-lg">
            “{card.message}”
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {card.keywords.slice(0, 4).map((keyword) => (
              <span key={keyword} className="tag border-gold/20 text-gold-soft/90">
                {keyword}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
            <Link href="/carta-del-dia" className="btn-primary text-xs">
              Ver el resumen del día
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <span className="text-[0.65rem] leading-5 text-papyrus-dim">
              Una de {total} cartas posibles. La misma durante todo el día.
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
