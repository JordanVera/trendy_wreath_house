export type Collection = {
  id: string;
  title: string;
  season: string;
  description: string;
  image: string;
  width: number;
  height: number;
  alt: string;
};

export const collections: readonly Collection[] = [
  {
    id: "autumn",
    title: "Autumn",
    season: "The table",
    description: "Jeweled pumpkins, a gold candlestick, and the last warm roses.",
    image: "/images/social/fb-fall.jpg",
    width: 1536,
    height: 860,
    alt: "Jeweled orange and navy pumpkins with a gold candlestick and a rose, from the studio’s Facebook",
  },
  {
    id: "swags",
    title: "Door Swags",
    season: "The threshold",
    description: "Plaid ribbon, velvet, and drums composed for a single door.",
    image: "/images/social/ig-07-Df2ikeyzHC9.jpg",
    width: 720,
    height: 1280,
    alt: "A holiday door swag with plaid drums, a gold violin, and red and green velvet ribbon",
  },
  {
    id: "holiday",
    title: "Holiday",
    season: "The dressed room",
    description: "Red velvet, gold reindeer, and a tree made for the turn of the stair.",
    image: "/images/social/ig-05-Df5IuKEzl1S.jpg",
    width: 640,
    height: 1136,
    alt: "A red and gold Christmas tree with jeweled ribbon and glittered reindeer beside a staircase",
  },
  {
    id: "garlands",
    title: "Garlands",
    season: "The span",
    description: "Black, ivory, and gold, built long enough to span an opening.",
    image: "/images/social/ig-01-DgGGrz-zVzV.jpg",
    width: 1328,
    height: 1760,
    alt: "A long black, ivory, and gold Christmas garland held open to show its span",
  },
  {
    id: "installations",
    title: "Installations",
    season: "The entrance",
    description: "A storefront dressed with garland, swags, and planters.",
    image: "/images/social/ig-10-Dfp039ETPKl.jpg",
    width: 1215,
    height: 2160,
    alt: "A commercial entrance dressed with red and gold garland, door swags, and planters",
  },
];
