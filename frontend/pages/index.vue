<script lang="ts" setup>
definePageMeta({
  layout: "page",
});
// const colorMode = useColorMode()
// const isDark = computed({
//   get () {
//     return colorMode.value === 'light'
//   },
//   set () {
//     colorMode.preference = colorMode.value === 'light' ? 'light' : 'l'
//   }
// })

useSeoMeta({
  title: "Landing Page",
  titleTemplate: "",
});

const stats = [
  { value: "245%", label: "More revenues for the brand" },
  { value: "130K+", label: "Audiences reached" },
  { value: "50+", label: "Brands trust us" },
  { value: "24+", label: "Worldwide Awards" },
];

// fetch API menggunakan useFetch

import {useProducts} from "@/composables/useProducts";
const {products,pending,loading,error,fetchProducts} = useProducts();
fetchProducts();

const limitedProducts = computed(() => products.value.slice(0, 3));


</script>

<template>
  <div class="flex flex-col flex-1">
    <section class="flex-1 flex justify-center items-center gap-32 mb-28">
      <div data-aos="fade-right" class="flex flex-col gap-6">
        <h1 class="text-6xl md:text-7xl font-bold leading-tight text-black">
          <span class="block">We Take</span>
          <span class="block">Care Of</span>
          <span class="block">Your Brand</span>
        </h1>
        <p class="text-lg">
          We care about our work and we care about our client
        </p>
        <div class="flex gap-4">
          <input
            type="text"
            placeholder="Enter your email"
            class="px-4 py-2 rounded-2xl text-white"
          />
          <Button class="rounded-xl">Book A Call</Button>
        </div>
      </div>
      <div data-aos="fade-left">
        <img class="w-[602px]" src="~/assets/hero-img.png" alt="" />
      </div>
    </section>
    <section
      class="min-h-[calc(60vh-68px)] bg-gray-100 flex justify-center item-center"
    >
      <div class="flex flex-col justify-evenly">
        <h1
          class="flex justify-center items-center text-black text-4xl font-semibold"
        >
          Companies We Work With
        </h1>
        <img data-aos="right" class="w-[1200px]" src="~/assets/work-with-1.png" alt="" />
        <img data-aos="left" class="w-[1200px]" src="~/assets/work-with-2.png" alt="" />
      </div>
    </section>
    <section
      class="min-h-[calc(60vh-68px)] bg-gray-50 flex flex-col justify-center"
    >
      <div
        class="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <!-- Bagian Statistik -->
        <div data-aos="fade-right" class="grid grid-cols-2 gap-8">
          <div v-for="(item, index) in stats" :key="index">
            <h2 class="text-4xl md:text-5xl font-bold">{{ item.value }}</h2>
            <p class="text-gray-500">{{ item.label }}</p>
          </div>
        </div>

        <!-- Bagian Komitmen -->
        <div data-aos="fade-left">
          <h2 class="text-4xl md:text-5xl font-bold">Commitments</h2>
          <p class="text-gray-500 mt-4">
            We are committed to working with you collaboratively to understand
            your goals and create a strategy that will achieve them.
          </p>
          <a
            href="#"
            class="text-blue-600 font-medium mt-4 inline-flex items-center"
          >
            Learn More →
          </a>
        </div>
      </div>
    </section>
    <!-- Product-section -->
    <section
      class="min-h-[calc(60vh-68px)] bg-gray-100 flex flex-col items-center py-16 px-6"
    >
      <div class="text-center mb-8">
        <h2 class="text-4xl md:text-5xl font-bold">Our Work</h2>
        <p class="text-gray-500 text-lg">A glimpse of our portfolio</p>
      </div>

      <!-- Tampilkan loading jika masih fetching -->
      <div v-if="pending" class="text-gray-500 text-lg">
        Loading products...
      </div>

      <!-- Grid Produk -->
      <div
        data-aos="fade-up"
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        <div
          v-for="product in limitedProducts" :key="product.id"
          class="bg-white rounded-3xl shadow-md p-6 text-center"
        >
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full h-56 object-contain mb-4 rounded-lg"
          />
          <h3 class="text-xl font-semibold">{{ product.title }}</h3>
        </div>
      </div>

      <!-- Button Navigasi -->
      <NuxtLink to="/product">
        <button
          class="mt-8 bg-blue-700 text-white px-8 py-2 rounded-full text-lg hover:bg-blue-700"
        >
          See More
        </button>
      </NuxtLink>
    </section>
    <!-- CTA Banner  -->
    <section data-aos="fade-left"
      class="min-h-[calc(60vh-68px)] bg-gray-100 flex justify-center item-center"
    >
      <img class="w-[1200px] h-[400px]" src="~/assets/cta-banner.png" alt="" />
    </section>
    <!-- Meet Our Team -->
    <section
      class="min-h-[calc(60vh-68px)] bg-gray-100 flex justify-center item-center px-6"
    >
      <div
        class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <img
        data-aos="fade-right"
          class="w-[610px] h-[400px]"
          src="~/assets/team-photo.png"
          alt="team-photo"
        />
        <div 
        data-aos="fade-left"
        class="flex flex-col">
          <div class="flex justify-start flex-col">
            <h1 class="text-4xl md:text-5xl font-semibold">Meet Our Team</h1>
            <p class="text-gray-500 mt-4">
              Discover the brilliance behind Embrace. Our team blends innovation
              and artistry to craft digital wonders that captivate.
            </p>
          </div>
          <div>
            <Button
              class="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial -->
    <Testimonial />
  </div>
</template>
