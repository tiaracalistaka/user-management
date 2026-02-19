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

  const body = await readBody(event)
  const { name, role } = body

  if (!name || !role) {
    throw createError({
      statusCode: 400,
      statusMessage: "Data tidak lengkap",
    })
  }

  const updatedUser =
    await prisma.user.update({
      where: { id },
      data: {
        name,
        role,
      },
    })

  return {
    message: "User berhasil diupdate",
    user: updatedUser,
  }
})
