import { contact, navigation, policies, site } from "@/data/site-content";

function contactLine(label: string, value: string) {
  if (!value) {
    return (
      <p>
        <span className="text-muted">{label}</span>
        <span className="mt-1 block text-ivory/80">Details coming soon</span>
      </p>
    );
  }

  const href = label === "Email" ? `mailto:${value}` : label === "Instagram" ? value : `tel:${value}`;
  return (
    <p>
      <span className="text-muted">{label}</span>
      <a href={href} className="nav-link mt-1 inline-flex">
        {label === "Instagram" ? "Instagram" : value}
      </a>
    </p>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/20 bg-ink text-ivory">
      <div className="relative z-10 mx-auto grid max-w-[1680px] gap-14 px-6 py-16 md:grid-cols-12 lg:px-12">
        <div className="md:col-span-5">
          <p className="font-serif text-4xl leading-none">
            The Trendy
            <span className="block italic text-champagne">Wreath House</span>
          </p>
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
          {contactLine("Email", contact.email)}
          {contactLine("Phone", contact.phone)}
          {contactLine("Instagram", contact.instagram)}
        </div>
      </div>
      <div className="relative z-10 mx-auto flex max-w-[1680px] flex-col gap-3 px-6 pb-10 text-xs tracking-[0.16em] text-muted uppercase sm:flex-row sm:items-center sm:justify-between lg:px-12">
        <p>© {site.year} {site.name}</p>
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
