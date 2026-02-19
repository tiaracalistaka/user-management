export default defineNuxtRouteMiddleware(
  async () => {

    const user =
      await $fetch('/api/getRole')
        .catch(() => null)

    /* NOT LOGIN */
    if (!user) {
      return navigateTo('/')
    }

  }
)
