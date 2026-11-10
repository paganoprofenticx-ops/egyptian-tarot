import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  aside?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, aside }: PageHeaderProps) {
  return (
    <header className="border-b border-white/[0.07]">
      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-papyrus text-shadow-deep sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="prose-mystic mt-5 max-w-2xl text-base sm:text-lg">{description}</p>
            ) : null}
          </div>
          {aside ? <div className="lg:pb-1">{aside}</div> : null}
        </div>
      </div>
    </header>
  );
}
