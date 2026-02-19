<template>
  <div
    class="bg-white shadow rounded-xl p-6
           min-h-[calc(100vh-4rem)]
           flex flex-col"
  >

    <div
      class="mb-4 flex justify-between items-center"
    >
      <h2
        class="text-lg font-bold mb-4"
      >
        Data User
      </h2>
      <UInput
              v-model="search"
              size="lg"
              placeholder="Cari nama / email..."
              class="w-64"

            />
    
    </div>

    <!-- TABLE -->
    <div class="overflow-auto flex-1">

      <table
        class="w-full border border-gray-200
               rounded-lg overflow-hidden"
      >
        <thead
          class="bg-yellow-500 text-blue-900 text-sm
                 sticky top-0 z-10"
        >
          <tr>

            <th
              class="px-4 py-3 text-left border-b"
            >
              Nama
            </th>

            <th
              class="px-4 py-3 text-left border-b"
            >
              Email
            </th>

            <th
              class="px-4 py-3 text-left border-b"
            >
              Role
            </th>

          </tr>
        </thead>

        <!-- BODY -->
        <tbody class="text-sm">

          <tr
            v-for="(u, i) in filteredUsers"
            :key="u.id"
            :class="[
              'border-b transition',
              i % 2 === 0
                ? 'bg-white'
                : 'bg-gray-50',
              'hover:bg-yellow-50'
            ]"
          >

            <td class="px-4 py-3">
              {{ u.name }}
            </td>

            <td class="px-4 py-3">
              {{ u.email }}
            </td>

            <td class="px-4 py-3">

              <span
                class="px-2 py-1 rounded-full
                       text-xs font-medium"
                :class="roleBadge(u.role)"
              >
                {{ u.role }}
              </span>

            </td>

          </tr>

          <tr v-if="filteredUsers.length === 0">
            <td
              colspan="3"
              class="text-center py-6 text-gray-400"
            >
              Data tidak ditemukan
            </td>
          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>

<script setup lang="ts">
type User = {
  id: string
  name: string
  email: string
  role: string
}


const users = ref<User[]>([])
const search = ref("")

onMounted(async () => {
  users.value =
    await $fetch<User[]>('/api/user')
})


const filteredUsers = computed(() => {

  if (!search.value) {
    return users.value
  }

  return users.value.filter((u) =>
    u.name
      .toLowerCase()
      .includes(search.value.toLowerCase()) ||

    u.email
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )

})


const roleBadge = (role: string) => {

  if (role === "SUPERADMIN") {
    return "bg-purple-100 text-purple-700"
  }

  if (role === "MANAGER") {
    return "bg-yellow-100 text-yellow-700"
  }

  return "bg-gray-200 text-gray-700"

}

</script>
