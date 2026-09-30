import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { z } from "zod";
import { PageIntro } from "@/components/site/PageIntro";
import { ProductGrid, Shell, meta } from "@/components/site/Shell";
import { CATEGORIES } from "@/lib/shop";
import { useProducts } from "@/lib/products-context";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";

const schema = z.object({ q: z.string().optional().catch(undefined), category: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/shop")({
  validateSearch: schema,
  head: () => meta("Shop All Products — SIH WEARS", "Browse every SIH WEARS shirt, pant, gadget and pair of sunglasses."),
  component: Shop,
});

function Shop() {
  const { q = "", category = "all" } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const term = q.toLowerCase();
  const allProducts = useProducts();
  const list = allProducts.filter((p) => (category === "all" || p.category === category) && (!term || p.name.toLowerCase().includes(term) || p.category.includes(term)));
  const set = (s: { q?: string | undefined; category?: string | undefined }) => navigate({ search: (prev) => ({ ...prev, ...s }), replace: true });
  return (
    <Shell>
      <PageIntro eyebrow="Shop" title="All Products" copy="Premium essentials for modern men." />
      <section className="page-shell section-space">
        <Reveal className="mb-10 flex flex-col gap-4 border-b-2 border-foreground pb-6 md:flex-row md:items-center md:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
            {[{ slug: "all", name: "ALL" }, ...CATEGORIES].map((c) => (
              <Button key={c.slug} variant={category === c.slug ? "default" : "outline"} size="sm" onClick={() => set({ category: c.slug === "all" ? undefined : c.slug })} className="shrink-0">
                {c.name}
              </Button>
            ))}
          </div>
          <label className="flex h-10 items-center gap-2 border px-3 md:w-72">
            <Search size={16} strokeWidth={1.5} className="text-muted-foreground" />
            <input value={q} onChange={(e) => set({ q: e.target.value || undefined })} placeholder="Search products" className="w-full bg-transparent text-sm outline-none" />
          </label>
        </Reveal>
        {list.length ? <ProductGrid products={list} /> : <p className="py-20 text-center text-sm text-muted-foreground">No products match your search.</p>}
      </section>
    </Shell>
  );
}
