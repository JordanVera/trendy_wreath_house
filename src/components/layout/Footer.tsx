import Image from 'next/image';
import { contact, navigation, policies, site } from '@/data/site-content';

function telHref(display: string) {
  const digits = display.replace(/\D/g, '');
  return digits.length === 10 ? `tel:+1${digits}` : `tel:${digits}`;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/20 bg-ink text-ivory">
      <div className="relative z-10 mx-auto grid max-w-[1680px] gap-14 px-6 py-16 md:grid-cols-12 lg:px-12">
        <div className="md:col-span-5">
          <Image
            src="/images/brand/logo.png"
            alt={site.name}
            width={120}
            height={120}
            className="h-20 w-20 object-contain"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
            A boutique wreath studio for the seasons of a home.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-3 md:col-span-3">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="nav-link w-fit">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-5 text-sm md:col-span-4">
          <p>
            <span className="text-muted">Email</span>
            <a href={`mailto:${contact.email}`} className="nav-link mt-1 inline-flex">
              {contact.email}
            </a>
          </p>
          <div>
            <span className="text-muted">Phone</span>
            <span className="mt-1 flex flex-col gap-1">
              {contact.phones.map((phone) => (
                <a key={phone} href={telHref(phone)} className="nav-link w-fit">
                  {phone}
                </a>
              ))}
            </span>
          </div>
          <p>
            <span className="text-muted">Instagram</span>
            <a href={contact.instagram} className="nav-link mt-1 inline-flex" target="_blank" rel="noreferrer">
              {contact.instagramHandle}
            </a>
          </p>
          <p>
            <span className="text-muted">Facebook</span>
            <a href={contact.facebook} className="nav-link mt-1 inline-flex" target="_blank" rel="noreferrer">
              The Trendy Wreath House
            </a>
          </p>
        </div>
      </div>
      <div className="relative z-10 mx-auto flex max-w-[1680px] flex-col gap-3 px-6 pb-10 text-xs tracking-[0.16em] text-muted uppercase sm:flex-row sm:items-center sm:justify-between lg:px-12">
        <p>
          © {site.year} {site.name}
        </p>
        <p className="flex gap-5">
          {policies.map((policy) => (
            <span key={policy.label}>{policy.label}</span>
          ))}
        </p>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none absolute right-0 -bottom-6 left-0 text-center font-serif text-[16vw] leading-none text-ivory/[0.045] select-none"
      >
        Wreath House
      </p>
    </footer>
  );
}
