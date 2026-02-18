<template>
  <div>
    <h1 class="title">Super Admin</h1>

    <UCard class="mt-6">
      <h2 class="card-title">Daftar Semua User</h2>

      <UTable :rows="users" :columns="columns" />
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard' })

const users = [
  { name: 'Admin', role: 'SUPERADMIN' },
  { name: 'Manager A', role: 'MANAGER' },
  { name: 'Pegawai A', role: 'PEGAWAI' }
]

const columns = [
  { key: 'name', label: 'Nama' },
  { key: 'role', label: 'Role' }
]
</script>

<style scoped>
.title {
  @apply text-2xl font-bold text-blue-900;
}
.card-title {
  @apply font-semibold mb-4;
}
</style>
