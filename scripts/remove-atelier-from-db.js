const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Removing 'Atelier' from all Neon DB records...");

  // 1. StoreSettings
  await prisma.storeSettings.updateMany({
    data: {
      address: "Online Boutique • Nationwide Delivery Across Nigeria",
      description: "Nigeria's premier destination for 100% Raw Human Hair, signature Anna Fiber Braiding & Wefts, and invisible HD Skin-Melt Lace.",
    },
  });
  console.log("✓ Updated StoreSettings");

  // 2. HomepageSettings
  await prisma.homepageSettings.updateMany({
    data: {
      heroSubtitle: "Discover Nigeria's premier destination for couture Raw Human Hair, signature Anna Fiber Braiding & Wefts, and invisible HD Lace crafted for royalty.",
    },
  });
  console.log("✓ Updated HomepageSettings");

  // 3. Products
  const products = await prisma.product.findMany();
  for (const prod of products) {
    let updated = false;
    let desc = prod.description;
    let shortDesc = prod.shortDescription || "";

    if (desc && desc.includes("atelier")) {
      desc = desc.replace(/atelier/gi, "collection");
      updated = true;
    }
    if (shortDesc && shortDesc.includes("atelier")) {
      shortDesc = shortDesc.replace(/atelier/gi, "collection");
      updated = true;
    }

    if (updated) {
      await prisma.product.update({
        where: { id: prod.id },
        data: {
          description: desc,
          shortDescription: shortDesc,
        },
      });
      console.log(`✓ Updated product copy: ${prod.slug}`);
    }
  }

  console.log("All DB records cleaned of 'Atelier' successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
