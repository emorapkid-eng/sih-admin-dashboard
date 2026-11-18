import shirtImg from "@/assets/cat-shirt-dark.jpg";
import pantsImg from "@/assets/p-pants.jpg";
import hoodieImg from "@/assets/cat-hoodie-dark.jpg";
import capImg from "@/assets/cat-cap-dark.jpg";

/* ---------------------------------------------------------------
 * STORE CONFIG — edit these values only
 * ------------------------------------------------------------- */
export const STORE = {
  // Store WhatsApp number in international format, digits only.
  // Pakistan 0302 2281109 -> 923022281109
  whatsappNumber: "923022281109",
  nayapayNumber: "03022281109",
  currency: "PKR",
  shippingFee: 300,
  codFee: 100,
};

export const formatPrice = (n: number) =>
  `${STORE.currency} ${n.toLocaleString("en-US")}`;

export type CategorySlug = "hoodies" | "shirts" | "pants" | "caps";

export const CATEGORIES: {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}[] = [
  { slug: "hoodies", name: "HOODIES", tagline: "Drop 01. Karachi Heritage.", image: hoodieImg },
  { slug: "shirts", name: "SHIRTS", tagline: "Classic fits. Modern looks.", image: shirtImg },
  { slug: "pants", name: "PANTS", tagline: "Comfort meets style.", image: pantsImg },
  { slug: "caps", name: "CAPS", tagline: "Coming soon.", image: capImg },
];

export type Product = {
  id: string;
  name: string;
  category: CategorySlug;
  price: number;
  image: string;
  description?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  tag?: string;
};

export const categoryName = (slug: CategorySlug) =>
  CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;

/** Placeholder "coming soon" items have no price and cannot be bought. */
export const isComingSoon = (p: Pick<Product, "price">) => p.price <= 0;
const BUNDLED = import.meta.glob("@/assets/products/*", { eager: true, import: "default" }) as Record<string, string>;
const BY_NAME: Record<string, string> = Object.fromEntries(Object.entries(BUNDLED).map(([k, v]) => [k.split("/").pop()!, v]));
const fileOf = (src: string) => src.split("/").pop()!.split("?")[0]!;
/** Serve product photos from bundled assets so they load on any host (e.g. Vercel). */
export const resolveImage = (src: string) => (src && src.startsWith("/product-images/") ? BY_NAME[fileOf(src)] ?? src : src);
const findBundled = (name: string) => BY_NAME[name];
/** Alternate (back) view for hoodies. */
export const altImage = (src: string) => {
  const m = /hoodie-(burgundy|navy)-front/.exec(src);
  return m ? findBundled(`sih-hoodie-${m[1]}-back.jpg`) : undefined;
};
/** On-model shot for hoodie cards. */
export const cardImage = (src: string) => {
  const m = /hoodie-(burgundy|navy)-front/.exec(src);
  return (m && findBundled(`model-hoodie-${m[1]}-front.jpg`)) || src;
};
