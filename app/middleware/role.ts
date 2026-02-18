export default defineNuxtRouteMiddleware(async (to) => {

  const { data: session } = await useFetch<{
    user?: {
      role?: string
    }
  }>('/api/auth/session')

  const role = session.value?.user?.role

  if (!role) {
    return navigateTo('/login')
  }

  if (to.path.startsWith('/superadmin') &&
      role !== 'SUPERADMIN') {
    return navigateTo('/unauthorized')
  }

  if (to.path.startsWith('/manager') &&
      role !== 'MANAGER') {
    return navigateTo('/unauthorized')
  }

})
