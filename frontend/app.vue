<script lang="ts" setup>
  useSeoMeta({
    titleTemplate: '%s Embrance-Landing Page',
  })
</script>

<template>
  <div>
    <NuxtLoadingIndicator  color="green" :throttle="0"/>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>