import { prisma } from "../../utils/prisma"
import { requireSuperadmin } from "../../utils/authorization"
import {
  validateUpdateUserPayload,
  validateUserIdParam,
} from "../../utils/user-validation"

export default defineEventHandler(async (event) => {
  const currentUser = await requireSuperadmin(event)
  const id = validateUserIdParam(event.context.params?.id)
  const body = await readBody(event)
  const payload = validateUpdateUserPayload(body)

  if (currentUser.id === id && payload.role && payload.role !== "SUPERADMIN") {
    throw createError({
      statusCode: 400,
      statusMessage: "Tidak bisa menurunkan role akun sendiri",
    })
  }

  const updatedUser =
    await prisma.user.update({
      where: { id },
      data: payload,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

  return {
    message: "User berhasil diperbarui",
    data: updatedUser,
  }
})
