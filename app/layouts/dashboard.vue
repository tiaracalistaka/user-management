<template>
  <div class="min-h-screen flex bg-gray-50">

    <!-- SIDEBAR -->
    <aside class="w-64 bg-white border-r p-5">

      <h2 class="font-bold text-blue-900 mb-6">
        Dashboard
      </h2>

      <nav class="space-y-2">

        <NuxtLink
          v-if="user?.role === 'SUPERADMIN'"
          to="/superadmin"
          class="menu"
        >
          User & Role
        </NuxtLink>

        <NuxtLink
          v-if="user?.role === 'MANAGER'"
          to="/manager"
          class="menu"
        >
          Data Tim
        </NuxtLink>

        <NuxtLink
          v-if="user?.role === 'PEGAWAI'"
          to="/pegawai"
          class="menu"
        >
          Profil Saya
        </NuxtLink>

      </nav>
    </aside>

    <!-- CONTENT -->
    <main class="flex-1 p-8">
      <slot />
    </main>

  </div>
</template>

<script setup>
const { user } = useAuth()
</script>

<style scoped>
.menu {
  @apply block px-3 py-2 rounded-lg hover:bg-blue-50;
}
</style>
