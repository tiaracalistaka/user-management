<template>
  <div
    class="bg-white shadow rounded-xl p-6
           min-h-[calc(100vh-4rem)]
           flex flex-col"
  >

    <!-- HEADER + SEARCH -->
    <div
      class="mb-4 flex justify-between items-center"
    >
      <h2 class="text-lg font-bold">
        Manage User
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

        <!-- HEADER -->
        <thead
          class="bg-yellow-500 text-blue-900 text-sm
                 sticky top-0 z-10"
        >
          <tr>

            <th class="px-4 py-3 text-left border-b">
              Nama
            </th>

            <th class="px-4 py-3 text-left border-b">
              Email
            </th>

            <th class="px-4 py-3 text-left border-b">
              Role
            </th>

            <th class="px-4 py-3 text-center border-b">
              Action
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

            <!-- NAME -->
            <td class="px-4 py-3">
              {{ u.name }}
            </td>

            <!-- EMAIL -->
            <td class="px-4 py-3">
              {{ u.email }}
            </td>

            <!-- ROLE -->
            <td class="px-4 py-3">

              <span
                class="px-2 py-1 rounded-full
                       text-xs font-medium"
                :class="roleBadge(u.role)"
              >
                {{ u.role }}
              </span>

            </td>

            <!-- ACTION -->
            <td
              class="px-4 py-3 flex
                     justify-center gap-3"
            >

              <!-- EDIT -->
              <button
                @click="edit(u)"
                class="icon-btn"
              >
                <Icon name="lucide:pencil" />
              </button>

              <!-- DELETE -->
              <button
                @click="remove(u.id)"
                class="icon-btn delete"
              >
                <Icon name="lucide:trash-2" />
              </button>

            </td>

          </tr>

          <!-- EMPTY -->
          <tr v-if="filteredUsers.length === 0">
            <td
              colspan="4"
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

const fetchUsers = async () => {
  const data =
    await $fetch<User[]>('/api/user')

  users.value = data || []
}

onMounted(fetchUsers)

/* FILTER */
const filteredUsers = computed(() => {

  if (!users.value) return []

  if (!search.value)
    return users.value

  return users.value.filter((u) =>
    u.name.toLowerCase()
      .includes(search.value.toLowerCase()) ||

    u.email.toLowerCase()
      .includes(search.value.toLowerCase())
  )
})

/* EDIT */
const edit = (u: User) => {
  selectedUser.value = u
  showEdit.value = true
}

/* DELETE */
const remove = async (id: string) => {

  const ok = confirm(
    "Yakin ingin menghapus user ini?"
  )

  if (!ok) return

  await $fetch(`/api/user/${id}`, {
    method: 'DELETE',
  })

  await fetchUsers()
}

const roleBadge = (role: string) => {

  if (role === "SUPERADMIN")
    return "bg-purple-100 text-purple-700"

  if (role === "MANAGER")
    return "bg-blue-100 text-blue-700"

  return "bg-gray-200 text-gray-700"
}

</script>

<style scoped>

/* ICON BUTTON */
.icon-btn {
  background: #f3f4f6;
  padding: 8px;
  border-radius: 10px;
  transition: 0.2s;
}

.icon-btn:hover {
  background: #e5e7eb;
}

/* DELETE COLOR */
.icon-btn.delete:hover {
  background: #fee2e2;
  color: #dc2626;
}

</style>
