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

      <!-- Logout hanya di /dashboard -->
      <button
        v-if="route.path.startsWith('/dashboard')"
        @click="logout"
        class="bg-white text-gray-700 py-1 px-2 rounded-lg hover:bg-gray-100 ml-3"
      >
        Logout
      </button>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import { authClient } from "~/lib/auth-client"

const route = useRoute()
const { clearAuthUser } = useAuthUser()

const logout = async () => {
  try {
    const { error } = await authClient.signOut()

    if (error) {
      throw new Error(error.message)
    }
  } catch {
  } finally {
    clearAuthUser()
    sessionStorage.clear()

    await navigateTo('/')
  }
}
</script>

