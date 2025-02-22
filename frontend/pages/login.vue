<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";

const email = ref("");
const password = ref("");
const errorMessage = ref<string | null>(null);
const { login } = useAuth();

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl font-bold">Login</h1>
    <form @submit.prevent="handleLogin" class="w-80 p-4 bg-gray-800 rounded">
      <input v-model="email" type="email" placeholder="Email" required class="p-2 mb-2 border rounded w-full" />
      <input v-model="password" type="password" placeholder="Password" required class="p-2 mb-2 border rounded w-full" />
      <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded">Login</button>
    </form>
    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    <p class="mt-4">
      Don't have an account? <NuxtLink to="/register" class="text-blue-500">Register</NuxtLink>
    </p>
  </div>
</template>
