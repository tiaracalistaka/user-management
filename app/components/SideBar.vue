<template>
  <aside
    class="w-64 bg-white shadow-md p-6 flex flex-col justify-between"
  >
    <div>
      <h2
        class="text-xl font-bold text-blue-900 mb-8"
      >
        Dashboard
      </h2>

      <ul class="space-y-3">

        <li>
          <UButton
            label="Profil"
            icon="lucide:user"
            block
            variant="ghost"
            :class="menuClass('profil')"
            @click="selectMenu('profil')"
          />
        </li>

        <li>
          <UButton
            label="Data User"
            icon="lucide:bar-chart-3"
            block
            variant="ghost"
            :class="menuClass('users')"
            @click="selectMenu('users')"
          />
        </li>

        <li v-if="role === 'SUPERADMIN'">
        <NuxtLink to="/manageuser">

            <UButton
            label="Manage User"
            icon="lucide:settings"
            block
            variant="ghost"
            class="justify-start text-gray-700 hover:bg-gray-100"
            />

        </NuxtLink>
        </li>



      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  role: string
  activeMenu: string
}>()

const emit = defineEmits<{
  (e: "changeMenu", value: string): void
}>()

const selectMenu = (menu: string) => {
  emit("changeMenu", menu)
}

const menuClass = (menu: string) => {
  return [
    "justify-start", 
    props.activeMenu === menu
      ? "bg-blue-900 text-white hover:bg-blue-800"
      : "text-gray-700 hover:bg-gray-100"
  ]
}
</script>
