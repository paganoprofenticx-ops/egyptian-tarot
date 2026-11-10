"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  LayoutGrid,
  RotateCcw,
  Share2,
  Sparkles,
} from "lucide-react";
import type { CardSummary, TarotCard, TarotDeck } from "@/types/tarot";
import { siteConfig } from "@/config/site";
import { useTarotStore } from "@/lib/storage/tarot-store";
import { cn } from "@/lib/utils";

interface CardExperienceProps {
  card: TarotCard;
  deck: TarotDeck;
  previous: CardSummary | null;
  next: CardSummary | null;
  position: number;
  total: number;
}

function DetailSection({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/[0.07] pt-8">
      <p className="eyebrow-muted">{kicker}</p>
      <h2 className="mt-2 font-display text-2xl text-papyrus">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function PlaneCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold/80">{label}</p>
      <p className="mt-2 text-sm leading-6 text-papyrus-muted">{text}</p>
    </div>
  );
}

export function CardExperience({
  card,
  deck,
  previous,
  next,
  position,
  total,
}: CardExperienceProps) {
  const router = useRouter();
  const { hydrated, isFavorite, toggleFavorite, recordView, viewedCount } =
    useTarotStore();

  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const favorite = hydrated && isFavorite(deck.id, card.id);
  const viewed = hydrated ? viewedCount(deck.id) : 0;

  const savedCard = useMemo(
    () => ({
      deckId: deck.id,
      deckName: deck.name,
      cardId: card.id,
      number: card.number,
      name: card.name,
      image: card.image,
      category: card.category,
    }),
    [card.category, card.id, card.image, card.name, card.number, deck.id, deck.name],
  );

  useEffect(() => {
    recordView(savedCard);
    setFlipped(false);
  }, [recordView, savedCard]);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const goTo = useCallback(
    (target: CardSummary | null) => {
      if (!target) return;
      router.push(`/decks/${deck.id}/cards/${target.id}`);
    },
    [deck.id, router],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(previous);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(next);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, next, previous]);

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.35) return;
    if (dx < 0) goTo(next);
    else goTo(previous);
  };

  const share = async () => {
    const url = window.location.href;
    const shareData = {
      title: `${card.name} · ${deck.name}`,
      text: `${card.name} (${card.number}) en ${deck.name}: ${card.centralConcept}`,
      url,
    };
    try {
      if (typeof navigator.share === "function") {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      // El usuario canceló el diálogo de compartir o el portapapeles no está disponible.
    }
  };

  const onToggleFavorite = () => toggleFavorite(savedCard);

  const isMajor = card.category === "major";
  const isMarseille = deck.id === "marseille";

  return (
    <div className="pb-28 md:pb-10">
      <div className="container-page pt-5 sm:pt-8">
        <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] text-papyrus-dim">
          <Link href="/" className="transition hover:text-gold-soft">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/decks" className="transition hover:text-gold-soft">Mazos</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/decks/${deck.id}`} className="transition hover:text-gold-soft">{deck.name}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-papyrus-muted" aria-current="page">{card.name}</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag">
              {isMajor ? "Arcano mayor" : isMarseille ? "Arcano menor" : "Escena menor"}
            </span>
            <span className="tag">
              {card.contentStatus === "complete" ? "Ficha completa" : "Síntesis didáctica"}
            </span>
            <span className="tag">Nº {String(card.number).padStart(2, "0")} de {total}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={share}
              className="btn-quiet"
              aria-label="Compartir esta carta"
            >
              {copied ? <Check size={14} aria-hidden="true" /> : <Share2 size={14} aria-hidden="true" />}
              <span className="hidden sm:inline">{copied ? "Enlace copiado" : "Compartir"}</span>
            </button>
            <button
              type="button"
              onClick={onToggleFavorite}
              className={cn(
                "btn-quiet",
                favorite && "border-gold/50 bg-gold/10 text-gold-soft",
              )}
              aria-pressed={favorite}
              aria-label={favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
              <Heart size={15} fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
              <span className="hidden sm:inline">{favorite ? "Guardada" : "Guardar"}</span>
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="mx-auto w-full max-w-[330px] touch-pan-y sm:max-w-[360px] lg:max-w-none"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              role="group"
              aria-label="Carta. Desliza a los lados para cambiar de carta."
            >
              <div className="flip-scene">
                <button
                  type="button"
                  onClick={() => setFlipped((value) => !value)}
                  className="relative block w-full rounded-2xl focus-visible:outline-none"
                  aria-pressed={flipped}
                  aria-label={flipped ? "Mostrar el anverso de la carta" : "Girar la carta para ver el dorso"}
                >
                  <div className={cn("flip-inner aspect-[16/25] w-full", flipped && "is-flipped")}>
                    <div className="flip-face absolute inset-0 overflow-hidden rounded-2xl border border-gold/30 bg-ink-900 shadow-card">
                      <Image
                        src={card.image}
                        alt={`${card.name}${card.alternateName ? `, también llamada ${card.alternateName}` : ""}`}
                        width={640}
                        height={1000}
                        priority
                        sizes="(max-width: 1024px) 360px, 400px"
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-ink-950/95 to-transparent pb-3 pt-10 text-[0.6rem] uppercase tracking-[0.2em] text-papyrus-muted">
                        <RotateCcw size={12} aria-hidden="true" />
                        Toca para girar
                      </span>
                    </div>
                    <div className="flip-face flip-back overflow-hidden rounded-2xl border border-gold/25 bg-ink-900 shadow-card">
                      <Image
                        src={deck.backImage ?? "/images/cards/back.svg"}
                        alt={`Dorso de ${deck.name}`}
                        width={640}
                        height={1000}
                        sizes="(max-width: 1024px) 360px, 400px"
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/95 to-transparent pb-3 pt-10 text-center text-[0.6rem] uppercase tracking-[0.2em] text-papyrus-muted">
                        Toca para volver
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="mx-auto mt-4 flex max-w-[360px] items-center justify-between gap-2 lg:max-w-none">
              <button
                type="button"
                onClick={() => goTo(previous)}
                disabled={!previous}
                className="btn-quiet disabled:cursor-not-allowed disabled:opacity-35"
                aria-label={previous ? `Carta anterior: ${previous.name}` : "No hay carta anterior"}
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Anterior
              </button>
              <span className="font-display text-xs tracking-[0.2em] text-papyrus-dim">
                {String(position).padStart(2, "0")} / {total}
              </span>
              <button
                type="button"
                onClick={() => goTo(next)}
                disabled={!next}
                className="btn-quiet disabled:cursor-not-allowed disabled:opacity-35"
                aria-label={next ? `Carta siguiente: ${next.name}` : "No hay carta siguiente"}
              >
                Siguiente
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>

            <div className="mx-auto mt-4 max-w-[360px] lg:max-w-none">
              <div className="flex items-center gap-3">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-bright"
                    style={{ width: `${total ? (position / total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-[0.62rem] uppercase tracking-[0.15em] text-papyrus-dim">
                  {viewed}/{total} vistas
                </span>
              </div>
              <p className="mt-3 hidden text-center text-[0.65rem] leading-5 text-papyrus-dim md:block">
                Usa las flechas del teclado o desliza sobre la carta para avanzar.
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <header>
              <p className="eyebrow">
                {isMajor ? "Arcano mayor" : isMarseille ? "Arcano menor" : "Escena menor"}
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-papyrus text-shadow-deep sm:text-5xl">
                {card.name}
              </h1>
              {card.alternateName ? (
                <p className="mt-2 font-serif text-xl italic text-gold-soft">
                  {card.alternateName}
                </p>
              ) : null}
              <p className="mt-4 max-w-2xl font-serif text-lg italic leading-8 text-papyrus-muted">
                “{card.message}”
              </p>
              <p className="prose-mystic mt-4 max-w-2xl">{card.centralConcept}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {card.keywords.map((keyword) => (
                  <span key={keyword} className="tag border-gold/20 text-gold-soft/90">
                    {keyword}
                  </span>
                ))}
              </div>
            </header>

            <nav
              className="sticky top-16 z-20 -mx-4 mt-7 flex gap-2 overflow-x-auto border-y border-white/[0.07] bg-ink-950/85 px-4 py-3 backdrop-blur-xl no-scrollbar sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
              aria-label="Secciones de la ficha"
            >
              {[
                ["general", "General"],
                ["simbologia", "Simbología"],
                ["correspondencias", "Correspondencias"],
                ["interpretaciones", "Interpretaciones"],
                ["consejo", "Consejo"],
              ].map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="shrink-0 rounded-full border border-white/10 px-3.5 py-2 text-[0.68rem] uppercase tracking-[0.13em] text-papyrus-muted transition hover:border-gold/40 hover:text-gold-soft"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="mt-8 space-y-8">
              <section id="general" className="scroll-mt-24">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-gold" aria-hidden="true" />
                  <h2 className="font-display text-xl text-papyrus">General</h2>
                </div>
                <p className="prose-mystic mt-4">{card.generalMeaning}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <PlaneCard label="Plano espiritual" text={card.spiritualPlane} />
                  <PlaneCard label="Plano mental" text={card.mentalPlane} />
                  <PlaneCard label="Plano material" text={card.materialPlane} />
                </div>
              </section>

              <DetailSection id="simbologia" kicker="Leer la imagen" title="Simbología">
                <ol className="space-y-3">
                  {card.symbolism.map((item, index) => (
                    <li key={`${item.title}-${index}`} className="flex gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/30 font-display text-[0.68rem] text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-sm tracking-wide text-papyrus">{item.title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-papyrus-muted">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                {card.colors && card.colors.length > 0 ? (
                  <div className="mt-5">
                    <h3 className="eyebrow-muted mb-3">Paleta de la carta</h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {card.colors.map((color) => (
                        <div key={color.hex} className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                          <span
                            className="mt-0.5 h-8 w-8 shrink-0 rounded-full border border-white/20"
                            style={{ backgroundColor: color.hex }}
                            aria-hidden="true"
                          />
                          <div>
                            <p className="text-sm text-papyrus">{color.name}</p>
                            <p className="mt-0.5 text-xs leading-5 text-papyrus-dim">{color.meaning}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </DetailSection>

              <DetailSection id="correspondencias" kicker="Claves de estudio" title="Correspondencias">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-gold/20 bg-gold/[0.04] p-4">
                    <p className="eyebrow-muted">Numerología</p>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="font-display text-4xl text-gold-soft">{card.numerology.number}</span>
                      {card.numerology.reduced !== card.numerology.number ? (
                        <span className="text-xs text-papyrus-dim">reduce a {card.numerology.reduced}</span>
                      ) : null}
                    </div>
                    <p className="mt-2 font-display text-sm tracking-wide text-papyrus">{card.numerology.title}</p>
                    <p className="mt-1.5 text-sm leading-6 text-papyrus-muted">{card.numerology.description}</p>
                  </div>

                  {card.astrology ? (
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                      <p className="eyebrow-muted">Astrología</p>
                      <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        {card.astrology.planet ? (
                          <span className="font-display text-lg text-papyrus">{card.astrology.planet}</span>
                        ) : null}
                        {card.astrology.sign ? (
                          <span className="font-display text-lg text-papyrus">{card.astrology.sign}</span>
                        ) : null}
                        {card.astrology.element ? (
                          <span className="text-xs uppercase tracking-[0.16em] text-gold/80">
                            {card.astrology.element}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-papyrus-muted">{card.astrology.description}</p>
                      {card.astrology.isStudyCorrespondence ? (
                        <p className="mt-2 text-[0.66rem] uppercase tracking-[0.14em] text-papyrus-dim">
                          Correspondencia didáctica, no impresa en la baraja
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                {card.series ? (
                  <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                    <p className="eyebrow-muted">
                      {isMarseille ? "Palo y elemento" : "Serie de estudio"}
                    </p>
                    <p className="mt-2 text-sm text-papyrus">
                      {card.series === "bastos" && "Serie de Bastos"}
                      {card.series === "copas" && "Serie de Copas"}
                      {card.series === "espadas" && "Serie de Espadas"}
                      {card.series === "oros" && "Serie de Oros"}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-papyrus-dim">
                      {isMarseille
                        ? "En el Tarot de Marsella cada palo reúne catorce arcanos menores, del As al Rey. La serie agrupa las cartas por palo y elemento."
                        : "En la baraja egipcia las escenas menores no llevan palos impresos. Esta serie es una herramienta didáctica para agrupar temas y elementos."}
                    </p>
                  </div>
                ) : null}

                {card.esoteric.length > 0 ? (
                  <div className="mt-3 space-y-2">
                    {card.esoteric.map((item) => (
                      <div key={item.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-gold/80">{item.label}</p>
                          <p className="font-display text-sm text-papyrus">{item.value}</p>
                        </div>
                        {item.description ? (
                          <p className="mt-2 text-sm leading-6 text-papyrus-muted">{item.description}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                <p className="mt-4 text-[0.68rem] leading-5 text-papyrus-dim">
                  Las correspondencias astrológicas, cabalísticas y numerológicas son claves de
                  estudio y pueden variar según la edición. {siteConfig.contentNotice}
                </p>
              </DetailSection>

              <DetailSection id="interpretaciones" kicker="Planos de lectura" title="Interpretaciones">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-gold/20 bg-gold/[0.035] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-gold">Al derecho</p>
                    <p className="mt-2 text-sm leading-6 text-papyrus-muted">{card.uprightMeaning}</p>
                  </div>
                  <div className="rounded-xl border border-violet/30 bg-violet/[0.07] p-4">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#C8BDE8]">Invertida</p>
                    <p className="mt-2 text-sm leading-6 text-papyrus-muted">{card.reversedMeaning}</p>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Amor y vínculos", card.loveMeaning],
                    ["Trabajo y proyectos", card.workMeaning],
                    ["Salud y energía", card.healthMeaning],
                    ["Crecimiento personal", card.personalDevelopment],
                  ].map(([label, text]) => (
                    <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                      <h3 className="font-display text-sm tracking-wide text-papyrus">{label}</h3>
                      <p className="mt-2 text-sm leading-6 text-papyrus-muted">{text}</p>
                    </div>
                  ))}
                </div>
              </DetailSection>

              <DetailSection id="consejo" kicker="Llevar a la práctica" title="Consejo">
                <div className="ornament-corner rounded-2xl border border-gold/25 bg-gold/[0.05] p-5 sm:p-6">
                  <p className="font-serif text-lg italic leading-8 text-gold-soft">“{card.advice}”</p>
                </div>
                <p className="prose-mystic mt-4">{card.personalDevelopment}</p>
              </DetailSection>

              <div className="grid gap-3 border-t border-white/[0.07] pt-8 sm:grid-cols-2">
                {previous ? (
                  <Link
                    href={`/decks/${deck.id}/cards/${previous.id}`}
                    className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-gold/40"
                  >
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-papyrus-dim">Anterior · {previous.number}</p>
                    <p className="mt-1.5 font-display text-sm text-papyrus transition group-hover:text-gold-soft">
                      {previous.name}
                    </p>
                  </Link>
                ) : <div />}
                {next ? (
                  <Link
                    href={`/decks/${deck.id}/cards/${next.id}`}
                    className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 text-right transition hover:border-gold/40"
                  >
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-papyrus-dim">Siguiente · {next.number}</p>
                    <p className="mt-1.5 font-display text-sm text-papyrus transition group-hover:text-gold-soft">
                      {next.name}
                    </p>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/[0.94] backdrop-blur-xl md:hidden no-print">
        <div className="safe-bottom mx-auto grid max-w-lg grid-cols-4 gap-1 px-2 pt-1.5">
          <button
            type="button"
            onClick={() => goTo(previous)}
            disabled={!previous}
            className="flex min-h-[3.4rem] flex-col items-center justify-center gap-1 rounded-xl text-[0.6rem] uppercase tracking-[0.12em] text-papyrus-muted disabled:opacity-35"
            aria-label={previous ? `Anterior: ${previous.name}` : "No hay carta anterior"}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Anterior
          </button>
          <Link
            href={`/decks/${deck.id}`}
            className="flex min-h-[3.4rem] flex-col items-center justify-center gap-1 rounded-xl text-[0.6rem] uppercase tracking-[0.12em] text-papyrus-muted"
            aria-label="Volver al índice del mazo"
          >
            <LayoutGrid size={18} aria-hidden="true" />
            Índice
          </Link>
          <button
            type="button"
            onClick={onToggleFavorite}
            className={cn(
              "flex min-h-[3.4rem] flex-col items-center justify-center gap-1 rounded-xl text-[0.6rem] uppercase tracking-[0.12em]",
              favorite ? "text-gold-soft" : "text-papyrus-muted",
            )}
            aria-pressed={favorite}
            aria-label={favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <Heart size={18} fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
            {favorite ? "Guardada" : "Guardar"}
          </button>
          <button
            type="button"
            onClick={() => goTo(next)}
            disabled={!next}
            className="flex min-h-[3.4rem] flex-col items-center justify-center gap-1 rounded-xl text-[0.6rem] uppercase tracking-[0.12em] text-papyrus-muted disabled:opacity-35"
            aria-label={next ? `Siguiente: ${next.name}` : "No hay carta siguiente"}
          >
            <ArrowRight size={18} aria-hidden="true" />
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
