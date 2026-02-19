import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

/* Connection string */
const connectionString =
  process.env.DATABASE_URL as string

/* Prisma adapter (optional, kalau pakai pg adapter) */
const adapter =
  new PrismaPg({ connectionString })

/* Singleton Prisma Client */
const globalForPrisma =
  globalThis as unknown as {
    prisma: PrismaClient
  }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
