import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/site/PageIntro";
import { Shell, meta } from "@/components/site/Shell";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { STORE, categoryName, formatPrice } from "@/lib/shop";

export const Route = createFileRoute("/checkout")({
  head: () => meta("Checkout — SIH WEARS", "Complete your SIH Wears order with cash on delivery or NayaPay. Confirmed over WhatsApp."),
  component: Checkout,
});

type Payment = "COD" | "NAYAPAY";
const inputCls = "mt-2 w-full border bg-background px-4 py-3 text-sm outline-none focus:border-foreground";

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
    const url = `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) { window.location.href = url; return; }
    clear();
  };

  const fields = [["name", "Full name", "text"], ["phone", "Phone number", "tel"], ["city", "City", "text"], ["address", "Complete address", "text"]] as const;

  return (
    <Shell>
      <PageIntro eyebrow="Checkout" title="Complete Your Order" />
      <section className="page-shell section-space grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="space-y-5">
          {fields.map(([k, label, type]) => (
            <div key={k}><label className="eyebrow" htmlFor={k}>{label}</label><input id={k} type={type} value={form[k]} onChange={set(k)} className={inputCls} /></div>
          ))}
          <div className="border p-5">
            <button type="button" onClick={shareLocation} className="inline-flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground transition hover:text-foreground">
              <MapPin size={16} strokeWidth={1.4} /> Share my location (optional)
            </button>
            {locStatus && <p className="mt-3 text-xs text-muted-foreground">{locStatus}</p>}
          </div>
          <div>
            <p className="eyebrow">Payment method</p>
            <div className="mt-3 grid gap-px border bg-border sm:grid-cols-2">
              {([["COD", "Cash on Delivery", "Pay when your order arrives."], ["NAYAPAY", "NayaPay", `Send to ${STORE.nayapayNumber}`]] as const).map(([key, title, desc]) => (
                <button type="button" key={key} onClick={() => setPayment(key)} className={`p-5 text-left transition ${payment === key ? "bg-primary text-primary-foreground" : "bg-background"}`}>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">{title}</span>
                  <span className={`mt-2 block text-xs ${payment === key ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <aside className="h-fit border bg-soft p-5 sm:p-6">
          <p className="eyebrow">Order summary</p>
          {items.length === 0 && (
            <p className="py-10 text-sm text-muted-foreground">Your cart is empty. <Link to="/shop" className="underline">Browse the collection</Link>.</p>
          )}
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-4 border-b py-4">
              <img src={product.image} alt={product.name} className="h-20 w-16 shrink-0 rounded-sm object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formatPrice(product.price)}</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center border bg-background">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease quantity"><Minus size={12} /></Button>
                    <span className="w-7 text-center text-sm">{qty}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setQty(product.id, qty + 1)} aria-label="Increase quantity"><Plus size={12} /></Button>
                  </div>
                  <button onClick={() => remove(product.id)} className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground">Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-5 flex justify-between text-sm"><span className="text-muted-foreground">Total</span><strong>{formatPrice(subtotal)}</strong></div>
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          <Button size="lg" className="mt-5 w-full" onClick={placeOrder}>Place Order on WhatsApp</Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Confirmed over WhatsApp · 3-day return policy</p>
        </aside>
      </section>
    </Shell>
  );
}
