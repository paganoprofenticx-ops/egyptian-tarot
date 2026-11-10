import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { getDailyCard, formatDailyCardDate } from "@/lib/tarot/daily";
import { DailyCardView } from "@/components/daily/DailyCardView";
import { PageHeader } from "@/components/ui/PageHeader";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const daily = await getDailyCard();
  if (!daily) return { title: "La carta del día" };

  const { card, deck, dateKey } = daily;
  const title = `La carta del día: ${card.name}`;
  const description = `${card.centralConcept}. ${card.name}, de ${deck.name}, para el ${formatDailyCardDate(dateKey)}.`;

  return {
    title,
    description,
    alternates: { canonical: "/carta-del-dia" },
    openGraph: {
      type: "article",
      title: `${title} · ${deck.name}`,
      description: card.centralConcept,
      images: [{ url: card.image, width: 640, height: 1000, alt: card.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${deck.name}`,
      description: card.centralConcept,
      images: [card.image],
    },
  };
}

export default async function DailyCardPage() {
  const daily = await getDailyCard();
  if (!daily) notFound();

  return (
    <div>
      <PageHeader
        eyebrow="La carta del día"
        title="Una carta para mirar tu jornada"
        description="Cada día, un arcano mayor de la biblioteca. No adivina el futuro: te ofrece una imagen, un consejo y unas preguntas para leer lo que ya está pasando."
        aside={
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-papyrus-muted">
            <CalendarDays size={15} className="text-gold" aria-hidden="true" />
            {formatDailyCardDate(daily.dateKey)}
          </div>
        }
      />

      <section className="container-page py-10 sm:py-14">
        <DailyCardView daily={daily} />
      </section>
    </div>
  );
}
