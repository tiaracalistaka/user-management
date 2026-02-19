import { auth } from "../auth/auth"
import { prisma } from "../utils/prisma"

export default defineEventHandler(async (event) => {

  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session) {
    throw createError({ statusCode: 401 })
  }

  const currentUser =
    await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    })

  if (currentUser?.role !== "SUPERADMIN") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    })
  }

  const id = event.context.params?.id

  if (!id) {
    throw createError({ statusCode: 400 })
  }

  await prisma.user.delete({
    where: { id },
  })

  return {
    message: "User berhasil dihapus",
  }
})
