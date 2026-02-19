import { auth } from "../../auth/auth"
import { prisma } from "../../utils/prisma"

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })
  }

  const body = await readBody(event)

  const { name } = body

  if (!name || name.trim() === "") {
    throw createError({
      statusCode: 400,
      statusMessage: "Nama wajib diisi",
    })
  }


  const updatedUser =
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true,
      },
    })

  return {
    message: "Nama berhasil diupdate",
    user: updatedUser,
  }
})
