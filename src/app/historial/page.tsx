import type { Metadata } from "next";
import { Clock3 } from "lucide-react";
import { HistoryView } from "@/components/history/HistoryView";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Historial",
  description: "Las cartas que has visitado recientemente en la biblioteca.",
};

export default function HistoryPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Tu recorrido"
        title="Historial de lectura"
        description="Cada carta abierta deja un rastro. Vuelve a ella, retoma una idea o comprueba qué has estudiado esta semana."
        aside={
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-papyrus-muted">
            <Clock3 size={15} className="text-gold" aria-hidden="true" />
            Últimas 60 cartas
          </div>
        }
      />
      <section className="container-page py-8 sm:py-12">
        <HistoryView />
      </section>
    </div>
  );
}
