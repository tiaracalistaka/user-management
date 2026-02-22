import { auth } from "../../auth/auth"
import { prisma } from "../../utils/prisma"
import { requireSuperadmin } from "../../utils/authorization"
import { validateCreateUserPayload } from "../../utils/user-validation"

export default defineEventHandler(async (event) => {
  await requireSuperadmin(event)

  const body = await readBody(event)
  const payload = validateCreateUserPayload(body)

  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
    select: { id: true },
  })

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "Email sudah terdaftar",
    })
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email: payload.email,
        password: payload.password,
        name: payload.name,
      },
    })
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: "Gagal membuat akun user",
    })
  }

  const createdUser = await prisma.user.update({
    where: { email: payload.email },
    data: { role: payload.role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  return {
    message: "User berhasil dibuat",
    data: createdUser,
  }
})
