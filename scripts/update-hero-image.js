const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.homepageSettings.upsert({
    where: { id: "default" },
    update: {
      heroImage: "/ck-hair/hero-model.jpg",
    },
    create: {
      id: "default",
      heroImage: "/ck-hair/hero-model.jpg",
    },
  });
  console.log("Successfully updated homepageSettings heroImage to:", result.heroImage);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
