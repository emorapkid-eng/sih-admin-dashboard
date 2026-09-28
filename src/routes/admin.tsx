import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  adminDeleteProduct,
  adminListOrders,
  adminListProducts,
  adminLogin,
  adminLogout,
  adminSaveProduct,
  adminSession,
  adminSetOrderStatus,
  adminUploadImage,
  type AdminOrder,
} from "@/lib/admin.functions";
import { CATEGORIES, formatPrice, type Product } from "@/lib/shop";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — SIH WEARS" },
      { name: "description", content: "Manage SIH WEARS products and orders." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin — SIH WEARS" },
      { property: "og:description", content: "Manage SIH WEARS products and orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminRoute,
});

const field =
  "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-foreground";
const emptyForm = {
  id: "",
  name: "",
  category: "shirts",
  price: 0,
  description: "",
  image: "",
  isNew: false,
  isFeatured: false,
};
type Form = typeof emptyForm;

function AdminRoute() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    void adminSession()
      .then((s) => setEmail(s?.email ?? null))
      .catch(() => setEmail(null))
      .finally(() => setReady(true));
  }, []);

  if (!ready) {
    return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Loading…</div>;
  }
  return email ? (
    <Dashboard email={email} onSignOut={() => setEmail(null)} />
  ) : (
    <Login onSignedIn={setEmail} />
  );
}

function Login({ onSignedIn }: { onSignedIn: (email: string) => void }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await adminLogin({ data: form });
      if (res.ok) onSignedIn(res.email);
      else setError(res.error);
    } catch {
      setError("Could not sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-muted/40 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-lg border bg-background p-6 shadow-sm">
        <h1 className="text-lg font-semibold">SIH WEARS Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to manage products and orders.</p>
        <label className="mt-5 block text-sm font-medium">
          Admin email
          <input
            type="email"
            autoComplete="username"
            className={field}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Password
          <input
            type="password"
            autoComplete="current-password"
            className={field}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
        </label>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <Button type="submit" className="mt-5 w-full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

function Dashboard({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [form, setForm] = useState<Form>(emptyForm);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const [p, o] = await Promise.all([adminListProducts(), adminListOrders()]);
      setProducts(p);
      setOrders(o);
    } catch {
      setStatus("Session expired. Please reload and sign in again.");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const edit = (p: Product) =>
    setForm({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description ?? "",
      image: p.image,
      isNew: !!p.isNew,
      isFeatured: !!p.isFeatured,
    });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      await adminSaveProduct({ data: { ...form, id: form.id || undefined } });
      setForm(emptyForm);
      setStatus("Saved. The storefront is updated.");
      await load();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not save this product.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (p: Product) => {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    try {
      await adminDeleteProduct({ data: { id: p.id } });
      if (form.id === p.id) setForm(emptyForm);
      setStatus("Product deleted.");
      await load();
    } catch {
      setStatus("Could not delete this product.");
    }
  };

  const upload = async (file: File) => {
    setBusy(true);
    setStatus("Uploading image…");
    try {
      const buffer = await file.arrayBuffer();
      let binary = "";
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.length; i += 0x8000)
        binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      const res = await adminUploadImage({
        data: {
          fileName: file.name,
          contentType: file.type || "image/jpeg",
          dataBase64: btoa(binary),
        },
      });
      setForm((f) => ({ ...f, image: res.url }));
      setStatus("Image uploaded. Remember to save the product.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const signOut = async () => {
    await adminLogout().catch(() => undefined);
    onSignOut();
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b bg-background px-4 py-3 sm:px-6">
        <div>
          <h1 className="text-base font-semibold">SIH WEARS Admin</h1>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="/">View store</a>
          </Button>
          <Button variant="outline" size="sm" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-5 flex gap-2">
          {(["products", "orders"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md border px-3 py-1.5 text-sm capitalize ${tab === t ? "bg-primary text-primary-foreground" : "bg-background"}`}
            >
              {t} {t === "orders" ? `(${orders.length})` : `(${products.length})`}
            </button>
          ))}
        </div>

        {status && (
          <p className="mb-4 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">{status}</p>
        )}

        {tab === "products" ? (
          <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <form onSubmit={save} className="h-fit rounded-lg border bg-background p-4">
              <h2 className="text-sm font-semibold">{form.id ? "Edit product" : "Add product"}</h2>

              <label className="mt-4 block text-sm font-medium">
                Name
                <input
                  className={field}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </label>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="block text-sm font-medium">
                  Price (PKR)
                  <input
                    type="number"
                    min={0}
                    className={field}
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                  />
                </label>
                <label className="block text-sm font-medium">
                  Category
                  <select
                    className={field}
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-4 block text-sm font-medium">
                Description
                <textarea
                  rows={4}
                  className={field}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </label>

              <div className="mt-4">
                <p className="text-sm font-medium">Image</p>
                {form.image && (
                  <img src={form.image} alt="" className="mt-2 h-28 w-24 rounded-md border object-cover" />
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full text-xs"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void upload(file);
                  }}
                />
                <input
                  className={field}
                  placeholder="or paste an image link"
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                />
              </div>

              <div className="mt-4 flex gap-5 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.isNew}
                    onChange={(e) => setForm((f) => ({ ...f, isNew: e.target.checked }))}
                  />
                  New
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
                  />
                  Featured
                </label>
              </div>

              <div className="mt-5 flex gap-2">
                <Button type="submit" disabled={busy} className="flex-1">
                  {form.id ? "Save changes" : "Add product"}
                </Button>
                {form.id && (
                  <Button type="button" variant="outline" onClick={() => setForm(emptyForm)}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>

            <div className="overflow-hidden rounded-lg border bg-background">
              {products.map((p) => (
                <div key={p.id} className="flex items-center gap-3 border-b p-3 last:border-b-0">
                  <img src={p.image} alt="" className="h-16 w-14 shrink-0 rounded-md border object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.category} · {formatPrice(p.price)}
                      {p.isNew ? " · NEW" : ""}
                      {p.isFeatured ? " · FEATURED" : ""}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => edit(p)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => void remove(p)}>
                    Delete
                  </Button>
                </div>
              ))}
              {products.length === 0 && (
                <p className="p-6 text-sm text-muted-foreground">No products yet.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="rounded-lg border bg-background p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">
                      {o.customerName} · {o.phone}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(o.createdAt).toLocaleString()} · {o.city} · {o.payment}
                    </p>
                  </div>
                  <select
                    className="rounded-md border bg-background px-2 py-1 text-xs"
                    value={o.status}
                    onChange={async (e) => {
                      const status = e.target.value;
                      await adminSetOrderStatus({ data: { id: o.id, status } }).catch(() => undefined);
                      setOrders((prev) => prev.map((x) => (x.id === o.id ? { ...x, status } : x)));
                    }}
                  >
                    {["new", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{o.address}</p>
                <ul className="mt-2 text-sm">
                  {o.items.map((it, i) => (
                    <li key={i} className="text-muted-foreground">
                      {it.name} × {it.qty} — {formatPrice(it.price * it.qty)}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm font-medium">Total: {formatPrice(o.total)}</p>
                {o.location && (
                  <a href={o.location} target="_blank" rel="noreferrer" className="text-xs underline">
                    Shared location
                  </a>
                )}
              </div>
            ))}
            {orders.length === 0 && (
              <p className="rounded-lg border bg-background p-6 text-sm text-muted-foreground">
                No orders yet. New checkouts will appear here.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
