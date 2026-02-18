<template>
  <div class="min-h-screen flex flex-col lg:flex-row overflow-hidden">

    <!-- LEFT : HERO -->
    <section
      class="lg:w-1/2 flex items-center justify-center px-6 lg:px-16"
    >
      <div
        class="max-w-xl text-center transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        :class="
          animate
            ? 'translate-x-0 opacity-100'
            : 'lg:translate-x-1/2 opacity-0'
        "
      >
        <!-- TITLE -->
        <h1
          class="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white"
        >
          Kementerian PU
        </h1>

        <!-- GOLD LINE -->
        <div
          class="w-28 h-1 bg-yellow-400 rounded-full my-6 mx-auto"
        ></div>

        <!-- DESC -->
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

        <!-- LOGO -->
        <img
          src="/logo.png"
          class="h-12 mx-auto mb-6"
        />

        <!-- TITLE -->
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

        <!-- FORM -->
        <form class="space-y-5">

          <UFormField label="Email">
            <UInput
              size="lg"
              type="email"
              placeholder="email@pu.go.id"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Password">
            <UInput
              size="lg"
              type="password"
              placeholder="••••••••"
              class="w-full"
            />
          </UFormField>
          <UButton
            block
            size="lg"
            class="bg-blue-900 hover:bg-blue-700 text-white"
          >
            Login
          </UButton>

        </form>

      </div>
    </section>

  </div>
</template>
<script setup>
const animate = ref(false)

onMounted(() => {
  setTimeout(() => {
    animate.value = true
  }, 900) // lebih lama intro
})

const email = ref('')
const password = ref('')
const loading = ref(false)

const submit = async () => {

  loading.value = true

  await signIn.email({
    email: email.value,
    password: password.value
  })

  const { data: session } = await useAuthSession()

  const role = session.value?.user?.role

  if (role === 'SUPERADMIN') {
    navigateTo('/superadmin')
  }

  else if (role === 'MANAGER') {
    navigateTo('/manager')
  }

  else {
    navigateTo('/pegawai')
  }

  loading.value = false
}
</script>

