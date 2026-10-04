import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, Minus, Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Shell, meta } from "@/components/site/Shell";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { STORE, categoryName, formatPrice } from "@/lib/shop";
import { createOrder } from "@/lib/orders.functions";

export const Route = createFileRoute("/checkout")({
  head: () => meta("Checkout — SIH WEARS", "Complete your SIH Wears order with cash on delivery or NayaPay. Confirmed over WhatsApp."),
  component: Checkout,
});

type Payment = "COD" | "NAYAPAY";
const inputCls = "mt-2 h-12 w-full border border-foreground bg-background px-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-foreground focus:ring-offset-2";

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-4 border-b-2 border-foreground pb-4">
      <span className="grid h-8 w-8 shrink-0 place-items-center bg-primary text-xs font-extrabold text-primary-foreground">{number}</span>
      <h2 className="text-lg font-extrabold uppercase sm:text-xl">{title}</h2>
    </div>
  );
}

function Checkout() {
  const { items, subtotal, setQty, remove, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "" });
  const [payment, setPayment] = useState<Payment>("COD");
  const [location, setLocation] = useState("");
  const [locStatus, setLocStatus] = useState("");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const shareLocation = () => {
    if (!("geolocation" in navigator)) return setLocStatus("Location sharing is not supported by this browser.");
    setLocStatus("Getting your location…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(`https://maps.google.com/?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`);
        setLocStatus("Location attached to your order.");
      },
      () => setLocStatus("Could not get your location. You can still order."),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const placeOrder = () => {
    if (items.length === 0) return setError("Your cart is empty.");
    if (!form.name || !form.phone || !form.city || !form.address) return setError("Please fill in all the fields.");
    setError("");
    const lines = [
      "*NEW ORDER — SIH WEARS*", "",
      `*Name:* ${form.name}`, `*Phone:* ${form.phone}`, `*City:* ${form.city}`, `*Address:* ${form.address}`,
      location ? `*Location:* ${location}` : "", "", "*Items*",
      ...items.map(({ product, qty }) => `• ${product.name} (${categoryName(product.category)}) × ${qty} — ${formatPrice(product.price * qty)}`),
      "", `*Total:* ${formatPrice(subtotal)}`,
      `*Payment:* ${payment === "COD" ? "Cash on Delivery" : `NayaPay (${STORE.nayapayNumber})`}`,
    ].filter(Boolean);
    void createOrder({
      data: {
        name: form.name,
        phone: form.phone,
        city: form.city,
        address: form.address,
        location,
        payment,
        items: items.map(({ product, qty }) => ({ name: product.name, qty, price: product.price })),
        total: subtotal,
      },
    }).catch(() => undefined);
    const url = `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) { window.location.href = url; return; }
    clear();
  };

  const fields = [["name", "Full name", "text"], ["phone", "Phone number", "tel"], ["city", "City", "text"], ["address", "Complete address", "text"]] as const;

  return (
    <Shell>
      <header className="border-b-2 border-foreground bg-background">
        <div className="page-shell py-10 sm:py-14 lg:py-16">
          <div className="flex items-end justify-between gap-6">
            <div className="border-l-4 border-foreground pl-5 sm:pl-7">
              <p className="eyebrow text-foreground">SIH WEARS / CHECKOUT</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-extrabold uppercase leading-[0.88] sm:text-6xl lg:text-7xl">Complete Your Order</h1>
            </div>
            <p className="hidden max-w-xs border-t border-foreground pt-3 text-right text-xs font-semibold uppercase leading-5 text-muted-foreground md:block">
              Secure order confirmation through WhatsApp
            </p>
          </div>
        </div>
      </header>

      <section className="page-shell grid gap-8 py-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.78fr)] lg:items-start lg:gap-12 lg:py-16">
        <div className="space-y-10 sm:space-y-12">
          <section>
            <SectionHeading number="01" title="Delivery Details" />
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map(([k, label, type], index) => (
                <div key={k} className={index === 3 ? "sm:col-span-2" : undefined}>
                  <label className="eyebrow text-foreground" htmlFor={k}>{label}</label>
                  <input id={k} type={type} value={form[k]} onChange={set(k)} className={inputCls} />
                </div>
              ))}
            </div>
            <div className="mt-5 border border-foreground p-4 sm:flex sm:items-center sm:justify-between sm:gap-5">
              <div>
                <p className="text-xs font-bold uppercase">Pin your delivery location</p>
                <p className="mt-1 text-xs text-muted-foreground">Optional, but helpful for a smoother delivery.</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={shareLocation} className="mt-4 w-full sm:mt-0 sm:w-auto">
                <MapPin size={15} /> Share location
              </Button>
            </div>
            {locStatus && <p className="mt-3 text-xs font-medium text-muted-foreground" role="status">{locStatus}</p>}
          </section>

          <section>
            <SectionHeading number="02" title="Payment Method" />
            <div className="grid border border-foreground sm:grid-cols-2">
              {([["COD", "Cash on Delivery", "Pay when your order arrives."], ["NAYAPAY", "NayaPay", `Send to ${STORE.nayapayNumber}`]] as const).map(([key, title, desc], index) => {
                const selected = payment === key;
                return (
                  <Button
                    type="button"
                    key={key}
                    variant={selected ? "default" : "ghost"}
                    onClick={() => setPayment(key)}
                    className={`h-auto min-h-24 justify-start whitespace-normal p-5 text-left normal-case sm:p-6 ${index === 1 ? "border-t border-foreground sm:border-l sm:border-t-0" : ""}`}
                  >
                    <span className={`grid h-5 w-5 shrink-0 place-items-center border ${selected ? "border-primary-foreground" : "border-foreground"}`}>
                      {selected && <Check size={13} strokeWidth={3} />}
                    </span>
                    <span>
                      <span className="block text-xs font-extrabold uppercase">{title}</span>
                      <span className={`mt-2 block text-xs font-normal leading-5 ${selected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{desc}</span>
                    </span>
                  </Button>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="border-2 border-foreground bg-background lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b-2 border-foreground bg-primary px-5 py-4 text-primary-foreground sm:px-6">
            <h2 className="text-lg font-extrabold uppercase">Order Summary</h2>
            <span className="text-xs font-bold">{items.reduce((sum, item) => sum + item.qty, 0)} ITEMS</span>
          </div>
          <div className="px-5 sm:px-6">
            {items.length === 0 && (
              <p className="py-10 text-sm text-muted-foreground">Your cart is empty. <Link to="/shop" className="font-bold text-foreground underline underline-offset-4">Browse the collection</Link>.</p>
            )}
            {items.map(({ product, qty }) => (
              <div key={product.id} className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-4 border-b border-foreground py-5">
                <img src={product.image} alt={product.name} className="aspect-[4/5] w-full border border-foreground object-cover" />
                <div className="flex min-w-0 flex-col">
                  <p className="text-[0.65rem] font-bold uppercase text-muted-foreground">{categoryName(product.category)}</p>
                  <p className="mt-1 text-sm font-extrabold uppercase leading-tight">{product.name}</p>
                  <p className="mt-2 text-sm font-extrabold">{formatPrice(product.price)}</p>
                  <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                    <div className="flex h-8 items-center border border-foreground bg-background">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease quantity"><Minus size={12} /></Button>
                      <span className="w-7 text-center text-xs font-bold">{qty}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setQty(product.id, qty + 1)} aria-label="Increase quantity"><Plus size={12} /></Button>
                    </div>
                    <Button variant="link" size="sm" onClick={() => remove(product.id)} className="h-auto p-0 text-[0.62rem] text-muted-foreground">Remove</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 sm:p-6">
            <div className="space-y-3 border-b border-foreground pb-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><strong>Confirmed on WhatsApp</strong></div>
            </div>
            <div className="flex items-end justify-between py-5">
              <span className="text-xs font-extrabold uppercase">Total</span>
              <strong className="text-2xl font-extrabold">{formatPrice(subtotal)}</strong>
            </div>
            {error && <p className="mb-4 border border-destructive p-3 text-sm font-medium text-destructive" role="alert">{error}</p>}
            <Button size="lg" className="w-full justify-between px-5" onClick={placeOrder}>
              Place Order on WhatsApp <ArrowRight size={17} />
            </Button>
            <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
              <ShieldCheck size={15} /> Confirmed over WhatsApp · 3-day return policy
            </div>
          </div>
        </aside>
      </section>
    </Shell>
  );
}
