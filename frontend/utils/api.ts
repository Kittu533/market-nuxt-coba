export const apiFetch = async <T>(endpoint: string, options: any = {}): Promise<T> => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.API_PRODUCTS; // Ambil base URL dari .env

  if (!baseUrl) {
    throw new Error("Base URL API_PRODUCTS tidak ditemukan. Periksa file .env!");
  }

  try {
    const response: T = await $fetch(`${baseUrl}${endpoint}`, options);
    return response;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
