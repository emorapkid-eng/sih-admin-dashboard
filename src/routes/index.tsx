import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Headphones, RotateCcw, ShieldCheck, Truck, Instagram, Facebook, Mail, Music2, Quote, Star, Youtube, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import reviewAhsan from "@/assets/review-ahsan.jpg";
import reviewHamza from "@/assets/review-hamza.jpg";
import reviewSaad from "@/assets/review-saad.jpg";
import reviewDanish from "@/assets/review-danish.jpg";
import storyImage from "@/assets/sih-story.png.asset.json";
import grittyBackdrop from "@/assets/gritty-backdrop.png.asset.json";
import { Hero } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { CategoryCard } from "@/components/site/CategoryCard";
import { ProductGrid, meta } from "@/components/site/Shell";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/shop";
import { useProducts } from "@/lib/products-context";
import { Reveal } from "@/components/site/Reveal";
import { SocialIcon, type SocialBrand } from "@/components/site/SocialIcon";

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
  ["Ahsan Raza", "Lahore", "The fabric feels premium and the fit is exactly as shown. Easily one of my best online clothing purchases.", reviewAhsan],
  ["Hamza Ali", "Karachi", "Clean finishing, quick delivery and genuinely good quality. The shirt still looks sharp after several washes.", reviewHamza],
  ["Saad Ahmed", "Islamabad", "The order process was simple and the sizing guidance was accurate. SIH has become my go-to for everyday pieces.", reviewSaad],
  ["Danish Khan", "Rawalpindi", "The details feel considered, from the packaging to the finishing. It looks even better in person.", reviewDanish],
] as const satisfies readonly (readonly [string, string, string, string])[];

const SOCIALS: readonly (readonly [LucideIcon, string, string, SocialBrand])[] = [
  [Instagram, "Instagram", "https://www.instagram.com/sih.wears.official", "instagram"],
  [Facebook, "Facebook", "https://www.facebook.com/SIHWearsofficial", "facebook"],
  [Youtube, "YouTube", "https://www.youtube.com/@sihwears", "youtube"],
  [Music2, "TikTok", "https://www.tiktok.com/@sih.wears.official", "tiktok"],
  [Mail, "Email", "mailto:sih.wears@gmail.com", "mail"],
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

function ReviewSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = REVIEWS.length;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [paused, count]);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);
  const [name, city, review, avatar] = REVIEWS[index];

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Customer review slideshow"
    >
      <div className="relative overflow-hidden border border-contrast-foreground/40">
        <div
          className="review-track flex"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite"
        >
          {REVIEWS.map(([rName, rCity, rReview, rAvatar], i) => (
            <div
              key={rName}
              className="w-full flex-none"
              aria-hidden={i !== index || undefined}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full shrink-0 overflow-hidden border-b border-contrast-foreground/40 sm:w-64 sm:border-b-0 sm:border-r lg:w-80">
                  <img
                    src={rAvatar}
                    alt={`${rName} from ${rCity}`}
                    loading="lazy"
                    className={`h-56 w-full object-cover object-top grayscale transition-opacity duration-500 sm:h-full sm:min-h-[22rem] ${i === index ? "opacity-100" : "opacity-0"}`}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-7 sm:p-10 lg:p-12">
                  <div>
                    <div className="flex items-center justify-between">
                      <Quote size={26} strokeWidth={1.2} className="text-contrast-foreground/80" />
                      <div className="flex gap-1" aria-label="Five out of five stars">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} size={13} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <blockquote className="mt-7 text-lg font-semibold leading-relaxed sm:text-2xl sm:leading-relaxed">
                      “{rReview}”
                    </blockquote>
                  </div>
                  <div className="mt-9 border-t border-contrast-foreground/40 pt-5">
                    <p className="text-sm font-bold uppercase tracking-wide">{rName}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-contrast-foreground/60">{rCity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-contrast-foreground/60">
          <span className="text-contrast-foreground">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-1.5">/</span>
          {String(count).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          {REVIEWS.map((r, i) => (
            <button
              key={r[0]}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show review ${i + 1} of ${count}`}
              aria-current={i === index || undefined}
              className={`h-0.5 w-7 transition-colors duration-300 ${i === index ? "bg-contrast-foreground" : "bg-contrast-foreground/30 hover:bg-contrast-foreground/60"}`}
            />
          ))}
          <div className="ml-3 flex">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center border border-contrast-foreground/50 transition-colors duration-200 hover:bg-contrast-foreground hover:text-contrast"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center border border-l-0 border-contrast-foreground/50 transition-colors duration-200 hover:bg-contrast-foreground hover:text-contrast"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">Review by {name} from {city}</p>
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
        <section className="border-b-2 border-foreground bg-background">
          <div className="border-b-2 border-foreground">
            <Reveal className="page-shell grid grid-cols-[4.5rem_minmax(0,1fr)] items-stretch sm:grid-cols-[7rem_minmax(0,1fr)_auto]">
              <div className="flex items-center justify-center border-x-2 border-foreground bg-primary px-2 py-7 text-center text-[0.65rem] font-bold uppercase text-primary-foreground sm:py-9 sm:text-xs">
                New in
              </div>
              <div className="flex min-w-0 items-center border-r-2 border-foreground px-4 py-7 sm:px-7 sm:py-9">
                <h2 className="text-2xl font-extrabold uppercase leading-none sm:text-4xl">Latest Arrivals</h2>
              </div>
              <Link to="/shop" className="col-span-2 flex min-h-12 items-center justify-between border-x-2 border-t-2 border-foreground px-4 text-[0.68rem] font-bold uppercase transition-colors hover:bg-primary hover:text-primary-foreground sm:col-span-1 sm:border-l-0 sm:border-t-0 sm:px-7">
                View all <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
          <div className="page-shell py-10 sm:py-14 lg:py-16">
            <ProductGrid products={products.slice(0, 8)} />
          </div>
        </section>

        <section className="relative border-y-2 border-foreground bg-contrast text-contrast-foreground">
          <img src={grittyBackdrop.url} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
          <div className="relative page-shell section-space">
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
          <Reveal className="border border-foreground bg-contrast p-0">
            <img src={storyImage.url} alt="The SIH WEARS story" loading="lazy" className="aspect-[3/2] w-full object-cover" />
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
              <div className="flex items-center gap-3">
                <div className="flex gap-1" aria-label="Five out of five stars">{Array.from({length:5}).map((_,i)=><Star key={i} size={15} fill="currentColor"/>)}</div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-contrast-foreground/60">5.0 Rated</span>
              </div>
            </Reveal>
            <ReviewSlider />
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
            {SOCIALS.map(([Icon, label, href, brand]) => <SocialIcon key={label} icon={Icon} label={label} href={href} brand={brand} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
