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
  tag?: string;
};

export const PRODUCTS: Product[] = [
  { id: "sh-01", name: "Blue Motorsport Shirt", category: "shirts", price: 1600, image: blueMotorsportShirt.url, tag: "NEW" },
  { id: "sh-02", name: "Red Dreamer Shirt", category: "shirts", price: 1600, image: redAnimeShirt.url },
  { id: "sh-03", name: "Grey Mountain Shirt", category: "shirts", price: 1600, image: greyMountainShirt.url },
  { id: "sh-04", name: "White Essential Shirt", category: "shirts", price: 1600, image: whiteEssentialShirt.url },
  { id: "pt-01", name: "Relaxed Fleece Pants", category: "pants", price: 3900, image: pantsImg.url, tag: "BEST SELLER" },
  { id: "pt-02", name: "Tapered Utility Pants", category: "pants", price: 4700, image: pantsImg.url },
  { id: "gd-01", name: "Mono Wireless Buds", category: "gadgets", price: 6500, image: gadgetImg.url, tag: "NEW" },
  { id: "gd-02", name: "Matte Black Smartwatch", category: "gadgets", price: 8900, image: gadgetImg.url },
  { id: "sg-01", name: "Editorial Square Frames", category: "sunglasses", price: 3200, image: sunglassesImg.url, tag: "BEST SELLER" },
  { id: "sg-02", name: "Shadow Line Sunglasses", category: "sunglasses", price: 3800, image: sunglassesImg.url },
];

export const categoryName = (slug: CategorySlug) =>
  CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
