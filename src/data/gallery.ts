export type GalleryItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  placeholder: true;
};

export const gallery: readonly GalleryItem[] = [
  {
    id: "portrait",
    src: "/images/gallery/portrait.jpg",
    width: 1200,
    height: 1600,
    alt: "Temporary studio study of a grapevine wreath with hydrangea, a rose, and ribbon",
    caption: "A full silhouette, still a studio study",
    placeholder: true,
  },
  {
    id: "wide",
    src: "/images/gallery/wide.jpg",
    width: 1800,
    height: 1100,
    alt: "Temporary wide studio study of eucalyptus, a rose, and a champagne bloom",
    caption: "An environmental study, awaiting the real doorway",
    placeholder: true,
  },
  {
    id: "detail-bloom",
    src: "/images/gallery/detail-bloom.jpg",
    width: 1200,
    height: 1200,
    alt: "Temporary close study of white hydrangea, an ivory rose, and filler flowers",
    caption: "Botanical detail",
    placeholder: true,
  },
  {
    id: "detail-door",
    src: "/images/gallery/detail-door.jpg",
    width: 1200,
    height: 1500,
    alt: "Temporary studio study of a wreath with gold leaves and berries",
    caption: "Threshold study, before the entrance photographs",
    placeholder: true,
  },
];
