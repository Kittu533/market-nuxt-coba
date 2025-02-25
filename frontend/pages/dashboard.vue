<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

import { ref, onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";

const { getProfile, logout } = useAuth();
const user = ref<{ id: number; email: string } | null>(null);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  try {
    const profileData = await getProfile();
    if (profileData) {
      user.value = profileData;
    } else {
      errorMessage.value = "Failed to load profile";
    }
  } catch (error: any) {
    errorMessage.value = "Failed to load profile";
  }
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Dashboard</h1>

    <div v-if="user" class="mt-4 p-4 border rounded bg-gray-800 text-white">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>User ID:</strong> {{ user.id }}</p>
    </div>

    <p v-else-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

    <div class="mt-4">
      <button @click="logout" class="p-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  </div>
</template>
