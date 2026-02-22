import { useAuthUser } from "~/composables/useAuthUser"

export default defineNuxtRouteMiddleware(
  async () => {
    const {
      getAuthUser,
      clearAuthUser,
    } = useAuthUser()

    const user = await getAuthUser()

    if (!user) {
      clearAuthUser()
      return navigateTo('/')
    }

    /* NOT SUPERADMIN */
    if (user.role !== 'SUPERADMIN') {
      return navigateTo('/')
    }

  }
)
