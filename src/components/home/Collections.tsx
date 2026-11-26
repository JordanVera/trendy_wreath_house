"use client";

import Image from "next/image";
import { useRef } from "react";
import { collections } from "@/data/collections";
import { cn } from "@/lib/utils";

const widths = ["md:w-[68vw]", "md:w-[46vw]", "md:w-[62vw]", "md:w-[42vw]", "md:w-[56vw]"];

export function Collections() {
  const scroller = useRef<HTMLDivElement>(null);

  const move = (direction: number) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.72, behavior: "smooth" });
  };

  return (
    <section id="collections" className="bg-ink py-24 text-ivory md:py-32">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between lg:px-12">
        <div>
          <p className="eyebrow">02 — Collections</p>
          <h2 className="mt-5 max-w-xl font-serif text-[clamp(3rem,5.5vw,5.6rem)] leading-[0.92] tracking-[-0.03em]">
            Five ways
            <span className="block italic text-champagne">to dress a door.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Seasonal directions, shown as studio studies. Pricing and availability will follow the finished collection.
        </p>
      </div>
      <div className="mt-8 hidden justify-end gap-6 px-6 md:flex lg:px-12">
        <button type="button" className="nav-link min-h-11" onClick={() => move(-1)}>
          Previous
        </button>
        <button type="button" className="nav-link min-h-11" onClick={() => move(1)}>
          Next
        </button>
      </div>
      <div
        ref={scroller}
        tabIndex={0}
        aria-label="Seasonal collections"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") move(1);
          if (event.key === "ArrowLeft") move(-1);
        }}
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 focus-visible:outline-offset-8 md:gap-6 lg:px-12 max-md:flex-col max-md:overflow-visible"
      >
        {collections.map((item, index) => (
          <article key={item.id} className={cn("w-full shrink-0 snap-start", widths[index])}>
            <div className="image-mask relative h-[88vw] overflow-hidden bg-charcoal md:h-[68vh]">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="font-serif text-3xl md:text-4xl">{item.title}</h3>
              <p className="text-[0.68rem] tracking-[0.18em] text-gold uppercase">{item.season}</p>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
