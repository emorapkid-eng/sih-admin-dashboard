import { createFileRoute } from "@tanstack/react-router";
import poster from "@/assets/sih-campaign-hero-poster.jpg.asset.json";
import mannequin from "@/assets/sih-hero-mannequin.png.asset.json";
import blue from "@/assets/sih-blue-motorsport-shirt.jpeg.asset.json";
import red from "@/assets/sih-red-anime-shirt.jpeg.asset.json";
import grey from "@/assets/sih-grey-mountain-shirt.jpeg.asset.json";
import white from "@/assets/sih-white-essential-shirt.jpeg.asset.json";
import { PageIntro } from "@/components/site/PageIntro";
import { Shell, meta } from "@/components/site/Shell";

export const Route = createFileRoute("/chapters")({
  head: () => meta("The Seven Chapters — SIH WEARS", "The story, standards and promises behind every SIH Wears piece."),
  component: Chapters,
});

const C = [
  ["The Purpose", "SIH Wears exists for men who dress with intent. Every piece is chosen to feel considered — never loud, never disposable.", poster.url],
  ["The Style Identity", "Monochrome discipline with one sharp accent. Streetwear energy held inside an editorial frame, so the clothes read premium anywhere.", mannequin.url],
  ["The Quality", "Heavier cotton, clean stitching, prints that survive the wash. We would rather carry a small collection we trust than a large one we do not.", white.url],
  ["The Modern Fit", "Cut to sit straight on the shoulders with room through the body — a relaxed, current silhouette that still looks sharp tucked or loose.", grey.url],
  ["Real Product Imagery", "Every shirt you see is photographed as it ships. No borrowed stock photos, no retouched colours — what is on screen is what arrives.", blue.url],
  ["Ordering & Payment", "Pick your pieces, fill in four details and your order is confirmed over WhatsApp. Pay cash on delivery or by NayaPay — no accounts, no hidden fees.", red.url],
  ["The 3-Day Promise", "If a piece is not right, message us within three days of delivery and we will make it right. Buying from us should never feel like a risk.", poster.url],
];

function Chapters() {
  return (
    <Shell>
      <PageIntro eyebrow="SIH WEARS" title="The Seven Chapters" copy="The standards, the making and the promises behind every piece we send out." />
      {C.map(([t, b, img], i) => (
        <section key={t} className="border-b">
          <div className="page-shell section-space grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <img src={img} alt={t} loading="lazy" className={`h-80 w-full rounded-sm bg-soft object-cover md:h-[440px] ${i % 2 ? "lg:order-2" : ""}`} />
            <div className="max-w-xl">
              <p className="eyebrow">Chapter 0{i + 1}</p>
              <h2 className="mt-3 text-3xl font-semibold uppercase">{t}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{b}</p>
            </div>
          </div>
        </section>
      ))}
    </Shell>
  );
}
