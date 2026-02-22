import { auth } from "../auth/auth"
import { prisma } from "./prisma"

export const requireSuperadmin = async (event: any) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      role: true,
    },
  })

  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })
  }

  if (currentUser.role !== "SUPERADMIN") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    })
  }

  return currentUser
}
