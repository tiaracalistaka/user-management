import { auth } from "../auth/auth"
import { prisma } from "../utils/prisma"
import { Role } from "@prisma/client"

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

  if (!currentUser) {
    throw createError({ statusCode: 404 })
  }

  /* RBAC FILTER */

  let rolesToShow: Role[] = []

  if (currentUser.role === "SUPERADMIN") {
    rolesToShow = [
      Role.SUPERADMIN,
      Role.MANAGER,
      Role.PEGAWAI,
    ]
  }

  if (currentUser.role === "MANAGER") {
    rolesToShow = [
      Role.MANAGER,
      Role.PEGAWAI,
    ]
  }

  if (currentUser.role === "PEGAWAI") {
    rolesToShow = [Role.PEGAWAI]
  }

  /* QUERY USERS */

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
    },
    orderBy: {
      role: "asc",
    },
  })

  return users
})
