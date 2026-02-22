import { prisma } from "../../utils/prisma"
import { auth } from "../../auth/auth"
import { Role } from "@prisma/client"

export default defineEventHandler(async (event) => {
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
    where: {
      id: session.user.id,
    },
    select: {
      role: true,
    },
  })

  if (!currentUser?.role) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })
  }

  const roleHierarchy: Record<Role, Role[]> = {
    SUPERADMIN: ["SUPERADMIN", "MANAGER", "PEGAWAI"],
    MANAGER: ["MANAGER", "PEGAWAI"],
    PEGAWAI: ["PEGAWAI"],
  }

  const rolesToShow = roleHierarchy[currentUser.role]

  const users = await prisma.user.findMany({
    where: {
      role: {
        in: rolesToShow,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return {
    data: users,
  }
})
