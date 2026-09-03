const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Updating address in StoreSettings in Neon DB...");

  await prisma.storeSettings.upsert({
    where: { id: "default" },
    update: {
      address: "Online Atelier • Nationwide Delivery Across Nigeria",
    },
    create: {
      id: "default",
      storeName: "CK HAIR",
      tagline: "Uncompromised Luxury. Effortless Confidence.",
      description: "Nigeria's premier online atelier for 100% Raw Human Hair, signature Anna Fiber Braiding & Wefts, and invisible HD Skin-Melt Lace.",
      email: "ckhair.ng@gmail.com",
      phone: "+234 902 655 5783",
      whatsapp: "2349026555783",
      address: "Online Atelier • Nationwide Delivery Across Nigeria",
      instagram: "https://instagram.com/CK_Hair.Ng",
      tiktok: "https://tiktok.com/@ck.hair0",
      facebook: "https://facebook.com/ckhair",
    },
  });

  console.log("✓ Updated StoreSettings address to online-only boutique.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
