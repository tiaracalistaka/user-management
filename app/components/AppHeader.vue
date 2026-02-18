<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <img
            src="/logo.png"
            alt="Logo"
            class="w-auto h-12 shrink-0"
        />
      </NuxtLink>
      
    </template>


    <template #right>
      <UColorModeButton />
    </template>


  </UHeader>
</template>