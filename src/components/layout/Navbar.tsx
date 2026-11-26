'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { navigation, site } from '@/data/site-content';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousFocus = menuButtonRef.current;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const root = document.getElementById(menuId);
      if (!root) return;
      const items = [...root.querySelectorAll<HTMLElement>('a, button')];
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
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [menuId, open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-500 py-2.5',
        solid || open
          ? 'border-b border-gold/25 bg-ink'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-[1680px] items-center justify-between px-6 lg:px-12">
        <a href="#home" className="block shrink-0">
          <Image
            src="/images/brand/logo.png"
            alt={site.name}
            width={88}
            height={88}
            priority
            className="h-20 w-20 object-contain"
          />
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden min-h-11 items-center border border-gold/70 px-4 text-[0.68rem] tracking-[0.22em] text-ivory uppercase transition-colors duration-300 hover:bg-gold hover:text-ink sm:inline-flex"
          >
            Inquire
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-[0.72rem] tracking-[0.22em] text-ivory uppercase lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {open ? (
        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pt-8 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <Image
              src="/images/brand/logo.png"
              alt={site.name}
              width={96}
              height={96}
              className="h-12 w-12 object-contain"
            />
            <button
              ref={closeRef}
              type="button"
              className="min-h-11 px-2 text-[0.72rem] tracking-[0.22em] text-ivory uppercase"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-16 flex flex-col gap-5">
            {navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-serif text-[clamp(2.6rem,12vw,4.4rem)] leading-none text-ivory"
              >
                <span className="mr-4 font-sans text-xs tracking-[0.22em] text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-auto mb-12 inline-flex min-h-11 w-fit items-center border border-gold/70 px-6 text-[0.72rem] tracking-[0.22em] uppercase"
          >
            Inquire
          </a>
        </div>
      ) : null}
    </header>
  );
}
