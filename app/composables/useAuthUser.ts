type AuthRole =
  | 'SUPERADMIN'
  | 'MANAGER'
  | 'PEGAWAI'

type AuthUser = {
  name: string
  email: string
  role: AuthRole
}

const VALID_ROLES: AuthRole[] = [
  'SUPERADMIN',
  'MANAGER',
  'PEGAWAI',
]

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const isValidRole = (role: unknown): role is AuthRole => {
  return typeof role === 'string' && VALID_ROLES.includes(role as AuthRole)
}

const isValidAuthUser = (value: unknown): value is AuthUser => {
  if (!isObject(value)) return false

  return (
    typeof value.name === 'string' &&
    typeof value.email === 'string' &&
    isValidRole(value.role)
  )
}

export const useAuthUser = () => {
  const authUser = useState<AuthUser | null>('auth-user', () => null)

  const clearAuthUser = () => {
    authUser.value = null
  }

  const fetchAuthUser = async () => {
    const user = await $fetch('/api/getRole', {
      headers: import.meta.server
        ? useRequestHeaders(['cookie'])
        : undefined,
    })
      .catch(() => null)

    if (!isValidAuthUser(user)) {
      clearAuthUser()
      return null
    }

    authUser.value = user
    return user
  }

  const getAuthUser = async () => {
    if (isValidAuthUser(authUser.value)) {
      return authUser.value
    }

    return await fetchAuthUser()
  }

  return {
    authUser,
    getAuthUser,
    clearAuthUser,
  }
}
