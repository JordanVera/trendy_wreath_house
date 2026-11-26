export type Collection = {
  id: string;
  title: string;
  season: string;
  description: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  placeholder: true;
};

export const collections: readonly Collection[] = [
  {
    id: "spring",
    title: "Spring & Summer",
    season: "Light months",
    description: "Pale blooms and soft greens for long, bright days.",
    image: "/images/collections/spring.jpg",
    width: 1600,
    height: 1100,
    alt: "Temporary studio study of hydrangea, a garden rose, and eucalyptus",
    placeholder: true,
  },
  {
    id: "autumn",
    title: "Autumn",
    season: "Deeper quiet",
    description: "Gilded leaves, seeded stems, and a warmer hush at the door.",
    image: "/images/collections/autumn.jpg",
    width: 1600,
    height: 1100,
    alt: "Temporary studio study of antique-gold leaves, berries, and a champagne bloom",
    placeholder: true,
  },
  {
    id: "holiday",
    title: "Holiday",
    season: "The dressed door",
    description: "Ivory, champagne, and a ribbon finished for the height of the year.",
    image: "/images/collections/holiday.jpg",
    width: 1600,
    height: 1100,
    alt: "Temporary studio study of ivory roses, a champagne bloom, and silk ribbon",
    placeholder: true,
  },
  {
    id: "everyday",
    title: "Everyday Elegance",
    season: "After the occasion",
    description: "A wreath with the calm to stay long after the gathering has gone.",
    image: "/images/collections/everyday.jpg",
    width: 1600,
    height: 1100,
    alt: "Temporary studio study of eucalyptus gathered around a single ivory rose",
    placeholder: true,
  },
  {
    id: "custom",
    title: "Custom Designs",
    season: "Made around a home",
    description: "A composition shaped for a particular door, palette, and moment.",
    image: "/images/collections/custom.jpg",
    width: 1600,
    height: 1100,
    alt: "Temporary studio study of mixed ivory, champagne, and gold botanicals",
    placeholder: true,
  },
];
