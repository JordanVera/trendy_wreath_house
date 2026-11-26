import { signature } from "@/data/site-content";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export function SignatureExperience() {
  return (
    <section className="bg-charcoal text-ivory">
      <div className="grid lg:min-h-[92svh] lg:grid-cols-12">
        <div className="flex flex-col justify-end px-6 py-20 lg:col-span-5 lg:px-12 lg:py-24">
          <p className="eyebrow">03 — {signature.eyebrow}</p>
          <h2 className="display mt-6 text-[clamp(3.1rem,5.6vw,6rem)] text-ivory">
            <TextGenerateEffect lines={signature.title} />
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted md:text-lg">{signature.body}</p>
          {signature.placeholder ? (
            <p className="mt-8 text-[0.68rem] tracking-[0.18em] text-champagne/80 uppercase">
              Temporary studio study
            </p>
          ) : null}
        </div>
        <div className="lg:col-span-7">
          <ParallaxImage
            src={signature.image}
            alt={signature.imageAlt}
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>
      </div>
    </section>
  );
}
