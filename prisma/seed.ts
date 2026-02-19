import "dotenv/config"
import { auth } from "../server/auth/auth" 
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  const users = [
    { email: "admin@mail.com", name: "Admin" },
    { email: "manager@mail.com", name: "Manager" },
    { email: "pegawai@mail.com", name: "Pegawai" },
    { email: "tiara@mail.com", name: "Tiara" },
    { email: "calista@mail.com", name: "Calista" },
    { email: "kusuma@mail.com", name: "Kusuma" },
  ]
  for (const user of users) {
    await auth.api.signUpEmail({
      body: {
        email: user.email,
        password: "12345678",
        name: user.name,
      },
    })
  }
  console.log("Seed done")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())