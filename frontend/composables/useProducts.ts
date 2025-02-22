import type { Product } from "~/types/product";
import { apiFetch } from "~/utils/api";

export const useProducts = () => {
  const products = ref<Product[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const pending = ref<boolean>(false);

  const fetchProducts = async () => {
    loading.value = true;
    pending.value = true;
    try {
      products.value = await apiFetch<Product[]>("/products");
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error";
    } finally {
      loading.value = false;
      pending.value = false; 

    }
  };

  return { products, loading,pending, error, fetchProducts };
};
