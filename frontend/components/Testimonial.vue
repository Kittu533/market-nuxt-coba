<template>
  <section
    class="min-h-[calc(60vh-68px)] bg-gray-100 flex justify-center items-center px-6 py-16"
  >
    <div class="max-w-6xl mx-auto w-full">
      <!-- Judul -->
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
        What Our Clients Said About Us
      </h2>

      <!-- Grid Review -->
      <div class="flex gap-6 overflow-x-auto no-scrollbar">
        <div
          v-for="(review, index) in reviews"
          :key="index"
          class="p-6 rounded-xl shadow-md w-[350px] flex-shrink-0"
          :class="index === 0 ? 'bg-blue-600 text-white' : 'bg-white'"
        >
          <!-- Avatar dan Nama -->
          <div class="flex items-center gap-4">
            <img
              :src="review.avatar"
              :alt="review.name"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3
                class="font-bold"
                :class="index === 0 ? 'text-white' : 'text-black'"
              >
                {{ review.name }}
              </h3>
              <p
                class="text-sm"
                :class="index === 0 ? 'text-white' : 'text-gray-500'"
              >
                {{ review.position }}
              </p>
            </div>
          </div>

          <!-- Review -->
          <p class="mt-4 text-sm">
            {{ review.comment }}
          </p>
        </div>
      </div>

      <!-- Navigasi -->
      <div class="flex justify-center gap-4 mt-6">
        <button
          class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300"
        >
          ←
        </button>
        <button
          class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white"
        >
          →
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Testimonial
const reviews = [
  {
    name: "Amelia Joseph",
    position: "Chief Manager",
    avatar: "https://source.unsplash.com/50x50/?woman,face",
    comment:
      "My vision came alive effortlessly. Their blend of casual and professional approach made the process a breeze. Creativity flowed, and the results were beyond my expectations.",
  },
  {
    name: "Jacob Joshua",
    position: "Chief Manager",
    avatar: "https://source.unsplash.com/50x50/?man,face",
    comment:
      "I found the digital expertise I needed. Their creative-professional balance exceeded expectations. Friendly interactions, exceptional outcomes. For digital enchantment, it's got to be Embrace!",
  },
  {
    name: "Jacob Johnson",
    position: "Chief Manager",
    avatar: "https://source.unsplash.com/50x50/?man,portrait",
    comment:
      "Embrace really nails it! Creative, approachable, and strategic. They're redefining how artistry meets strategy. Thrilling results achieved!",
  },
  {
    name: "Rich Brown",
    position: "Chief Manager",
    avatar: "https://source.unsplash.com/50x50/?man,portrait",
    comment:
      "Embrace really nails it! Creative, approachable, and strategic. They're redefining how artistry meets strategy. Thrilling results achieved!",
  },
  {
    name: "Tierison",
    position: "Chief Manager",
    avatar: "https://source.unsplash.com/50x50/?man,portrait",
    comment:
      "Embrace really nails it! Creative, approachable, and strategic. They're redefining how artistry meets strategy. Thrilling results achieved!",
  },
];
</script>

<style scoped>
/* Hide scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
