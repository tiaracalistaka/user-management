import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { PrismaPg } from "@prisma/adapter-pg";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {

  const hash = await bcrypt.hash("123456", 10)

  await prisma.user.createMany({
    data: [
      {
        name: "Super Admin",
        email: "admin@mail.com",
        password: hash,
        role: "SUPERADMIN"
      },
      {
        name: "Manager",
        email: "manager@mail.com",
        password: hash,
        role: "MANAGER"
      },
      {
        name: "Pegawai",
        email: "pegawai@mail.com",
        password: hash,
        role: "PEGAWAI"
      }
    ]
  })
}

main()
