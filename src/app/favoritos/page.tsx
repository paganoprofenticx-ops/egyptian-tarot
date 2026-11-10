import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { FavoritesView } from "@/components/favorites/FavoritesView";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Las cartas que has guardado en tu biblioteca personal.",
};

export default function FavoritesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Tu biblioteca"
        title="Favoritos"
        description="Las cartas que quieres volver a mirar. Se guardan en este dispositivo, sin cuentas ni servidores."
        aside={
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-papyrus-muted">
            <Heart size={15} className="text-gold" aria-hidden="true" />
            Guardado local
          </div>
        }
      />
      <section className="container-page py-8 sm:py-12">
        <FavoritesView />
      </section>
    </div>
  );
}
