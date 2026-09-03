import { prisma } from "../lib/prisma";

async function updateImages() {
  console.log("Updating category and philosophy images in database...");

  // 1. Update Blend / Premium Fiber Hair Category
  await prisma.category.updateMany({
    where: { slug: "blend-premium-fiber-hair" },
    data: {
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=1200&q=85",
    },
  });

  // 2. Update Human Hair Category
  await prisma.category.updateMany({
    where: { slug: "human-hair" },
    data: {
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=85",
    },
  });

  // 3. Update Homepage Editorial / Philosophy Settings
  await prisma.homepageSettings.upsert({
    where: { id: "default" },
    update: {
      editorialImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85",
    },
    create: {
      id: "default",
      editorialImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85",
    },
  });

  console.log("Database images updated successfully!");
}

updateImages()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
