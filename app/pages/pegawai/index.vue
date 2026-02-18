<template>
  <div>
    <h1 class="title">Pegawai</h1>

    <UCard class="mt-6 max-w-xl">
      <h2 class="card-title">Profil Saya</h2>

      <div class="space-y-2">
        <p><b>Nama:</b> Pegawai A</p>
        <p><b>Email:</b> pegawai@mail.com</p>
        <p><b>Role:</b> Pegawai</p>
      </div>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({ 
    middleware: 'role',
    layout: 'dashboard' })
</script>
