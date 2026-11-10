"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useTarotStore } from "@/lib/storage/tarot-store";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const pathname = usePathname();
  const { favorites, hydrated } = useTarotStore();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-ink-950/75 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm transition",
                isActive(item.href)
                  ? "text-gold-soft"
                  : "text-papyrus-muted hover:text-papyrus",
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
              {item.href === "/favoritos" && hydrated && favorites.length > 0 ? (
                <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold/15 px-1 text-[0.65rem] text-gold">
                  {favorites.length}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/buscar"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-papyrus-muted transition hover:border-gold/50 hover:text-gold-soft"
            aria-label="Buscar cartas"
          >
            <Search size={17} aria-hidden="true" />
          </Link>
          <Link
            href="/favoritos"
            className="relative hidden h-10 w-10 place-items-center rounded-full border border-white/10 text-papyrus-muted transition hover:border-gold/50 hover:text-gold-soft sm:grid"
            aria-label="Ver favoritos"
          >
            <Heart size={17} aria-hidden="true" />
            {hydrated && favorites.length > 0 ? (
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-ink-950" />
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}
