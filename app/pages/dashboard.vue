<template>
  <div class="flex min-h-screen bg-gray-50">

    <Sidebar
      :role="profile.role"
      :activeMenu="activeMenu"
      @changeMenu="activeMenu = $event"
    />

    <main class="flex-1 p-8">

      <Profile
        v-if="activeMenu === 'profil'"
        :profile="profile"
      />

      <UserList
        v-if="activeMenu === 'users'"
      />


    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import Sidebar from "~/components/SideBar.vue"
import Profile from "~/components/Profile.vue"
import UserList from "~/components/UserList.vue"


const profile = ref({
  name: "",
  email: "",
  role: "",
})

const activeMenu = ref("profil")

onMounted(async () => {
  profile.value =
    await $fetch('/api/getRole')
  console.log(profile.value)
})
</script>
