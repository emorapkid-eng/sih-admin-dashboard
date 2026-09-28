import { createServerFn } from "@tanstack/react-start";

export type NewOrder = {
  name: string;
  phone: string;
  city: string;
  address: string;
  location?: string;
  payment: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
};

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((data: NewOrder) => data)
  .handler(async ({ data }) => {
    if (!data.name?.trim() || !data.phone?.trim() || !data.items?.length) {
      return { ok: false as const };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("orders").insert({
      customer_name: data.name.slice(0, 120),
      phone: data.phone.slice(0, 40),
      city: data.city.slice(0, 80),
      address: data.address.slice(0, 400),
      location: data.location?.slice(0, 300) ?? null,
      payment: data.payment === "NAYAPAY" ? "NAYAPAY" : "COD",
      items: data.items.slice(0, 100),
      total: Math.max(0, Math.round(data.total) || 0),
    });
    if (error) {
      console.error("createOrder", error);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
