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
/** Alternate (back) view for products whose image follows the -front naming. */
export const altImage = (src: string) => (src.includes("-front.") ? src.replace("model-hoodie-", "sih-hoodie-").replace("-front.", "-back.") : undefined);

/** On-model shot for hoodie cards when a matching model photo exists. */
export const cardImage = (src: string) => (/sih-hoodie-(burgundy|navy)-front\./.test(src) ? src.replace("sih-hoodie-", "model-hoodie-") : src);
