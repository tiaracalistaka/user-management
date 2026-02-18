<template>
  <UModal v-model="model">
    <div class="p-6 space-y-6">

      <!-- HEADER -->
      <div class="text-center">
        <h2
          class="text-2xl font-bold
                 text-blue-900 dark:text-white"
        >
          Sign In
        </h2>

        <p class="text-sm text-gray-500">
          Masuk ke sistem manajemen pengguna
        </p>
      </div>

      <!-- FORM -->
      <UForm @submit="login" class="space-y-4">
        <UFormGroup label="Email">
          <UInput v-model="email" />
        </UFormGroup>

        <UFormGroup label="Password">
          <UInput
            v-model="password"
            type="password"
          />
        </UFormGroup>

        <UButton
          type="submit"
          block
          class="bg-blue-800 hover:bg-blue-900"
        >
          Login
        </UButton>
      </UForm>

    </div>
  </UModal>
</template>

<script setup>
const model = defineModel()

const email = ref('')
const password = ref('')

const login = () => {
  console.log(email.value, password.value)
}
</script>
