export default function Loading() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20">
      <div className="relative h-16 w-16">
        <span className="absolute inset-0 rounded-full border border-gold/25" />
        <span className="absolute inset-0 animate-spin rounded-full border-t border-gold [animation-duration:1.6s]" />
        <span className="absolute inset-3 rounded-full border border-gold/20" />
        <span className="absolute inset-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
      </div>
      <p className="eyebrow mt-6">Preparando la mesa</p>
    </div>
  );
}
