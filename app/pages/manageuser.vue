<template>
  <div>
  <div
    class="bg-white p-6
           min-h-[calc(100vh-4rem)]
           flex flex-col max-w-6xl mx-auto"
  >

    <div class="mb-4">
      <NuxtLink to="/dashboard">
        <UButton
          color="neutral"
          variant="soft"
          icon="lucide:arrow-left"
        >
          Kembali ke Dashboard
        </UButton>
      </NuxtLink>
    </div>

    <div
      class="mb-4 flex justify-between items-center"
    >
      <h2 class="text-lg font-bold">
        Manage User
      </h2>

      <div class="flex items-center gap-3">
        <UInput
          v-model="search"
          size="lg"
          placeholder="Cari nama / email..."
          class="w-64"
        />

        <UButton
          size="lg"
          color="primary"
          @click="openCreate"
        >
          Create User
        </UButton>
      </div>
    </div>

    <p
      v-if="errorMessage"
      class="mb-3 text-sm text-red-600"
    >
      {{ errorMessage }}
    </p>

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
                :disabled="loading"
              >
                <Icon name="lucide:pencil" />
              </button>

              <!-- DELETE -->
              <button
                @click="remove(u.id)"
                class="icon-btn delete"
                :disabled="loading"
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
    <UModal
      v-model:open="showModal"
      :title="mode === 'create' ? 'Create User' : 'Edit User'"
      :ui="{
        overlay: 'bg-black/50',
        content: 'max-w-lg w-full rounded-2xl shadow-2xl'
      }"
    >
      <template #body>
        <div class="p-6 space-y-4">
          <!-- FORM ISI -->
          <UFormField label="Nama" :error="formErrors.name">
            <UInput v-model="form.name" placeholder="Nama lengkap" />
          </UFormField>

          <UFormField
            v-if="mode === 'create'"
            label="Email"
            :error="formErrors.email"
          >
            <UInput v-model="form.email" type="email" />
          </UFormField>

          <UFormField
            v-if="mode === 'create'"
            label="Password"
            :error="formErrors.password"
          >
            <UInput v-model="form.password" type="password" />
          </UFormField>

          <UFormField label="Role" :error="formErrors.role">
            <select
              v-model="form.role"
              class="w-full border rounded-md px-3 py-2"
            >
              <option value="SUPERADMIN">SUPERADMIN</option>
              <option value="MANAGER">MANAGER</option>
              <option value="PEGAWAI">PEGAWAI</option>
            </select>
          </UFormField>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-2 pt-2 px-6 pb-6">
          <div class="flex justify-end gap-2 pt-2">
            <UButton
              color="neutral"
              variant="soft"
              @click="closeModal"
            >
              Cancel
            </UButton>
            <UButton
              :loading="loading"
              @click="submitForm"
            >
              {{ mode === 'create' ? 'Create' : 'Update' }}
            </UButton>
          </div>
        </div>
      </template>
    </UModal>

</div>
  
</template>

<script setup lang="ts">

definePageMeta({
  middleware: [
    'auth',
    'superadmin'
  ]
})

type User = {
  id: string
  name: string
  email: string
  role: string
}

const users = ref<User[]>([])
const search = ref("")
const showModal = ref(false)
const mode = ref<'create' | 'edit'>('create')
const loading = ref(false)
const errorMessage = ref('')
const editingId = ref<string | null>(null)

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'PEGAWAI',
})

const formErrors = reactive({
  name: '',
  email: '',
  password: '',
  role: '',
  global: '',
})

const fetchUsers = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch<{ data: User[] }>('/api/users')
    users.value = response?.data || []
  } catch (error: any) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)

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

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.password = ''
  form.role = 'PEGAWAI'

  formErrors.name = ''
  formErrors.email = ''
  formErrors.password = ''
  formErrors.role = ''
  formErrors.global = ''

  editingId.value = null
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const openCreate = () => {
  mode.value = 'create'
  resetForm()
  showModal.value = true
}

const edit = (user: User) => {
  mode.value = 'edit'
  resetForm()
  editingId.value = user.id
  form.name = user.name
  form.role = user.role
  showModal.value = true
}

const validateForm = () => {
  formErrors.name = ''
  formErrors.email = ''
  formErrors.password = ''
  formErrors.role = ''
  formErrors.global = ''

  if (!form.name || form.name.trim().length < 3) {
    formErrors.name = 'Nama minimal 3 karakter'
  }

  if (mode.value === 'create') {
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      formErrors.email = 'Email tidak valid'
    }

    if (!form.password || form.password.length < 8) {
      formErrors.password = 'Password minimal 8 karakter'
    }
  }

  if (!['SUPERADMIN', 'MANAGER', 'PEGAWAI'].includes(form.role)) {
    formErrors.role = 'Role tidak valid'
  }

  return !formErrors.name && !formErrors.email && !formErrors.password && !formErrors.role
}

const getErrorMessage = (error: any) => {
  return (
    error?.data?.statusMessage ||
    error?.data?.message ||
    error?.message ||
    'Terjadi kesalahan'
  )
}

const submitForm = async () => {
  if (!validateForm()) return

  loading.value = true
  errorMessage.value = ''

  try {
    if (mode.value === 'create') {
      await $fetch('/api/users', {
        method: 'POST',
        body: {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        },
      })
    } else {
      if (!editingId.value) {
        throw new Error('User tidak ditemukan')
      }

      await $fetch(`/api/users/${editingId.value}`, {
        method: 'PUT',
        body: {
          name: form.name,
          role: form.role,
        },
      })
    }

    closeModal()
    await fetchUsers()
  } catch (error: any) {
    formErrors.global = getErrorMessage(error)
  } finally {
    loading.value = false
  }
}

const remove = async (id: string) => {
  if (loading.value) return

  const ok = confirm(
    "Yakin ingin menghapus user ini?"
  )

  if (!ok) return

  loading.value = true
  errorMessage.value = ''

  try {
    await $fetch(`/api/users/${id}`, {
      method: 'DELETE',
    })

    await fetchUsers()
  } catch (error: any) {
    errorMessage.value = getErrorMessage(error)
  } finally {
    loading.value = false
  }
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
.icon-btn {
  background: #f3f4f6;
  padding: 8px;
  border-radius: 10px;
  transition: 0.2s;
}

.icon-btn:hover {
  background: #e5e7eb;
}

.icon-btn.delete:hover {
  background: #fee2e2;
  color: #dc2626;
}

</style>
