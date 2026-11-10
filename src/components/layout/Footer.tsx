import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Explorar",
    links: [
      { href: "/carta-del-dia", label: "La carta del día" },
      { href: "/decks", label: "Todos los mazos" },
      { href: "/decks/tarot-egipcio", label: "Tarot Egipcio" },
      { href: "/decks/marseille", label: "Tarot de Marsella" },
      { href: "/buscar", label: "Buscar cartas" },
    ],
  },
  {
    title: "Tu biblioteca",
    links: [
      { href: "/favoritos", label: "Favoritos" },
      { href: "/historial", label: "Historial" },
      { href: "/decks/tarot-egipcio?categoria=major", label: "Arcanos mayores" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/[0.07] pb-24 md:mt-24 md:pb-8">
      <div className="container-page py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-md">
            <Logo />
            <p className="mt-5 text-sm leading-7 text-papyrus-muted">
              Una biblioteca para estudiar el tarot sin prisa: una carta, un símbolo y una
              pregunta a la vez.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="eyebrow-muted mb-4">{column.title}</h2>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-papyrus-muted transition hover:text-gold-soft">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-xs leading-6 text-papyrus-dim">
            <span className="font-medium text-papyrus-muted">Sobre el contenido. </span>
            {siteConfig.contentNotice}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-papyrus-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Hecho para el estudio personal.
          </p>
          <p className="font-display uppercase tracking-[0.22em]">
            Las imágenes son ilustraciones provisionales originales
          </p>
        </div>
      </div>
    </footer>
  );
}
