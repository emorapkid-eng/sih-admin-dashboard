import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Headphones, RotateCcw, ShieldCheck, Truck, Instagram, Facebook, Mail, Music2, Quote, Star, Youtube, type LucideIcon } from "lucide-react";
import { useState } from "react";
import mannequin from "@/assets/sih-hero-mannequin.png";
import { Hero } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { CategoryCard } from "@/components/site/CategoryCard";
import { ProductGrid, meta } from "@/components/site/Shell";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/shop";
import { useProducts } from "@/lib/products-context";
import { Reveal } from "@/components/site/Reveal";

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

const REVIEWS = [
  ["Ahsan Raza", "Lahore", "The fabric feels premium and the fit is exactly as shown. Easily one of my best online clothing purchases."],
  ["Hamza Ali", "Karachi", "Clean finishing, quick delivery and genuinely good quality. The shirt still looks sharp after several washes."],
  ["Saad Ahmed", "Islamabad", "The order process was simple and the sizing guidance was accurate. SIH has become my go-to for everyday pieces."],
  ["Danish Khan", "Rawalpindi", "The details feel considered, from the packaging to the finishing. It looks even better in person."],
] as const;

const SOCIALS: readonly (readonly [LucideIcon, string, string])[] = [
  [Instagram, "Instagram", "https://www.instagram.com/sih.wears.official"],
  [Facebook, "Facebook", "https://www.facebook.com/SIHWearsofficial"],
  [Youtube, "YouTube", "https://www.youtube.com/@sihwears"],
  [Music2, "TikTok", "https://www.tiktok.com/@sih.wears.official"],
  [Mail, "Email", "mailto:sih.wears@gmail.com"],
];

const TICKER = ["SIH WEARS", "NEW DROP", "PREMIUM MENSWEAR", "EST. 2026", "WEAR YOUR STYLE", "3-DAY RETURNS"] as const;

function TickerGroup({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[0, 1, 2].map((r) =>
        TICKER.map((t, i) => (
          <span key={`${r}-${i}`} className="flex items-center whitespace-nowrap text-[0.68rem] font-bold uppercase tracking-[0.22em] sm:text-xs">
            {t}
            <span className="mx-7 text-contrast-foreground/40 sm:mx-10">/</span>
          </span>
        )),
      )}
    </div>
  );
}

function MarqueeBar() {
  return (
    <div className="overflow-hidden border-b-2 border-foreground bg-contrast py-3 text-contrast-foreground sm:py-3.5" aria-label="SIH WEARS announcement">
      <div className="marquee-track">
        <TickerGroup />
        <TickerGroup hidden />
      </div>
    </div>
  );
}

function Index() {
  const products = useProducts();
  const [sent, setSent] = useState(false);
  return (
    <>
      <Hero />
      <MarqueeBar />
      <main>
        <section className="page-shell section-space">
          <Reveal className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">New in</p>
              <h2 className="mt-2 text-3xl font-extrabold uppercase leading-none sm:text-4xl">Latest Arrivals</h2>
            </div>
            <Link to="/shop" className="inline-flex shrink-0 items-center gap-2 border-b-2 border-foreground pb-1 text-[0.68rem] font-bold uppercase">
              View all <ArrowRight size={14} />
            </Link>
          </Reveal>
          <ProductGrid products={products.slice(0, 8)} />
        </section>

        <section className="border-y-2 border-foreground bg-contrast text-contrast-foreground">
          <div className="page-shell section-space">
            <Reveal>
            <p className="eyebrow text-contrast-foreground/70">Categories</p>
            <h2 className="mb-8 mt-2 text-3xl font-extrabold uppercase leading-none sm:text-4xl">Find Your Style</h2>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {CATEGORIES.map((c) => <CategoryCard key={c.slug} category={c} />)}
            </div>
          </div>
        </section>

        <section className="page-shell section-space grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="border border-foreground bg-soft p-6 sm:p-10">
            <img src={mannequin} alt="SIH WEARS signature tee" loading="lazy" className="mx-auto max-h-[520px] w-full object-contain" />
          </Reveal>
          <Reveal delay={1}>
            <p className="eyebrow">About SIH WEARS</p>
            <h2 className="mt-3 text-3xl font-extrabold uppercase leading-[0.95] sm:text-5xl">Built for men who refuse to compromise</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
              SIH Wears is a menswear label built around a single idea: your wardrobe should work as hard as you do. Every piece is cut for modern proportions and finished to last past a single season.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild><Link to="/about">Our Story</Link></Button>
              <Button asChild variant="outline"><Link to="/chapters">Seven Chapters</Link></Button>
            </div>
          </Reveal>
        </section>

        <section className="border-y-2 border-foreground" aria-labelledby="brand-standards">
          <div className="page-shell border-b border-foreground py-5">
            <Reveal className="flex items-end justify-between gap-6">
              <div><p className="eyebrow">The SIH standard</p><h2 id="brand-standards" className="mt-2 text-2xl font-extrabold uppercase leading-none sm:text-3xl">Designed with intent</h2></div>
              <p className="hidden max-w-sm text-right text-xs leading-5 text-muted-foreground sm:block">Four principles behind every order.</p>
            </Reveal>
          </div>
          <div className="page-shell grid grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(([Icon, t, d], i) => (
              <Reveal key={t} delay={(i % 4) as 0 | 1 | 2 | 3} className={`h-full ${i % 2 ? "border-l pl-4" : "pr-4"} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-4" : ""}`}>
              <div className="group flex h-full flex-col items-start gap-3 py-8 sm:flex-row sm:items-center sm:px-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"><Icon size={21} strokeWidth={1.4} /></span>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold uppercase">{t}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{d}</p>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-b-2 border-foreground bg-contrast text-contrast-foreground" aria-labelledby="customer-reviews">
          <div className="page-shell section-space">
            <Reveal className="flex flex-col justify-between gap-5 border-b border-contrast-foreground/40 pb-7 sm:flex-row sm:items-end">
              <div><p className="eyebrow text-contrast-foreground/65">What they say</p><h2 id="customer-reviews" className="mt-2 text-3xl font-extrabold uppercase leading-none sm:text-5xl">Customer Reviews</h2></div>
              <div className="flex gap-1" aria-label="Five out of five stars">{Array.from({length:5}).map((_,i)=><Star key={i} size={15} fill="currentColor"/>)}</div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {REVIEWS.map(([name,city,review],index)=><Reveal key={name} delay={(index % 4) as 0 | 1 | 2 | 3} className={`flex h-full flex-col py-8 sm:px-6 sm:py-9 ${index ? "border-t border-contrast-foreground/30 sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}><div className="flex items-center justify-between"><Quote size={21} strokeWidth={1.3}/><div className="flex gap-0.5" aria-label="Five out of five stars">{Array.from({length:5}).map((_,i)=><Star key={i} size={11} fill="currentColor"/>)}</div></div><blockquote className="mt-6 flex-1 text-base font-semibold leading-7">“{review}”</blockquote><div className="mt-7 border-t border-contrast-foreground/30 pt-4"><p className="text-xs font-bold uppercase">{name}</p><p className="mt-1 text-xs text-contrast-foreground/60">{city}</p></div></Reveal>)}
            </div>
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
            {SOCIALS.map(([Icon,label,href])=><a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noreferrer"} aria-label={label} title={label} className="grid h-10 w-10 place-items-center border border-foreground transition-colors hover:bg-primary hover:text-primary-foreground"><Icon size={16} strokeWidth={1.5}/></a>)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
