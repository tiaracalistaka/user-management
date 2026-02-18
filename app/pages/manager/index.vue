<template>
  <div>
    <h1 class="title">Manager</h1>

    <UCard class="mt-6">
      <h2 class="card-title">Data Pegawai</h2>

      <UTable :rows="pegawai" :columns="columns" />
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard' })

const pegawai = [
  { name: 'Pegawai A', divisi: 'IT' },
  { name: 'Pegawai B', divisi: 'Keuangan' }
]

const columns = [
  { key: 'name', label: 'Nama' },
  { key: 'divisi', label: 'Divisi' }
]
</script>
