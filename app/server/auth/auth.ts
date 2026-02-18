import { betterAuth } from "better-auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export const auth = betterAuth({
  database: prisma,

  emailAndPassword: {
    enabled: true
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "PEGAWAI"
      }
    }
  },

  secret: process.env.AUTH_SECRET
})
