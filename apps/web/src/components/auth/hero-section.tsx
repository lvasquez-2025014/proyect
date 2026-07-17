export function HeroSection() {
  return (
    <div className="flex-1 hidden lg:flex flex-col justify-between px-8 md:px-16 lg:px-24 xl:px-32 py-24 relative overflow-hidden">
      <div className="flex items-center gap-5 opacity-0 animate-fade-in [animation-delay:0.4s]">
        <svg viewBox="0 0 100 100" className="w-8 h-8 fill-none stroke-accent stroke-[1.5]">
          <path d="M 20 80 L 20 30 L 50 60 L 80 30 L 80 80" strokeLinejoin="miter" />
          <path d="M 10 20 L 50 50 L 90 20" strokeWidth="0.75" />
        </svg>
        <span className="text-[0.85rem] tracking-[0.4em] uppercase font-medium text-text-primary">
          MaisonOS
        </span>
      </div>

      <div className="max-w-[500px] my-auto">
        <h1 className="font-serif text-[2rem] md:text-[3.1rem] font-normal leading-[1.2] tracking-[-0.01em] mb-8 text-text-primary opacity-0 animate-fade-in [animation-delay:0.6s]">
          Technology crafted with the same precision{' '}
          <span className="block italic text-accent">as the world&apos;s greatest maisons.</span>
        </h1>
        <p className="text-sm md:text-[0.95rem] leading-[1.85] text-text-secondary font-light tracking-[0.02em] opacity-0 animate-fade-in [animation-delay:0.8s]">
          We orchestrate ecosystems where timeless craftsmanship meets modern enterprise. Engineered for brands that define excellence.
        </p>
      </div>

      <div className="flex gap-16 opacity-0 animate-fade-in [animation-delay:1s]">
        <Stat label="Luxury Houses" value="150+" />
        <Stat label="Security" value="Enterprise Grade" />
        <Stat label="Availability" value="99.99%" />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.65rem] uppercase tracking-[0.25em] text-text-secondary">{label}</span>
      <span className="font-serif text-[1.35rem] text-accent">{value}</span>
    </div>
  );
}
