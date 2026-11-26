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
  image: "/images/social/ig-11-Dfk1yZ4Ti30.jpg",
  imageAlt: "Black velvet ribbon and crystal trim on a lit Christmas tree from The Trendy Wreath House",
} as const;

export const signature = {
  eyebrow: "The signature",
  title: ["Every season deserves", "something beautiful."],
  body: "A wreath can greet an arrival, hold a celebration, or simply mark the turn of the year. It stays at the threshold — quiet, material, and ready to change when the light does.",
  image: "/images/social/ig-06-Df3cGF0TDNW.jpg",
  imageAlt: "A flocked Christmas tree in chocolate, champagne, and warm light, installed in a living room",
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
  body: "The Trendy Wreath House is a boutique wreath studio in The Woodlands. The work favors natural texture, a considered palette, and arrangements that feel collected by hand. A fuller account of the house will be told here by the people who make it.",
  portrait: "/images/social/ig-03-Df8un9yzqxA.jpg",
  portraitAlt: "The Trendy Wreath House with a gold and ivory nutcracker swag",
  study: "/images/social/ig-03-Df8un9yzqxA.jpg",
  studyAlt: "The Trendy Wreath House with a gold and ivory nutcracker swag",
  portraitNote: "",
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
  email: "info@thetrendywreathhouse.com",
  phones: ["(346) 732-4215", "(346) 549-7804"],
  instagram: "https://www.instagram.com/thetrendywreathhouse",
  instagramHandle: "@thetrendywreathhouse",
  facebook: "https://www.facebook.com/trendywreathhouse",
} as const;

export const policies = [
  { label: "Privacy" },
  { label: "Terms" },
] as const;
