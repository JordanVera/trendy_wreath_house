import { preload } from "react-dom";
import { botanicalAssets } from "@/data/botanical-assets";
import { hero } from "@/data/site-content";
import { AnimatedWreath } from "@/components/home/AnimatedWreath";

export function Hero() {
  for (const asset of botanicalAssets) {
    preload(asset.src, { as: "image" });
  }

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-ink text-ivory">
      <p className="pointer-events-none absolute top-1/2 left-5 z-10 hidden -translate-y-1/2 rotate-180 text-[0.68rem] tracking-[0.34em] text-muted uppercase [writing-mode:vertical-rl] xl:block">
        Seasonal atelier
      </p>
      <div className="mx-auto grid min-h-[100svh] max-w-[1680px] items-center gap-4 px-6 pt-28 pb-14 lg:grid-cols-12 lg:gap-0 lg:px-12">
        <div className="relative z-10 order-2 lg:order-1 lg:col-span-5">
          <p className="hero-rise eyebrow">{hero.eyebrow}</p>
          <h1 className="hero-rise display mt-6 text-ivory">
            {hero.title[0]}
            <span className="mt-1 block italic text-champagne">{hero.title[1]}</span>
          </h1>
          <p className="hero-rise mt-8 max-w-md text-base leading-relaxed text-muted md:text-lg">
            {hero.body}
          </p>
          <div className="hero-rise mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <a
              href={hero.primary.href}
              className="inline-flex min-h-11 items-center border border-gold/80 px-7 text-[0.72rem] tracking-[0.22em] text-ivory uppercase transition-colors duration-300 hover:bg-gold hover:text-ink"
            >
              {hero.primary.label}
            </a>
            <a href={hero.secondary.href} className="nav-link inline-flex min-h-11 items-center">
              {hero.secondary.label}
            </a>
          </div>
        </div>
        <div className="relative order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[10%] bg-[radial-gradient(circle,rgba(220,198,156,0.16),transparent_68%)]"
          />
          <div className="mx-auto w-[88%] lg:w-full">
            <AnimatedWreath />
          </div>
        </div>
      </div>
    </section>
  );
}
