import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Optional: clear any existing data
  await prisma.task.deleteMany()

  console.log("🌱 Seeding database with sample tasks...")

  await prisma.task.createMany({
    data: [
      { title: "Buy groceries" },
      { title: "Finish Prisma setup" },
      { title: "Write TypeScript seed script" },
      { title: "Test CRUD endpoints", completed: true },
    ],
  })

  console.log("✅ Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
