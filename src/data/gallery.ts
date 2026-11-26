export type GalleryItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  href: string;
  source: "Instagram" | "Facebook";
  objectPosition?: string;
};

export const gallery: readonly GalleryItem[] = [
  {
    id: "double-swags",
    src: "/images/social/ig-02-DgDmE67TDdZ.jpg",
    width: 720,
    height: 1280,
    alt: "A pair of black, ivory, and gold double-door swags with magnolias and mirrored ornaments",
    caption: "Double-door swags",
    href: "https://www.instagram.com/reel/DgDmE67TDdZ/",
    source: "Instagram",
  },
  {
    id: "stair-tree",
    src: "/images/social/ig-04-tree.jpg",
    width: 1290,
    height: 1698,
    alt: "A traditional Christmas tree in red, emerald, and gold beneath a staircase",
    caption: "A traditional tree",
    href: "https://www.instagram.com/reel/Df6CW4ZTM2q/",
    source: "Instagram",
    objectPosition: "center 40%",
  },
  {
    id: "plaid-pair",
    src: "/images/social/ig-08-Dfz11syzyZT.jpg",
    width: 640,
    height: 1136,
    alt: "A matching pair of red and green plaid swags with drums and gold violins",
    caption: "A matching pair",
    href: "https://www.instagram.com/reel/Dfz11syzyZT/",
    source: "Instagram",
  },
  {
    id: "studio",
    src: "/images/social/ig-09-DfxpASkTtvX.jpg",
    width: 640,
    height: 1136,
    alt: "A jeweled plaid drum held in the studio, with a dressed tree behind",
    caption: "In the studio",
    href: "https://www.instagram.com/reel/DfxpASkTtvX/",
    source: "Instagram",
    objectPosition: "center top",
  },
  {
    id: "storefront",
    src: "/images/social/ig-10-Dfp039ETPKl.jpg",
    width: 1215,
    height: 2160,
    alt: "A commercial entrance dressed with red and gold garland, door swags, and planters",
    caption: "A commercial entrance",
    href: "https://www.instagram.com/reel/Dfp039ETPKl/",
    source: "Instagram",
    objectPosition: "center 42%",
  },
];
