export default defineNuxtRouteMiddleware(async (to) => {
  const session = useState<any>('session')

  if (!session.value) {
    const { data } = await useFetch('/api/auth/session')
    session.value = data.value
  }

  const role = session.value?.user?.role

  if (!role) {
    return navigateTo('/')
  }

  if (to.path.startsWith('/superadmin') &&
      role !== 'SUPERADMIN') {
    return navigateTo('/')
  }

  if (to.path.startsWith('/manager') &&
      role !== 'MANAGER') {
    return navigateTo('/')
  }

  if (to.path.startsWith('/pegawai') &&
      role !== 'PEGAWAI') {
    return navigateTo('/')
  }

})
