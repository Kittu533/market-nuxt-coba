<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";

const email = ref("");
const password = ref("");
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);
const { register } = useAuth();

const handleRegister = async () => {
  try {
    await register(email.value, password.value);
    successMessage.value = "Register successful! Redirecting to login...";
    setTimeout(() => navigateTo("/login"), 2000);
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl font-bold">Register</h1>
    <form @submit.prevent="handleRegister" class="w-80 p-4 bg-gray-800 rounded">
      <input v-model="email" type="email" placeholder="Email" required class="p-2 mb-2 border rounded w-full" />
      <input v-model="password" type="password" placeholder="Password" required class="p-2 mb-2 border rounded w-full" />
      <button type="submit" class="w-full p-2 bg-green-500 text-white rounded">Register</button>
    </form>
    <p v-if="successMessage" class="text-green-500 mt-2">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    <p class="mt-4">
      Already have an account? <NuxtLink to="/login" class="text-blue-500">Login</NuxtLink>
    </p>
  </div>
</template>
