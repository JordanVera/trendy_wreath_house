import { process } from "@/data/site-content";
import { cn } from "@/lib/utils";

const offsets = ["md:ml-0", "md:ml-[14%]", "md:ml-[5%]"];

export function HowItWorks() {
  return (
    <section id="process" className="bg-ivory text-ink">
      <div className="mx-auto max-w-[1480px] px-6 py-24 md:py-36 lg:px-12">
        <p className="eyebrow">04 — {process.eyebrow}</p>
        <h2 className="mt-6 max-w-lg font-serif text-[clamp(3rem,5.4vw,5.5rem)] leading-[0.92] tracking-[-0.03em]">
          {process.title}
        </h2>
        <ol className="mt-16 border-t border-gold/50">
          {process.steps.map((step, index) => (
            <li
              key={step.number}
              className={cn(
                "grid gap-4 border-b border-gold/40 py-8 md:grid-cols-12 md:py-12",
                offsets[index],
              )}
            >
              <span className="font-serif text-[clamp(4.2rem,8vw,7.5rem)] leading-none text-gold md:col-span-3">
                {step.number}
              </span>
              <div className="md:col-span-7 md:pt-6">
                <h3 className="font-serif text-4xl leading-none md:text-5xl">{step.title}</h3>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/70">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
