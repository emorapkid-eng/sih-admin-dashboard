import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageIntro } from "./PageIntro";
import { ProductCard } from "./ProductCard";
import { type CategorySlug, CATEGORIES, type Product } from "@/lib/shop";
import { useProducts } from "@/lib/products-context";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function CategoryPage({ slug }: { slug: CategorySlug }) {
  const cat = CATEGORIES.find((c) => c.slug === slug)!;
  const products = useProducts().filter((p) => p.category === slug);
  return (
    <Shell>
      <PageIntro eyebrow="Collection" title={cat.name} copy={cat.tagline} />
      <section className="page-shell section-space">
        <p className="mb-6 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {products.length} products
        </p>
        <ProductGrid products={products} />
      </section>
    </Shell>
  );
}

export function categoryHead(slug: CategorySlug, desc: string) {
  const name = CATEGORIES.find((c) => c.slug === slug)!.name;
  const title = `${name[0]}${name.slice(1).toLowerCase()} — SIH WEARS`;
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}

export function meta(title: string, desc: string) {
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
