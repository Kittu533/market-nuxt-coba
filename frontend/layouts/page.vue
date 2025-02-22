<script lang="ts" setup>
const menus = ref([
  { label: "How It Works", to: "/" },
  { label: "Our Work", to: "/about" },
  { label: "Products", to: "/product-page" },
  { label: "About us", to: "/contact" },
]);

// useSeoMeta({
//   logo: "/Logo.png",
//   heroImg: "/hero-img.png",
// });
</script>

<template>
  <div class="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
    <header
      class="sticky top-1 w-full z-30 border-b border-gray-500/25 h-[68px] flex backdrop-filter backdrop-blur"
    >
      <PageContainer class="felx-1 flex items-center justify-between">
        <div class="flex items-center">
          <img class="w-32" src="~/assets/Logo.png" alt="" />
        </div>

        <!-- menu -->
        <nav class="gap-4">
          <ul class="flex gap-4">
            <li v-for="(menu, i) in menus" :key="i">
              <NuxtLink class="hover:text-blue-600" :to="menu.to">
                {{ menu.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <!-- Toggle darkmode -->
        <!-- <div class="pl-4">
            <ToggleMode />
          </div> -->
        <!-- Button Book A Call -->

        <div class="pl-4">
          <NuxtLink class="rounded-xl" to="/register">Register</NuxtLink>

        </div>
      </PageContainer>
    </header>

    <!--  main  -->
    <main class="flex-1 flex">
      <slot />
    </main>

    <!-- footer -->
    <footer class="border-t border-gray-500/50 h-[48px] flex">
      <PageContainer class="flex-1 flex items-center justify-between">
        <div class="flex-1">
          <span class="text-sm">&copy; {{ new Date().getFullYear() }}</span>
        </div>
        <div></div>
      </PageContainer>
    </footer>
  </div>
</template>
