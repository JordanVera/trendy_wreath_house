# The Trendy Wreath House

Homepage for The Trendy Wreath House, a boutique wreath studio. This phase is the homepage only.

```bash
npm install
npm run dev
```

The canonical URL in `src/app/layout.tsx` is provisional. Replace `https://thetrendywreathhouse.com` when the live domain is confirmed.

Contact fields in `src/data/site-content.ts` are empty on purpose. Add `email`, `phone`, or `instagram` and the footer will link them. Policy names in the footer are labels, not links, until those pages exist.

Testimonials render only when `testimonials` in `src/data/site-content.ts` contains real reviews. An empty list hides the section.

The inquiry form validates in the browser and then explains that sending is not connected. It does not report a successful delivery.

## Replacing botanical assets

The wreath is built from transparent cutouts in `public/images/botanicals`. They were split from the supplied reference sheet and still carry `placeholder: true` in `src/data/botanical-assets.ts`. They are temporary until cleaner studio cutouts replace them.

To swap a piece:

1. Export a transparent WebP with the same filename, for example `public/images/botanicals/rose-ivory-a.webp`.
2. Keep the `id` in `src/data/botanical-assets.ts`.
3. Update `width` and `height` if the aspect ratio changed.
4. Set `placeholder` to `false` when the file is a finished asset.
5. If the new artwork should sit differently, adjust that layer in `src/data/wreath-composition.ts`. Positions are on a 1000 by 1000 stage.

`npm run extract:botanicals` rebuilds the cutouts and the temporary stills from the original sheet. Pass a different sheet path as the first argument if needed.

Gallery, collection, and brand images in `public/images` are composed from those same cutouts. Replace the paths in `src/data/collections.ts`, `src/data/gallery.ts`, and `src/data/site-content.ts` when real photography arrives. Set `about.portrait` to an image path to replace the studio study and its waiting note.
