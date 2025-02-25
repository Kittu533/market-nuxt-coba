<template>
  <button :class="computedClass" v-bind="$attrs">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";

// Definisikan props dengan TypeScript
interface ButtonProps {
  variant?: "primary" | "secondary" | "success" | "danger"; // Opsi warna button
  class?: string; // Untuk class tambahan
}

const props = defineProps<ButtonProps>();

// Warna berdasarkan variant
const variantClass = computed(() => {
  return {
    primary: "bg-blue-700 hover:bg-blue-800",
    secondary: "bg-gray-700 hover:bg-gray-800",
    success: "bg-green-500 hover:bg-green-700",
    danger: "bg-red-500 hover:bg-red-700",
  }[props.variant ?? "primary"]; // Default ke "primary"
});

// Gabungkan class bawaan + variant + custom class
const computedClass = computed(() => {
  return `${variantClass.value} text-white py-2 px-4 rounded ${
    props.class ?? ""
  }`;
});
</script>
