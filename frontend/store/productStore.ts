import { defineStore } from "pinia";
import type { Product } from "@/types/product";
import { apiFetch } from "@/utils/api";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [] as Product[],
    loading: false as boolean,
    error: null as string | null
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        this.products = await apiFetch<Product[]>("/products");
      } catch (err) {
        this.error = err instanceof Error ? err.message : "Unknown error";
      } finally {
        this.loading = false;
      }
    }
  }
});
