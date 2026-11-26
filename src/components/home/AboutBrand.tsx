import Image from "next/image";
import { about } from "@/data/site-content";
import { ImageReveal } from "@/components/motion/ImageReveal";

export function AboutBrand() {
  const portrait = about.portrait;
  const src = portrait ?? about.study;
  const alt = portrait ? "The Trendy Wreath House" : about.studyAlt;

  return (
    <section id="about" className="bg-charcoal text-ivory">
      <div className="grid lg:grid-cols-12">
        <ImageReveal className="relative min-h-[70vw] lg:col-span-6 lg:min-h-[88svh]">
          <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          {portrait === null ? (
            <p className="absolute right-6 bottom-6 left-6 max-w-xs text-[0.68rem] leading-relaxed tracking-[0.16em] text-champagne uppercase">
              {about.portraitNote}
            </p>
          ) : null}
        </ImageReveal>
        <div className="flex flex-col justify-center px-6 py-20 lg:col-span-6 lg:px-16 lg:py-28">
          <p className="eyebrow">06 — {about.eyebrow}</p>
          <h2 className="mt-6 font-serif text-[clamp(3rem,5vw,5.4rem)] leading-[0.92] tracking-[-0.03em]">
            {about.title[0]}
            <span className="mt-2 block italic text-champagne">{about.title[1]}</span>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted md:text-lg">{about.body}</p>
        </div>
      </div>
    </section>
  );
}
