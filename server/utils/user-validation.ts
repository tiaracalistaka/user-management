const ALLOWED_ROLES = [
  "SUPERADMIN",
  "MANAGER",
  "PEGAWAI",
] as const

type Role = (typeof ALLOWED_ROLES)[number]

type CreateUserInput = {
  name: string
  email: string
  password: string
  role: Role
}

type UpdateUserInput = {
  name?: string
  role?: Role
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

const normalizeString = (value: unknown) => {
  if (typeof value !== "string") return ""
  return value.trim()
}

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const isValidUserId = (value: string) => {
  const normalized = value.trim()

  if (normalized.length < 8 || normalized.length > 128) {
    return false
  }

  return /^[a-zA-Z0-9_-]+$/.test(normalized)
}

const parseRole = (value: unknown): Role | null => {
  if (typeof value !== "string") return null
  const normalized = value.trim().toUpperCase()
  if (!ALLOWED_ROLES.includes(normalized as Role)) return null
  return normalized as Role
}

export const validateUserIdParam = (value: unknown) => {
  if (typeof value !== "string" || !isValidUserId(value)) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID user tidak valid",
    })
  }

  return value
}

export const validateCreateUserPayload = (payload: unknown): CreateUserInput => {
  if (!isObject(payload)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Payload tidak valid",
    })
  }

  const name = normalizeString(payload.name)
  const email = normalizeString(payload.email).toLowerCase()
  const password = normalizeString(payload.password)
  const role = parseRole(payload.role)

  if (name.length < 3 || name.length > 100) {
    throw createError({
      statusCode: 400,
      statusMessage: "Nama harus 3-100 karakter",
    })
  }

  if (!isValidEmail(email) || email.length > 200) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email tidak valid",
    })
  }

  if (password.length < 8 || password.length > 72) {
    throw createError({
      statusCode: 400,
      statusMessage: "Password harus 8-72 karakter",
    })
  }

  if (!role) {
    throw createError({
      statusCode: 400,
      statusMessage: "Role tidak valid",
    })
  }

  return {
    name,
    email,
    password,
    role,
  }
}

export const validateUpdateUserPayload = (payload: unknown): UpdateUserInput => {
  if (!isObject(payload)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Payload tidak valid",
    })
  }

  const maybeName = normalizeString(payload.name)
  const role = parseRole(payload.role)

  const hasName = typeof payload.name === "string"
  const hasRole = typeof payload.role !== "undefined"

  if (!hasName && !hasRole) {
    throw createError({
      statusCode: 400,
      statusMessage: "Tidak ada data yang diupdate",
    })
  }

  const output: UpdateUserInput = {}

  if (hasName) {
    if (maybeName.length < 3 || maybeName.length > 100) {
      throw createError({
        statusCode: 400,
        statusMessage: "Nama harus 3-100 karakter",
      })
    }

    output.name = maybeName
  }

  if (hasRole) {
    if (!role) {
      throw createError({
        statusCode: 400,
        statusMessage: "Role tidak valid",
      })
    }

    output.role = role
  }

  return output
}
