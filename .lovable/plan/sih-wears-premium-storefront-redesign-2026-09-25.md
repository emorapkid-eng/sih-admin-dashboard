# SIH WEARS Premium Storefront Redesign

## Goal
Rebuild the uploaded SIH WEARS site as a premium, light, mobile-first fashion store while preserving its identity, products, imagery, hero video, pricing, contact details, cart state, and WhatsApp checkout.

## Visual direction
- Warm-white and soft light-gray surfaces with black typography, subtle gray borders, and black used mainly for calls to action and emphasis.
- Clean editorial fashion layout using the existing Archivo and Barlow typography, thin outline icons, restrained motion, and compact luxury details.
- Keep the original hero video and poster unchanged; only refine crop, positioning, light overlays, and text placement for mobile and desktop readability.
- Preserve the existing SIH WEARS logo, adapting its display treatment for the light header without changing the asset.
- Build mobile first: stable header controls, two-column mobile product grids, touch-friendly controls, no clipped text, and deliberate spacing at 390px width.

## Pages and navigation
Create working routes for:
- `/` — Home
- `/shop` — All products with search and category filters
- `/shirts`, `/pants`, `/gadgets`, `/sunglasses` — dedicated category pages
- `/products/$productId` — product details for every existing product
- `/about` — existing brand story and imagery
- `/contact` — existing contact details and message form
- `/cart` — full cart page
- `/checkout` — existing address, location, payment, and WhatsApp order flow

Keep the existing Seven Chapters content available at `/chapters` so no current content is lost. Replace category query-only navigation with the new dedicated category routes, and ensure every header, category card, product card, CTA, cart action, and footer link points to a real page.

## Shared storefront
- Add a clean sticky white header with logo, desktop navigation, expandable search, account/contact link, cart count, and mobile menu.
- Retain the cart provider and browser persistence so current cart behavior survives navigation and refreshes.
- Restyle the cart drawer in the light design and add a complete cart page with quantity and removal controls.
- Create consistent reusable product cards, category cards, page headings, buttons, form fields, service highlights, and empty states.
- Add a structured footer with shopping links, information links, contact details, social icons, payment labels/icons, and the existing 3-day return promise.

## Homepage
- Original full-width video hero with “WEAR YOUR STYLE” and a working Shop Collection action.
- Latest Arrivals grid using existing products and images, with two columns on mobile.
- Find Your Style image cards for Shirts, Pants, Gadgets, and Sunglasses.
- About SIH WEARS band using the existing mannequin/product visual and concise existing brand story.
- Icon-led highlights for Quality, Easy Returns, Fast Shipping, and Customer Support.
- Newsletter/social band with polished client-side submission feedback; no invented mailing backend.

## Product and checkout experience
- Product cards open their correct detail pages while retaining direct add-to-cart controls.
- Product detail pages use existing product names, categories, prices, images, and tags; provide quantity selection and add-to-cart.
- Shop and category pages remain searchable and clearly filterable.
- Checkout preserves PKR pricing, Cash on Delivery, NayaPay `03022281109`, optional location sharing, WhatsApp order handoff to `0302 2281109`, and the 3-day return policy.
- Contact preserves `sih.wears@gmail.com` and the existing WhatsApp details.

## Technical implementation
- Import the uploaded source and media safely into the current TanStack Start project, excluding generated files and repository metadata.
- Use the project’s existing Tailwind v4 token system and shadcn button primitives; all colors and visual roles live in the shared design system.
- Add unique metadata for every content route, including title, description, Open Graph title/description, Open Graph type, and Twitter card.
- Preserve reduced-motion behavior for the hero and animations.
- Verify route generation, cart interactions, checkout handoff construction, console/runtime logs, and responsive rendering at mobile and desktop sizes.
