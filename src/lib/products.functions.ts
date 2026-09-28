import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { CategorySlug, Product } from "./shop";

type Row = Database["public"]["Tables"]["products"]["Row"];

export function toProduct(row: Row): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category as CategorySlug,
    price: row.price,
    image: row.image,
    description: row.description,
    isNew: row.is_new,
    isFeatured: row.is_featured,
    ...(row.is_new ? { tag: "NEW" } : row.is_featured ? { tag: "FEATURED" } : {}),
  };
}

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listProducts = createServerFn({ method: "GET" }).handler(async (): Promise<Product[]> => {
  const { data, error } = await publicClient()
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    console.error("listProducts", error);
    return [];
  }
  return (data ?? []).map(toProduct);
});
