import blueMotorsportShirt from "@/assets/sih-blue-motorsport-shirt.jpeg.asset.json";
import redAnimeShirt from "@/assets/sih-red-anime-shirt.jpeg.asset.json";
import greyMountainShirt from "@/assets/sih-grey-mountain-shirt.jpeg.asset.json";
import whiteEssentialShirt from "@/assets/sih-white-essential-shirt.jpeg.asset.json";
import pantsImg from "@/assets/p-pants.jpg.asset.json";
import gadgetImg from "@/assets/p-gadget.jpg.asset.json";
import sunglassesImg from "@/assets/p-sunglasses.jpg.asset.json";

/* ---------------------------------------------------------------
 * STORE CONFIG — edit these values only
 * ------------------------------------------------------------- */
export const STORE = {
  // Store WhatsApp number in international format, digits only.
  // Pakistan 0302 2281109 -> 923022281109
  whatsappNumber: "923022281109",
  nayapayNumber: "03022281109",
  currency: "PKR",
};

export const formatPrice = (n: number) =>
  `${STORE.currency} ${n.toLocaleString("en-US")}`;

export type CategorySlug = "shirts" | "pants" | "gadgets" | "sunglasses";

export const CATEGORIES: {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}[] = [
  { slug: "shirts", name: "SHIRTS", tagline: "Classic fits. Modern looks.", image: blueMotorsportShirt.url },
  { slug: "pants", name: "PANTS", tagline: "Comfort meets style.", image: pantsImg.url },
  { slug: "gadgets", name: "GADGETS", tagline: "Smart choices. Better living.", image: gadgetImg.url },
  { slug: "sunglasses", name: "SUNGLASSES", tagline: "See the difference.", image: sunglassesImg.url },
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
