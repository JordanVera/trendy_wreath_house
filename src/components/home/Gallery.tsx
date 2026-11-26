"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { gallery } from "@/data/gallery";
import { cn } from "@/lib/utils";

const frames = [
  "col-span-12 min-h-[78vw] md:col-span-5 md:row-span-2 md:min-h-full",
  "col-span-12 min-h-[56vw] md:col-span-7 md:min-h-0",
  "col-span-6 min-h-[46vw] md:col-span-3 md:min-h-0",
  "col-span-6 min-h-[56vw] md:col-span-4 md:min-h-0",
  "col-span-12 min-h-[62vw] md:col-span-12 md:min-h-[42vw]",
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const item = active === null ? null : gallery[active];

  useEffect(() => {
    if (active === null) return;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("[data-close]")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        triggerRef.current?.focus();
      }
      if (event.key === "ArrowRight") {
        setActive((current) => (current === null ? current : (current + 1) % gallery.length));
      }
      if (event.key === "ArrowLeft") {
        setActive((current) =>
          current === null ? current : (current - 1 + gallery.length) % gallery.length,
        );
      }
      if (event.key !== "Tab" || !dialog) return;
      const items = [...dialog.querySelectorAll<HTMLElement>("button, a")];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  return (
    <section id="gallery" className="bg-ink py-24 text-ivory md:py-32">
      <div className="mx-auto max-w-[1680px] px-6 lg:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">05 — Gallery</p>
            <h2 className="mt-5 font-serif text-[clamp(3rem,5.5vw,5.6rem)] leading-[0.92] tracking-[-0.03em]">
              A lookbook
              <span className="block italic text-champagne">from the house.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted md:col-span-4 md:col-start-9">
            Recent pieces from the studio’s Instagram. Open a frame, then follow it back to the post.
          </p>
        </div>
        <div className="mt-14 grid auto-rows-[minmax(180px,26vw)] grid-cols-12 gap-3 md:gap-5">
          {gallery.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className={cn("image-mask group relative overflow-hidden bg-charcoal text-left", frames[index])}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActive(index);
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={index === 0 ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 768px) 50vw, 50vw"}
                className="object-cover"
                style={{ objectPosition: photo.objectPosition }}
              />
              <span className="sr-only">Open {photo.caption}</span>
            </button>
          ))}
        </div>
      </div>
      {item ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 md:p-10"
        >
          <div className="flex w-full max-w-5xl flex-col">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p id={titleId} className="text-[0.72rem] tracking-[0.2em] text-champagne uppercase">
                {item.caption}
              </p>
              <button
                type="button"
                data-close
                className="min-h-11 px-2 text-[0.72rem] tracking-[0.2em] uppercase"
                onClick={() => {
                  const trigger = triggerRef.current;
                  setActive(null);
                  trigger?.focus();
                }}
              >
                Close
              </button>
            </div>
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="max-h-[74svh] w-auto max-w-full self-center object-contain"
            />
            <div className="mt-4 flex flex-wrap items-center gap-6">
              <a href={item.href} className="nav-link min-h-11" target="_blank" rel="noreferrer">
                View on {item.source}
              </a>
              <button
                type="button"
                className="nav-link min-h-11"
                onClick={() =>
                  setActive((current) =>
                    current === null ? current : (current - 1 + gallery.length) % gallery.length,
                  )
                }
              >
                Previous
              </button>
              <button
                type="button"
                className="nav-link min-h-11"
                onClick={() =>
                  setActive((current) => (current === null ? current : (current + 1) % gallery.length))
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
