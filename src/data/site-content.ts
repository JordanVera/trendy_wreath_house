export const site = {
  name: "The Trendy Wreath House",
  description:
    "Thoughtfully designed wreaths for every season, every celebration, and every beautiful home.",
  /** Provisional canonical URL. Replace when the live domain is confirmed. */
  url: "https://thetrendywreathhouse.com",
  year: 2026,
} as const;

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Gallery", href: "#gallery" },
  { label: "How It Works", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "The Trendy Wreath House",
  title: ["Beauty begins", "at your doorstep."],
  body: "Thoughtfully designed wreaths for every season, every celebration, and every beautiful home.",
  primary: { label: "Explore the Collection", href: "#collections" },
  secondary: { label: "Discover Our Story", href: "#about" },
} as const;

export const brandIntro = {
  eyebrow: "The house",
  title: ["More than a wreath.", "A beautiful first impression."],
  body: "The Trendy Wreath House composes wreaths as the first gesture of a home. Each one is built from layered botanicals, a considered palette, and the kind of attention usually reserved for a room. The work is seasonal, tactile, and meant to feel gathered rather than produced.",
  image: "/images/brand/intro.jpg",
  imageAlt: "Temporary studio study of an ivory rose, eucalyptus, and filler flowers",
  placeholder: true,
} as const;

export const signature = {
  eyebrow: "The signature",
  title: ["Every season deserves", "something beautiful."],
  body: "A wreath can greet an arrival, hold a celebration, or simply mark the turn of the year. It stays at the threshold — quiet, material, and ready to change when the light does.",
  image: "/images/brand/signature.jpg",
  imageAlt: "Temporary studio study of a grapevine wreath dressed with ivory blooms, eucalyptus, and a champagne ribbon",
  placeholder: true,
} as const;

export const process = {
  eyebrow: "How it works",
  title: "Three quiet steps.",
  steps: [
    {
      number: "01",
      title: "Find Your Inspiration",
      body: "Begin with a season, a doorway, or the feeling you want the house to hold.",
    },
    {
      number: "02",
      title: "Choose Your Style",
      body: "Look through silhouettes and palettes, and set aside the direction that feels like yours.",
    },
    {
      number: "03",
      title: "Make It Yours",
      body: "Share the details that matter. The composition is then shaped around your home and the occasion.",
    },
  ],
} as const;

export const about = {
  eyebrow: "About the house",
  title: ["Designed with intention.", "Made to welcome."],
  body: "The Trendy Wreath House is a boutique wreath studio. The work favors natural texture, restrained color, and arrangements that feel collected by hand. A fuller account of the house will be told here by the people who make it.",
  portrait: null as string | null,
  study: "/images/brand/about.jpg",
  studyAlt: "Temporary studio study standing in for a portrait of the atelier",
  portraitNote: "A portrait of the studio is waiting on the house. This study stands in for now.",
  placeholder: true,
} as const;

export type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

/** Genuine client reviews only. An empty list hides the section. */
export const testimonials: readonly Testimonial[] = [];

export const inquiry = {
  eyebrow: "An inquiry",
  title: ["Let something beautiful", "welcome you home."],
  body: "Tell us about the door, the season, and the occasion. The form below is ready for your words. It does not send them anywhere yet.",
  note: "This preview keeps your note on this page only. Sending is not connected yet, so nothing has been delivered.",
} as const;

export const contact = {
  email: "",
  phone: "",
  instagram: "",
} as const;

export const policies = [
  { label: "Privacy" },
  { label: "Terms" },
] as const;
