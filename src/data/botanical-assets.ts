export type BotanicalCategory =
  | "rose"
  | "hydrangea"
  | "bloom"
  | "greenery"
  | "gold"
  | "filler"
  | "base"
  | "ribbon";

export type BotanicalAsset = {
  id: string;
  category: BotanicalCategory;
  src: string;
  width: number;
  height: number;
  placeholder: boolean;
  alt: string;
};

export const botanicalAssets = [
  {
    "id": "rose-ivory-a",
    "category": "rose",
    "src": "/images/botanicals/rose-ivory-a.webp",
    "width": 276,
    "height": 170,
    "placeholder": true,
    "alt": "Temporary rose cutout from the studio reference sheet"
  },
  {
    "id": "rose-ivory-b",
    "category": "rose",
    "src": "/images/botanicals/rose-ivory-b.webp",
    "width": 276,
    "height": 163,
    "placeholder": true,
    "alt": "Temporary rose cutout from the studio reference sheet"
  },
  {
    "id": "rose-ivory-c",
    "category": "rose",
    "src": "/images/botanicals/rose-ivory-c.webp",
    "width": 273,
    "height": 167,
    "placeholder": true,
    "alt": "Temporary rose cutout from the studio reference sheet"
  },
  {
    "id": "hydrangea-a",
    "category": "hydrangea",
    "src": "/images/botanicals/hydrangea-a.webp",
    "width": 260,
    "height": 159,
    "placeholder": true,
    "alt": "Temporary hydrangea cutout from the studio reference sheet"
  },
  {
    "id": "hydrangea-b",
    "category": "hydrangea",
    "src": "/images/botanicals/hydrangea-b.webp",
    "width": 235,
    "height": 167,
    "placeholder": true,
    "alt": "Temporary hydrangea cutout from the studio reference sheet"
  },
  {
    "id": "bloom-champagne-a",
    "category": "bloom",
    "src": "/images/botanicals/bloom-champagne-a.webp",
    "width": 211,
    "height": 159,
    "placeholder": true,
    "alt": "Temporary bloom cutout from the studio reference sheet"
  },
  {
    "id": "bloom-champagne-b",
    "category": "bloom",
    "src": "/images/botanicals/bloom-champagne-b.webp",
    "width": 219,
    "height": 157,
    "placeholder": true,
    "alt": "Temporary bloom cutout from the studio reference sheet"
  },
  {
    "id": "eucalyptus-a",
    "category": "greenery",
    "src": "/images/botanicals/eucalyptus-a.webp",
    "width": 297,
    "height": 108,
    "placeholder": true,
    "alt": "Temporary greenery cutout from the studio reference sheet"
  },
  {
    "id": "eucalyptus-b",
    "category": "greenery",
    "src": "/images/botanicals/eucalyptus-b.webp",
    "width": 294,
    "height": 111,
    "placeholder": true,
    "alt": "Temporary greenery cutout from the studio reference sheet"
  },
  {
    "id": "eucalyptus-c",
    "category": "greenery",
    "src": "/images/botanicals/eucalyptus-c.webp",
    "width": 307,
    "height": 104,
    "placeholder": true,
    "alt": "Temporary greenery cutout from the studio reference sheet"
  },
  {
    "id": "gold-berries",
    "category": "gold",
    "src": "/images/botanicals/gold-berries.webp",
    "width": 254,
    "height": 119,
    "placeholder": true,
    "alt": "Temporary gold cutout from the studio reference sheet"
  },
  {
    "id": "gold-leaves",
    "category": "gold",
    "src": "/images/botanicals/gold-leaves.webp",
    "width": 222,
    "height": 124,
    "placeholder": true,
    "alt": "Temporary gold cutout from the studio reference sheet"
  },
  {
    "id": "filler-a",
    "category": "filler",
    "src": "/images/botanicals/filler-a.webp",
    "width": 227,
    "height": 140,
    "placeholder": true,
    "alt": "Temporary filler cutout from the studio reference sheet"
  },
  {
    "id": "filler-b",
    "category": "filler",
    "src": "/images/botanicals/filler-b.webp",
    "width": 222,
    "height": 135,
    "placeholder": true,
    "alt": "Temporary filler cutout from the studio reference sheet"
  },
  {
    "id": "wreath-base",
    "category": "base",
    "src": "/images/botanicals/wreath-base.webp",
    "width": 235,
    "height": 201,
    "placeholder": true,
    "alt": "Temporary base cutout from the studio reference sheet"
  },
  {
    "id": "ribbon",
    "category": "ribbon",
    "src": "/images/botanicals/ribbon.webp",
    "width": 599,
    "height": 155,
    "placeholder": true,
    "alt": "Temporary ribbon cutout from the studio reference sheet"
  }
] as const satisfies readonly BotanicalAsset[];

export type BotanicalId = (typeof botanicalAssets)[number]["id"];

export const botanicalAssetMap = Object.fromEntries(
  botanicalAssets.map((asset) => [asset.id, asset]),
) as { [K in BotanicalId]: Extract<(typeof botanicalAssets)[number], { id: K }> };
