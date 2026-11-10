import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Briefcase,
  Compass,
  HandHeart,
  Layers,
  Sun,
} from "lucide-react";
import type { DailyCardSelection } from "@/lib/tarot/daily";
import { buildDailyCardSummary } from "@/lib/tarot/daily";
import { CardImage } from "@/components/ui/CardImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DailyCardActions } from "./DailyCardActions";

interface DailyCardViewProps {
  daily: DailyCardSelection;
}

export function DailyCardView({ daily }: DailyCardViewProps) {
  const { card, deck, total } = daily;
  const summary = buildDailyCardSummary(card);

  const summaryItems = [
    { label: "Energía del día", icon: Sun, text: summary.energy },
    { label: "El consejo", icon: Compass, text: summary.advice },
    { label: "En tus vínculos", icon: HandHeart, text: summary.love },
    { label: "En el trabajo", icon: Briefcase, text: summary.work },
    { label: "Bienestar", icon: Activity, text: summary.wellbeing },
  ];

  const savedCard = {
    deckId: deck.id,
    deckName: deck.name,
    cardId: card.id,
    number: card.number,
    name: card.name,
    image: card.image,
    category: card.category,
  };

  return (
    <div>
      <article className="panel-gold ornament-corner relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative grid gap-8 p-5 sm:p-7 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12 lg:p-10">
          <div className="mx-auto w-full max-w-[280px] lg:max-w-none lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-gold/30 shadow-card">
              <CardImage
                src={card.image}
                alt={`${card.name}${card.alternateName ? `, también llamada ${card.alternateName}` : ""}`}
                priority
                sizes="(max-width: 1024px) 280px, 320px"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 text-[0.62rem] uppercase tracking-[0.16em] text-papyrus-dim">
              <span>Arcano mayor</span>
              <span>Nº {String(card.number).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="min-w-0">
            <p className="eyebrow">{deck.name}</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-papyrus text-shadow-deep sm:text-5xl">
              {card.name}
            </h2>
            {card.alternateName ? (
              <p className="mt-2 font-serif text-xl italic text-gold-soft">{card.alternateName}</p>
            ) : null}

            <p className="mt-5 font-serif text-xl italic leading-8 text-papyrus-muted">
              “{card.message}”
            </p>
            <p className="prose-mystic mt-4">{card.centralConcept}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {card.keywords.map((keyword) => (
                <span key={keyword} className="tag border-gold/20 text-gold-soft/90">
                  {keyword}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <DailyCardActions
                card={savedCard}
                shareText={`${card.name} · ${deck.name}: ${card.centralConcept}`}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/decks/${deck.id}/cards/${card.id}`} className="btn-primary text-xs">
                Leer la ficha completa
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link href={`/decks/${deck.id}?categoria=major`} className="btn-ghost text-xs">
                <Layers size={15} aria-hidden="true" />
                Arcanos mayores de este mazo
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="mt-10">
        <SectionHeading
          eyebrow="Resumen para hoy"
          title="Claves para leer tu jornada"
          description="Estas claves nacen de la ficha de estudio de la carta. Léelas como puntos de partida, no como sentencias: lo importante es lo que te hacen notar."
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {summaryItems.map(({ label, icon: Icon, text }) => (
            <article
              key={label}
              className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/25 text-gold">
                <Icon size={16} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-[0.7rem] uppercase tracking-[0.18em] text-gold-soft/90">
                {label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-papyrus-muted">{text}</p>
            </article>
          ))}

          <article className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/25 text-gold">
              <Layers size={16} aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-[0.7rem] uppercase tracking-[0.18em] text-gold-soft/90">
              Palabras clave
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {card.keywords.map((keyword) => (
                <span key={keyword} className="tag border-gold/15 text-papyrus-muted">
                  {keyword}
                </span>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/[0.04] p-6 sm:p-8">
          <p className="eyebrow flex items-center gap-2">
            <BookOpen size={13} aria-hidden="true" />
            Pregunta para llevar
          </p>
          <p className="mt-3 max-w-3xl font-serif text-xl italic leading-8 text-papyrus">
            {summary.reflection}
          </p>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-6 text-papyrus-dim">
          La carta del día se elige al azar entre los {total} arcanos mayores de los mazos
          disponibles. Es la misma para todas las personas durante la jornada y cambia al día
          siguiente. No es una predicción: es una imagen para mirar el día con más atención.
        </p>
      </section>
    </div>
  );
}
