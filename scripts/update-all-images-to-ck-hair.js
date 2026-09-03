const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Updating all product, category, and section images to /ck-hair/ in Neon DB...");

  // 1. Update Homepage Settings
  await prisma.homepageSettings.upsert({
    where: { id: "default" },
    update: {
      heroImage: "/ck-hair/ck-hair-01.jpeg",
      editorialImage: "/ck-hair/ck-hair-04.jpeg",
    },
    create: {
      id: "default",
      heroImage: "/ck-hair/ck-hair-01.jpeg",
      editorialImage: "/ck-hair/ck-hair-04.jpeg",
    },
  });
  console.log("✓ Updated HomepageSettings");

  // 2. Update Categories
  await prisma.category.updateMany({
    where: { slug: "blend-premium-fiber-hair" },
    data: { image: "/ck-hair/ck-hair-02.jpeg" },
  });

  await prisma.category.updateMany({
    where: { slug: "human-hair" },
    data: { image: "/ck-hair/ck-hair-03.jpeg" },
  });
  console.log("✓ Updated Categories");

  // 3. Update Products & Product Images
  const productImagesMap = [
    { slug: "anna-bodywave", images: ["/ck-hair/ck-hair-01.jpeg", "/ck-hair/ck-hair-06.jpeg"] },
    { slug: "anna-bodywave-braiding-hair", images: ["/ck-hair/ck-hair-02.jpeg", "/ck-hair/ck-hair-07.jpeg"] },
    { slug: "anna-bodywave-weft-hair", images: ["/ck-hair/ck-hair-03.jpeg", "/ck-hair/ck-hair-08.jpeg"] },
    { slug: "anna-straight", images: ["/ck-hair/ck-hair-04.jpeg", "/ck-hair/ck-hair-09.jpeg"] },
    { slug: "anna-straight-braids", images: ["/ck-hair/ck-hair-05.jpeg", "/ck-hair/ck-hair-10.jpeg"] },
    { slug: "anna-straight-weft", images: ["/ck-hair/ck-hair-06.jpeg", "/ck-hair/ck-hair-11.jpeg"] },
    { slug: "anna-natural-curl", images: ["/ck-hair/ck-hair-07.jpeg", "/ck-hair/ck-hair-12.jpeg"] },
    { slug: "ariel-hair", images: ["/ck-hair/ck-hair-08.jpeg", "/ck-hair/ck-hair-13.jpeg"] },
    { slug: "french-curl", images: ["/ck-hair/ck-hair-09.jpeg", "/ck-hair/ck-hair-14.jpeg"] },
    { slug: "100-raw-hair-bundles", images: ["/ck-hair/ck-hair-10.jpeg", "/ck-hair/ck-hair-15.jpeg"] },
    { slug: "ck-luxury-hd-glueless-bodywave-wig", images: ["/ck-hair/ck-hair-11.jpeg", "/ck-hair/ck-hair-16.jpeg"] },
    { slug: "hd-skin-melt-lace-frontal-13x6", images: ["/ck-hair/ck-hair-12.jpeg", "/ck-hair/ck-hair-17.jpeg"] },
  ];

  for (const item of productImagesMap) {
    const product = await prisma.product.findUnique({ where: { slug: item.slug } });
    if (product) {
      // Delete old product images
      await prisma.productImage.deleteMany({ where: { productId: product.id } });

      // Add new images
      for (let i = 0; i < item.images.length; i++) {
        await prisma.productImage.create({
          data: {
            productId: product.id,
            url: item.images[i],
            order: i,
            isPrimary: i === 0,
          },
        });
      }
      console.log(`✓ Updated images for product: ${item.slug}`);
    }
  }

  console.log("All database images updated to CK Hair local assets successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
