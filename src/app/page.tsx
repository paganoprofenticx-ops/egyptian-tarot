import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Eye,
  Layers,
  Sparkles,
} from "lucide-react";
import { tarotRepository } from "@/lib/tarot/repository";
import { CardImage } from "@/components/ui/CardImage";
import { CardTile } from "@/components/cards/CardTile";
import { DeckCard } from "@/components/decks/DeckCard";
import { ContinueReading } from "@/components/home/ContinueReading";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

const readingSteps = [
  {
    icon: Eye,
    title: "Mira la imagen",
    text: "Antes de leer cualquier definición, recorre la lámina. ¿Qué figura atrae tu atención? ¿Qué emoción aparece?",
  },
  {
    icon: BookOpen,
    title: "Lee los símbolos",
    text: "Cada ficha separa la tradición de la síntesis didáctica. Contrasta lo que ves con las claves de estudio.",
  },
  {
    icon: Compass,
    title: "Lleva el consejo",
    text: "Una carta no dicta el futuro: propone una pregunta y una acción pequeña. Eso es lo que convierte el estudio en práctica.",
  },
];

export default async function HomePage() {
  const [decks, featured, egyptianDeck] = await Promise.all([
    tarotRepository.getDecks(),
    tarotRepository.getFeatured("tarot-egipcio", 6),
    tarotRepository.getDeck("tarot-egipcio"),
  ]);

  const heroCards = featured.slice(0, 5);
  const fallback = featured[0];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_70%_20%,rgba(201,162,39,0.12),transparent_65%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="container-page relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-2">
              <Sparkles size={13} aria-hidden="true" />
              Biblioteca interactiva de tarot
            </p>
            <h1 className="mt-5 font-display text-[2.55rem] leading-[1.08] text-papyrus text-shadow-deep sm:text-6xl lg:text-[4.1rem]">
              El tarot se aprende{" "}
              <span className="gold-text">carta a carta.</span>
            </h1>
            <p className="prose-mystic mt-6 max-w-xl text-base sm:text-lg">
              Una guía de estudio para mirar las cartas con calma: simbología, correspondencias,
              interpretaciones y un consejo para llevar a la vida cotidiana. Empieza por el Tarot
              Egipcio de Margarita Arnal y recorre sus 78 láminas.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/decks/tarot-egipcio" className="btn-primary">
                Explorar el Tarot Egipcio
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/decks" className="btn-ghost">
                <Layers size={16} aria-hidden="true" />
                Ver todos los mazos
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
              {[
                ["78", "cartas comentadas"],
                ["22", "arcanos mayores"],
                ["56", "escenas menores"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-2xl text-gold-soft sm:text-3xl">{value}</dd>
                  <dd className="mt-1 text-[0.66rem] uppercase leading-4 tracking-[0.14em] text-papyrus-dim">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative flex items-center justify-center px-4 py-6 sm:py-10">
              {heroCards.map((card, index) => (
                <Link
                  key={card.id}
                  href={`/decks/${card.deckId}/cards/${card.id}`}
                  className="relative w-[28%] max-w-[170px] shrink-0 overflow-hidden rounded-xl border border-gold/25 bg-ink-900 shadow-card transition duration-500 hover:z-30 hover:-translate-y-2 hover:border-gold/60 hover:shadow-gold"
                  style={{
                    marginLeft: index === 0 ? 0 : "-9%",
                    transform: `rotate(${(index - 2) * 6}deg)`,
                    zIndex: index === 2 ? 10 : index,
                  }}
                  aria-label={`Abrir ${card.name}`}
                >
                  <CardImage
                    src={card.image}
                    alt={card.name}
                    priority={index < 3}
                    sizes="(max-width: 640px) 36vw, 180px"
                  />
                </Link>
              ))}
            </div>
            <div className="relative mx-auto mt-3 flex max-w-[320px] items-center justify-between rounded-full border border-white/10 bg-ink-950/70 px-4 py-2 backdrop-blur">
              <span className="text-[0.6rem] uppercase tracking-[0.18em] text-papyrus-dim">
                Arcanos mayores
              </span>
              <span className="h-1 w-1 rounded-full bg-gold" />
              <span className="text-[0.6rem] uppercase tracking-[0.18em] text-papyrus-dim">
                78 láminas
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-8 sm:py-10">
        {fallback ? (
          <ContinueReading fallbackCard={fallback} fallbackDeckName={egyptianDeck?.name ?? "Tarot Egipcio"} />
        ) : null}
      </section>

      <section className="container-page py-12 sm:py-16">
        <SectionHeading
          eyebrow="Elige tu baraja"
          title="Una biblioteca que crece contigo"
          description="Cada mazo tiene su propia voz. La estructura está preparada para incorporar nuevas barajas sin rehacer la experiencia."
          action={
            <Link href="/decks" className="btn-quiet">
              Ver todos
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          }
        />
        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {decks.map((deck, index) => (
            <DeckCard key={deck.id} deck={deck} priority={index === 0} />
          ))}
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <SectionHeading
          eyebrow="Puertas de entrada"
          title="Cartas para empezar a leer"
          description="Una selección de arcanos mayores con temas muy distintos: la voluntad, el silencio, el ciclo y la claridad."
          action={
            <Link href="/decks/tarot-egipcio" className="btn-quiet">
              Ver las 78
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          }
        />
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-6">
          {featured.map((card, index) => (
            <CardTile
              key={card.id}
              card={card}
              deckName={egyptianDeck?.name ?? "Tarot Egipcio"}
              priority={index < 2}
            />
          ))}
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="Tres gestos antes de interpretar"
          description="La biblioteca no lanza tiradas automáticas ni promete certezas. Te da material para estudiar y pensar."
        />
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {readingSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="panel ornament-corner p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-gold">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <span className="font-display text-2xl text-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg text-papyrus">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-papyrus-muted">{step.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <div className="rounded-3xl border border-gold/20 bg-gold/[0.04] p-7 sm:p-10">
          <p className="eyebrow">Sobre el contenido</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl text-papyrus sm:text-3xl">
            Tradición y síntesis didáctica, siempre separadas
          </h2>
          <p className="prose-mystic mt-4 max-w-3xl">{siteConfig.contentNotice}</p>
          <p className="mt-4 max-w-3xl text-xs leading-6 text-papyrus-dim">
            Las imágenes de esta versión son ilustraciones provisionales originales. No reproducen
            láminas protegidas por derechos de autor. Cada archivo puede sustituirse por el arte
            final sin cambiar la estructura de datos ni las rutas.
          </p>
        </div>
      </section>
    </div>
  );
}
