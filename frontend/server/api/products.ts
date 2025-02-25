import { Product } from "~/types/product";
import { apiFetch } from "~/utils/api";

export default defineEventHandler(async (): Promise<Product[]> => {
  return await apiFetch<Product[]>("/products");
});
