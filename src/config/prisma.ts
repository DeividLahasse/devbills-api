import 'dotenv/config'
import { PrismaClient } from '@generated/prisma'

const prisma = new PrismaClient()

export const prismaConnect = async () => {
  try {
    await prisma.$connect()
    console.log("✅ DB conectado com sucesso!")
  } catch (_err) {
    console.log("❌ falha ao conectar o DB")
  }
}

export default prisma
