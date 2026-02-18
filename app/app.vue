<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/logo.png' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'User Management System - Kementerian PU'
const description = 'User Management System - Kementerian PU'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template> 
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>
