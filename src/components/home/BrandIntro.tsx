import Image from "next/image";
import { brandIntro } from "@/data/site-content";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";

export function BrandIntro() {
  return (
    <section id="intro" className="bg-ivory text-ink">
      <div className="mx-auto grid max-w-[1680px] items-center gap-14 px-6 py-24 md:py-32 lg:grid-cols-12 lg:px-12 lg:py-40">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">01 — {brandIntro.eyebrow}</p>
          <h2 className="mt-6 font-serif text-[clamp(3.2rem,6.4vw,6.6rem)] leading-[0.92] tracking-[-0.03em]">
            {brandIntro.title[0]}
            <span className="mt-2 block italic">{brandIntro.title[1]}</span>
          </h2>
          <p className="mt-10 max-w-md text-base leading-relaxed text-ink/75 md:text-lg">{brandIntro.body}</p>
        </Reveal>
        <div className="relative lg:col-span-5">
          <ImageReveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe4d6]">
              <Image
                src={brandIntro.image}
                alt={brandIntro.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_35%]"
              />
            </div>
          </ImageReveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/botanicals/gold-leaves.webp"
            alt=""
            className="pointer-events-none absolute -bottom-8 -left-6 w-36 md:w-48"
          />
        </div>
      </div>
    </section>
  );
}
