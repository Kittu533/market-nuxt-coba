import { useCookie, useRuntimeConfig } from "#app";

export const useAuth = () => {
  const token = useCookie("auth_token"); // Simpan token di cookie
  const config = useRuntimeConfig();

  const register = async (email: string, password: string) => {
    try {
      await $fetch(`${config.public.API_BASE_URL}/api/register`, {
        method: "POST",
        body: { email, password },
      });
      return true;
    } catch (error: any) {
      throw new Error(error.data?.message || "Register failed");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch<{ token: string }>(`${config.public.API_BASE_URL}/api/login`, {
        method: "POST",
        body: { email, password },
      });

      if (response.token) {
        token.value = response.token; // Simpan token di cookie
        navigateTo("/"); // ✅ Redirect ke halaman utama (index.vue)
        return true;
      }
    } catch (error: any) {
      throw new Error(error.data?.message || "Login failed");
    }
  };

  const getProfile = async () => {
    if (!token.value) return null;

    try {
      const response = await $fetch<{ message: string; user: { id: number; email: string } }>(
        `${config.public.API_BASE_URL}/api/profile`,
        {
          headers: { Authorization: `Bearer ${token.value}` },
        }
      );

      return response.user; // ✅ Perbaikan: Hanya mengembalikan `user`
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      return null;
    }
  };

  const logout = () => {
    token.value = null;
    navigateTo("/login");
  };

  return { register, login, getProfile, logout, token }; // ✅ Pastikan `getProfile` dikembalikan
};
