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
  role: "PEGAWAI",
})

const { getAuthUser } = useAuthUser()

const activeMenu = ref("profil")

onMounted(async () => {
  const user = await getAuthUser()

  if (!user) {
    return navigateTo('/')
  }

  profile.value = user
})
</script>
