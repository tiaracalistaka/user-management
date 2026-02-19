<template>
  <div class="min-h-screen flex flex-col lg:flex-row overflow-hidden">
    <section
      class="lg:w-1/2 flex items-center justify-center px-6 lg:px-16 py-12 lg:py-0"
    >
      <div
        class="max-w-xl text-center transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        :class="
          animate
            ? 'translate-x-0 opacity-100'
            : 'lg:translate-x-1/2 opacity-0'
        "
      >
        <h1
          class="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white"
        >
          Kementerian PU
        </h1>

        <div
          class="w-28 h-1 bg-yellow-400 rounded-full my-6 mx-auto"
        ></div>

        <p
          class="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          Sistem Manajemen Pengguna Kementerian
          Pekerjaan Umum untuk mendukung
          pengelolaan akses, data, dan layanan
          digital secara aman, terintegrasi,
          dan modern.
        </p>
      </div>
    </section>

    <!-- RIGHT : LOGIN BOX -->
    <section
      class="lg:w-1/2 flex items-center justify-center px-6 lg:px-16 py-12 lg:py-0 bg-gray-50 dark:bg-gray-800"
    >

      <div
        class="w-full max-w-md bg-white dark:bg-gray-700 shadow-xl rounded-2xl p-8 md:p-10
               transition-all duration-[1200ms]
               ease-[cubic-bezier(0.22,1,0.36,1)]"
        :class="
          animate
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        "
      >
        <img
          src="/logo.png"
          class="h-12 mx-auto mb-6"
        />

        <h2
          class="text-2xl font-semibold text-center text-gray-800 dark:text-white"
        >
          Login Akun
        </h2>

        <p
          class="text-center text-sm text-gray-500 mb-8"
        >
          Masuk untuk melanjutkan ke sistem
        </p>

        <form
          class="space-y-5"
          @submit.prevent="submit"
        >

          <UFormField
            label="Email"
            :error="touched && errors.email ? errors.email : undefined"
          >
            <UInput
              v-model="email"
              size="lg"
              type="email"
              placeholder="email@pu.go.id"
              class="w-full"

            />
          </UFormField>

          <UFormField
            label="Password"
            :error="touched && errors.password ? errors.password : undefined"
            >
            <UInput
              v-model="password"
              size="lg"
              type="password"
              placeholder="••••••••"
              class="w-full"

            />
          </UFormField>

          <p
            v-if="errors.global"
            class="text-red-500 text-sm text-center"
          >
            {{ errors.global }}
          </p>

          <UButton
            type="submit"
            block
            size="lg"
            :loading="loading"
            class="bg-blue-900 hover:bg-blue-700 text-white"
          >
            Login
          </UButton>
        </form>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { authClient } from "~/lib/auth-client"

const { $auth } = useNuxtApp()

const email = ref('')
const password = ref('')
const loading = ref(false)
const touched = ref(false)
const animate = ref(false)

const errors = reactive({
  email: '',
  password: '',
  global: '',
})

onMounted(() => {
  setTimeout(() => {
    animate.value = true
  }, 1000)
})

const validate = () => {
  errors.email = ''
  errors.password = ''
  errors.global = ''

  if (!email.value) {
    errors.email = 'Email wajib diisi'
  }

  if (!password.value) {
    errors.password = 'Password wajib diisi'
  }

  return !errors.email && !errors.password
}

/*  SUBMIT LOGIN  */

const submit = async () => {
  touched.value = true

  if (!validate()) return
  loading.value = true

  try {
    const { data, error } =
      await authClient.signIn.email({
        email: email.value,
        password: password.value,
      })

    if (error) {
      throw new Error(error.message)
    }

    navigateTo('/dashboard')

  } catch (err) {
    console.error("SUBMIT ERROR:", err)

    errors.global =
      "Email atau password salah"
  } finally {
    loading.value = false
  }
}
  </script>
