import { auth } from "../auth/auth"
import { prisma } from "../utils/prisma"

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session) {
    throw createError({ statusCode: 401 })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      role: true,
      name: true,
      email: true,
    },
  })

  return user
})
