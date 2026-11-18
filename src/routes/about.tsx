import { createFileRoute, Link } from "@tanstack/react-router";
import mannequin from "@/assets/sih-hero-mannequin.png";
import { PageIntro } from "@/components/site/PageIntro";
import { Shell, meta } from "@/components/site/Shell";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => meta("About — SIH WEARS", "SIH Wears builds premium menswear essentials — modern fits, honest quality, no compromise."),
  component: About,
});

function About() {
  return (
    <Shell>
      <PageIntro eyebrow="About" title="Built for men who refuse to compromise" />
      <section className="page-shell section-space grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>SIH Wears is a monochrome menswear label built around a single idea: your wardrobe should work as hard as you do. Every piece is cut for modern proportions and finished to last past a single season.</p>
          <p>We keep the range tight and the standards high — heavyweight fabrics, considered graphics, and accessories that complete the look rather than compete with it.</p>
          <dl className="grid gap-px border bg-border sm:grid-cols-3">
            {[["Premium Quality", "Heavyweight, tested fabrics"], ["Modern Fits", "Cut for real proportions"], ["Lifestyle Essentials", "Wear it every day"]].map(([t, d]) => (
              <div key={t} className="bg-background p-5">
                <dt className="eyebrow">{t}</dt>
                <dd className="mt-2 text-xs">{d}</dd>
              </div>
            ))}
          </dl>
          <p className="eyebrow text-foreground">3-Day Return Policy</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild><Link to="/shop">Shop Collection</Link></Button>
          </div>
        </Reveal>
        <Reveal delay={1} className="border border-foreground bg-soft p-6 sm:p-10">
          <img src={mannequin} alt="SIH Wears signature tee" className="mx-auto max-h-[560px] w-full object-contain" loading="lazy" />
        </Reveal>
      </section>
    </Shell>
  );
}
