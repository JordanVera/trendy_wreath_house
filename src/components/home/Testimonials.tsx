import { testimonials, type Testimonial } from "@/data/site-content";

type TestimonialsProps = {
  reviews?: readonly Testimonial[];
};

export function Testimonials({ reviews = testimonials }: TestimonialsProps) {
  if (reviews.length === 0) return null;

  return (
    <section aria-labelledby="reviews-heading" className="bg-ivory text-ink">
      <div className="mx-auto max-w-[1100px] px-6 py-24 lg:px-12">
        <p className="eyebrow">Notes from clients</p>
        <h2 id="reviews-heading" className="mt-5 font-serif text-5xl leading-none">
          In their words.
        </h2>
        <ul className="mt-14 flex flex-col gap-14">
          {reviews.map((review) => (
            <li key={`${review.name}-${review.quote}`} className="border-t border-gold/40 pt-8">
              <blockquote className="font-serif text-3xl leading-snug md:text-4xl">{review.quote}</blockquote>
              <p className="mt-6 text-[0.72rem] tracking-[0.18em] text-ink/60 uppercase">
                {review.name} — {review.context}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
