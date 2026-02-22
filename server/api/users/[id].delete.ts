import { prisma } from "../../utils/prisma"
import { requireSuperadmin } from "../../utils/authorization"
import { validateUserIdParam } from "../../utils/user-validation"

export default defineEventHandler(async (event) => {
  const currentUser = await requireSuperadmin(event)
  const id = validateUserIdParam(event.context.params?.id)

  if (currentUser.id === id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Tidak bisa menghapus akun sendiri",
    })
  }

  await prisma.user.delete({
    where: { id },
  })

  return {
    message: "User berhasil dihapus",
  }
})
