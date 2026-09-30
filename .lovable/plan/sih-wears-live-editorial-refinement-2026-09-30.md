# SIH WEARS Live Editorial Refinement

## Goal
Make the existing storefront feel more polished and alive without changing products, product imagery, routes, checkout, cart, or backend behavior.

## Changes
- Refine the Shop, About, Contact, and Seven Chapters pages with stronger editorial hierarchy, cleaner spacing, and consistent black-and-white section treatments while preserving their existing content and image order.
- Add restrained reveal-on-scroll motion across headings, product grids, story chapters, and the Quality / Easy Returns / Fast Shipping / Customer Support strip. Respect reduced-motion preferences.
- Add a homepage customer-review section using clearly presented positive sample reviews with varied Pakistani names.
- Replace generic social destinations with the supplied official Instagram, Facebook, YouTube, and TikTok links in the footer and homepage social area.
- Polish product-card actions, labels, dividers, and prices without changing product data or image framing.
- Keep mobile and desktop layouts stable, accessible, and fast.

## Technical details
- Use a lightweight shared intersection-observer reveal component and CSS transitions; no animation library or backend changes.
- Reuse current semantic black, white, and gray design tokens and existing UI controls.
- Keep images lazy-loaded and decoded asynchronously; preserve the hero video and all existing media files exactly.
- Validate the main page, shop, about, chapters, and contact pages at desktop and mobile sizes, then confirm all images and video load successfully.
