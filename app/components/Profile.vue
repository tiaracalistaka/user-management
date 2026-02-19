<template>
  <div
    class="bg-white shadow rounded-xl p-6
           min-h-auto max-w-2xl"
  >
    <h2 class="text-lg font-bold mb-4">
      Profil Saya
    </h2>
    <div class="space-y-6">

      <div class="field">
        <label>Nama</label>

        <div class="input-wrapper">

            <UInput
            v-model="form.name"
            :readonly="!edit.name"
            :ui="inputUI(edit.name)"
            class="flex-1"
            />
            <UButton
            icon="lucide:pencil"
            color="neutral"
            variant="soft"
            @click="toggleEdit('name')"
            />

        </div>
        </div>

      <div class="field">
        <label>Email</label>

        <div class="input-wrapper">

          <UInput
            v-model="form.email"
            :readonly="!edit.email"
            :ui="inputUI(edit.email)"
            class="flex-1"
          />

        </div>
      </div>

      <div class="field">
        <label>Password</label>

        <div class="input-wrapper">

          <UInput
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            :readonly="!edit.password"
            placeholder="••••••••"
            :ui="inputUI(edit.password)"
            class="flex-1"
          />
        </div>
      </div>

    </div>

    <UButton
      label="Simpan Perubahan"
      color="primary"
      class="mt-10"
      @click="updateProfile"
    />

  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  profile: {
    name: string
    email: string
    role: string
  }
}>()

const form = reactive({
  name: "",
  email: "",
  password: "",
})

watch(
  () => props.profile,
  (profile) => {
    if (!profile) return

    form.name = profile.name ?? ""
    form.email = profile.email ?? ""
  },
  { immediate: true }
)


const edit = reactive({
  name: false,
  email: false,
  password: false,
})

const toggleEdit = (
  field: keyof typeof edit
) => {
  edit[field] = !edit[field]
}


const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const inputUI = (active: boolean) => ({
  base: [
    "transition",
    active
      ? "bg-white border-blue-600 ring-2 ring-blue-100"
      : "bg-gray-50"
  ]
})

const updateProfile = async () => {
  await $fetch('/api/profile/update', {
    method: 'PUT',
    body: form,
  })

  alert("Profil berhasil diupdate")

  Object.keys(edit).forEach(
    (k) =>
      (edit[k as keyof typeof edit] = false)
  )
}
</script>
<style scoped>
.field label {
  font-size: 12px;
  color: #6b7280;
  display: block;
  margin-bottom: 4px;
}
.input-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

</style>
