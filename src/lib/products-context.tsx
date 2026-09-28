import { createContext, useContext, type ReactNode } from "react";
import type { Product } from "./shop";

const Ctx = createContext<Product[]>([]);

export function ProductsProvider({ products, children }: { products: Product[]; children: ReactNode }) {
  return <Ctx.Provider value={products}>{children}</Ctx.Provider>;
}

export function useProducts() {
  return useContext(Ctx);
}
