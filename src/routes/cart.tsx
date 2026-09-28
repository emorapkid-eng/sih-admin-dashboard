import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { PageIntro } from "@/components/site/PageIntro";
import { Shell, meta } from "@/components/site/Shell";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { categoryName, formatPrice } from "@/lib/shop";

export const Route = createFileRoute("/cart")({
  head: () => meta("Your Cart — SIH WEARS", "Review the items in your SIH WEARS cart before checkout."),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQty, remove } = useCart();
  return (
    <Shell>
      <PageIntro eyebrow="Cart" title="Your Cart" />
      <section className="page-shell section-space">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Button asChild className="mt-6"><Link to="/shop">Shop Collection</Link></Button>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="border-t">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4 border-b py-5">
                  <Link to="/products/$productId" params={{ productId: product.id }} className="shrink-0">
                    <img src={product.image} alt={product.name} className="h-28 w-24 rounded-sm object-cover sm:h-32 sm:w-28" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">{categoryName(product.category)}</p>
                        <Link to="/products/$productId" params={{ productId: product.id }} className="mt-1 block truncate text-sm font-medium sm:text-base">{product.name}</Link>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => remove(product.id)} aria-label="Remove item"><X size={15} /></Button>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                      <div className="flex items-center border">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease quantity"><Minus size={13} /></Button>
                        <span className="w-7 text-center text-sm">{qty}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQty(product.id, qty + 1)} aria-label="Increase quantity"><Plus size={13} /></Button>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(product.price * qty)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="h-fit border bg-soft p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em]">Order Summary</h2>
              <div className="mt-5 flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <Button asChild size="lg" className="mt-6 w-full"><Link to="/checkout">Proceed to Checkout</Link></Button>
              <Button asChild variant="outline" className="mt-2 w-full"><Link to="/shop">Continue Shopping</Link></Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">3-day return policy</p>
            </aside>
          </div>
        )}
      </section>
    </Shell>
  );
}
