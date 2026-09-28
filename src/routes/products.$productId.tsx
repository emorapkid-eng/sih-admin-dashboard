import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus, RotateCcw, Truck } from "lucide-react";
import { useState } from "react";
import { ProductGrid, Shell, meta } from "@/components/site/Shell";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { PRODUCTS, categoryName, formatPrice } from "@/lib/shop";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) =>
    loaderData
      ? meta(`${loaderData.product.name} — SIH WEARS`, `${loaderData.product.name} by SIH WEARS. ${formatPrice(loaderData.product.price)}, cash on delivery and 3-day returns.`)
      : { meta: [{ title: "Product not found — SIH WEARS" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

const catPath = { shirts: "/shirts", pants: "/pants", gadgets: "/gadgets", sunglasses: "/sunglasses" } as const;

function ProductNotFound() {
  return (
    <Shell>
      <div className="page-shell py-24 text-center">
        <h1 className="text-3xl font-semibold uppercase">Product not found</h1>
        <Button asChild className="mt-6"><Link to="/shop">Back to Shop</Link></Button>
      </div>
    </Shell>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).concat(PRODUCTS.filter((p) => p.category !== product.category)).slice(0, 4);
  return (
    <Shell>
      <div className="page-shell pt-6 text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <Link to={catPath[product.category]}>{categoryName(product.category)}</Link>
      </div>
      <section className="page-shell grid gap-8 py-8 md:grid-cols-2 lg:gap-16 lg:py-12">
        <div className="overflow-hidden rounded-sm bg-soft">
          <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="md:py-6">
          {product.tag && <span className="bg-primary px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground">{product.tag}</span>}
          <p className="eyebrow mt-5">{categoryName(product.category)}</p>
          <h1 className="mt-2 text-3xl font-semibold uppercase leading-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-xl font-medium">{formatPrice(product.price)}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex h-12 items-center justify-between border sm:w-36">
              <Button variant="ghost" size="icon" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"><Minus size={14} /></Button>
              <span className="text-sm">{qty}</span>
              <Button variant="ghost" size="icon" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity"><Plus size={14} /></Button>
            </div>
            <Button size="lg" className="h-12 flex-1" onClick={() => add(product.id, qty)}>Add to Cart</Button>
          </div>
          <ul className="mt-8 space-y-3 border-t pt-6 text-sm text-muted-foreground">
            <li className="flex items-center gap-3"><Truck size={18} strokeWidth={1.4} /> Cash on Delivery or NayaPay</li>
            <li className="flex items-center gap-3"><RotateCcw size={18} strokeWidth={1.4} /> 3-day return policy on unworn items</li>
          </ul>
        </div>
      </section>
      <section className="page-shell section-space border-t">
        <h2 className="mb-8 text-2xl font-semibold uppercase">You may also like</h2>
        <ProductGrid products={related} />
      </section>
    </Shell>
  );
}
