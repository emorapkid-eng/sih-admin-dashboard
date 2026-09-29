import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Headphones, RotateCcw, ShieldCheck, Truck, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import mannequin from "@/assets/sih-hero-mannequin.png";
import { Hero } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { CategoryCard } from "@/components/site/CategoryCard";
import { ProductGrid, meta } from "@/components/site/Shell";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/shop";
import { useProducts } from "@/lib/products-context";

export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "SIH WEARS — Wear Your Style | Premium Menswear",
      "Premium shirts, pants, gadgets and sunglasses for modern men. Cash on delivery, NayaPay and 3-day returns.",
    ),
  component: Index,
});

const SERVICES = [
  [ShieldCheck, "Quality", "Heavyweight, tested fabrics"],
  [RotateCcw, "Easy Returns", "3-day return policy"],
  [Truck, "Fast Shipping", "Delivered to your door"],
  [Headphones, "Customer Support", "WhatsApp 0302 2281109"],
] as const;

function Index() {
  const products = useProducts();
  const [sent, setSent] = useState(false);
  return (
    <>
      <Hero />
      <main>
        <section className="page-shell section-space">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">New in</p>
              <h2 className="mt-2 text-3xl font-extrabold uppercase leading-none sm:text-4xl">Latest Arrivals</h2>
            </div>
            <Link to="/shop" className="inline-flex shrink-0 items-center gap-2 border-b-2 border-foreground pb-1 text-[0.68rem] font-bold uppercase">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <ProductGrid products={products.slice(0, 8)} />
        </section>

        <section className="border-y-2 border-foreground bg-contrast text-contrast-foreground">
          <div className="page-shell section-space">
            <p className="eyebrow text-contrast-foreground/70">Categories</p>
            <h2 className="mb-8 mt-2 text-3xl font-extrabold uppercase leading-none sm:text-4xl">Find Your Style</h2>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {CATEGORIES.map((c) => <CategoryCard key={c.slug} category={c} />)}
            </div>
          </div>
        </section>

        <section className="page-shell section-space grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="border border-foreground bg-soft p-6 sm:p-10">
            <img src={mannequin} alt="SIH WEARS signature tee" loading="lazy" className="mx-auto max-h-[520px] w-full object-contain" />
          </div>
          <div>
            <p className="eyebrow">About SIH WEARS</p>
            <h2 className="mt-3 text-3xl font-extrabold uppercase leading-[0.95] sm:text-5xl">Built for men who refuse to compromise</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
              SIH Wears is a menswear label built around a single idea: your wardrobe should work as hard as you do. Every piece is cut for modern proportions and finished to last past a single season.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild><Link to="/about">Our Story</Link></Button>
              <Button asChild variant="outline"><Link to="/chapters">Seven Chapters</Link></Button>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-foreground">
          <div className="page-shell grid grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(([Icon, t, d], i) => (
              <div key={t} className={`flex flex-col items-start gap-3 py-8 sm:flex-row sm:items-center sm:px-4 ${i % 2 ? "pl-4 border-l" : "pr-4"} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-4" : ""}`}>
                <Icon size={24} strokeWidth={1.3} className="shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-xs font-bold uppercase">{t}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="page-shell section-space text-center">
          <p className="eyebrow">Stay in the loop</p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase leading-none sm:text-4xl">Join the SIH Community</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">Be first to hear about new drops and restocks.</p>
          {sent ? (
            <p className="mt-8 text-sm font-medium">Thank you — you're on the list.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
              <input required type="email" placeholder="Your email address" aria-label="Email address" className="h-11 min-w-0 flex-1 border border-foreground bg-background px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-foreground" />
              <Button type="submit" className="h-11">Subscribe</Button>
            </form>
          )}
          <div className="mt-8 flex justify-center gap-2">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center border border-foreground transition-colors hover:bg-primary hover:text-primary-foreground"><Instagram size={16} strokeWidth={1.5} /></a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center border border-foreground transition-colors hover:bg-primary hover:text-primary-foreground"><Facebook size={16} strokeWidth={1.5} /></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
