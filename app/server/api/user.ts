import { PrismaClient } from "@prisma/client"
import { auth } from "~/server/auth/auth"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  // AMBIL SESSION
  const session = await auth.api.getSession({
    headers: event.headers
  })

  if (!session) {
    throw createError({ statusCode: 401 })
  }

  const role = session.user.role

  if (role === 'SUPERADMIN') {
    return prisma.user.findMany()
  }

  if (role === 'MANAGER') {
    return prisma.user.findMany({
      where: { role: 'PEGAWAI' }
    })
  }

  return prisma.user.findMany({
    where: { id: session.user.id }
  })
})
