import { createServerFn } from "@tanstack/react-start";
import type { Product } from "./shop";
import { toProduct } from "./products.functions";

export type AdminProductInput = {
  id?: string | undefined;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  isNew: boolean;
  isFeatured: boolean;
};

export type AdminOrder = {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  location: string | null;
  payment: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: string;
  createdAt: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "product";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { checkCredentials, issueSession } = await import("./admin-session.server");
    if (!checkCredentials(data.email ?? "", data.password ?? "")) {
      return { ok: false as const, error: "Incorrect email or password." };
    }
    issueSession(data.email);
    return { ok: true as const, email: data.email.trim().toLowerCase() };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { clearSession } = await import("./admin-session.server");
  clearSession();
  return { ok: true as const };
});

export const adminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { readSession } = await import("./admin-session.server");
  return readSession();
});

export const adminListProducts = createServerFn({ method: "GET" }).handler(async (): Promise<Product[]> => {
  const { requireAdmin } = await import("./admin-session.server");
  requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map(toProduct);
});

export const adminSaveProduct = createServerFn({ method: "POST" })
  .inputValidator((data: AdminProductInput) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-session.server");
    requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (!data.name?.trim()) throw new Error("Product name is required.");
    const row = {
      name: data.name.trim(),
      category: data.category,
      price: Math.max(0, Math.round(Number(data.price) || 0)),
      description: data.description ?? "",
      image: data.image ?? "",
      is_new: !!data.isNew,
      is_featured: !!data.isFeatured,
    };

    if (data.id) {
      const { error } = await supabaseAdmin.from("products").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true as const, id: data.id };
    }

    const id = `${slugify(data.name)}-${Math.random().toString(36).slice(2, 7)}`;
    const { data: last } = await supabaseAdmin
      .from("products")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const { error } = await supabaseAdmin
      .from("products")
      .insert({ ...row, id, sort_order: (last?.sort_order ?? 0) + 1 });
    if (error) throw new Error(error.message);
    return { ok: true as const, id };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-session.server");
    requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const adminUploadImage = createServerFn({ method: "POST" })
  .inputValidator((data: { fileName: string; contentType: string; dataBase64: string }) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-session.server");
    requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const bytes = Buffer.from(data.dataBase64, "base64");
    if (bytes.byteLength > 10 * 1024 * 1024) throw new Error("Image must be smaller than 10 MB.");
    if (!data.contentType.startsWith("image/")) throw new Error("Only image files are allowed.");

    const ext = (data.fileName.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext || "jpg"}`;
    const { error } = await supabaseAdmin.storage
      .from("product-images")
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(error.message);
    return { ok: true as const, url: `/api/public/product-image/${path}` };
  });

export const adminListOrders = createServerFn({ method: "GET" }).handler(async (): Promise<AdminOrder[]> => {
  const { requireAdmin } = await import("./admin-session.server");
  requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return (data ?? []).map((o) => ({
    id: o.id,
    customerName: o.customer_name,
    phone: o.phone,
    city: o.city,
    address: o.address,
    location: o.location,
    payment: o.payment,
    items: (o.items as AdminOrder["items"]) ?? [],
    total: o.total,
    status: o.status,
    createdAt: o.created_at,
  }));
});

export const adminSetOrderStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; status: string }) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-session.server");
    requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("orders").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
