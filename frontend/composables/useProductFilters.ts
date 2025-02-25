import type { Product } from "~/types/product"; // Pastikan sudah ada tipe Product

export const useProductFilters = (products: Ref<Product[]>) => {
    // State untuk search dan filter
    const searchQuery = ref<string>("");
    const selectedCategory = ref<string>("All");

    // Ambil semua kategori unik dari produk
    const categories = computed(() => {
        if (!products.value) return [];
        return ["All", ...new Set(products.value.map((product) => product.category))];
    });

    // Filter produk berdasarkan pencarian dan kategori
    const filteredProducts = computed(() => {
        if (!products.value) return [];

        return products.value.filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase());
            const matchesCategory = selectedCategory.value === "All" || product.category === selectedCategory.value;
            return matchesSearch && matchesCategory;
        });
    });

    // Urutkan produk berdasarkan harga (low to high)
    const sortedProducts = computed(() => {
        return [...filteredProducts.value].sort((a, b) => a.price - b.price);
    });

    // Format harga ke dalam mata uang USD
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
    };

    return {
        searchQuery,
        selectedCategory,
        categories,
        filteredProducts,
        sortedProducts,
        formatPrice,
    };
};
