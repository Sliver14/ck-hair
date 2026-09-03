const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Updating copywriting across all products, store settings, and homepage settings in Neon DB...");

  // 1. Update Homepage Settings
  await prisma.homepageSettings.upsert({
    where: { id: "default" },
    update: {
      heroTitle: "UNCOMPROMISED LUXURY.\nEFFORTLESS CONFIDENCE.",
      heroSubtitle: "Discover Nigeria's premier destination for couture Raw Human Hair, signature Anna Fiber Braiding & Wefts, and invisible HD Lace crafted for royalty.",
      heroImage: "/ck-hair/ck-hair-01.jpeg",
      primaryCtaText: "EXPLORE COLLECTION",
      primaryCtaLink: "/shop",
      secondaryCtaText: "PRE-ORDER EXCLUSIVES",
      secondaryCtaLink: "/preorder",
      announcementText: "COMPLIMENTARY NATIONWIDE EXPRESS DELIVERY ON ORDERS ABOVE ₦500,000 ✦ LAGOS • ABUJA • PORT HARCOURT • NATIONWIDE",
      announcementEnabled: true,
      editorialTitle: "THE CK HAIR PROMISE",
      editorialSubtitle: "Born in Lagos. Crafted for royalty. Hair that moves with natural grace, retains luminous sheen, and feels as luxurious as it looks.",
      editorialImage: "/ck-hair/ck-hair-04.jpeg",
    },
    create: {
      id: "default",
      heroTitle: "UNCOMPROMISED LUXURY.\nEFFORTLESS CONFIDENCE.",
      heroSubtitle: "Discover Nigeria's premier destination for couture Raw Human Hair, signature Anna Fiber Braiding & Wefts, and invisible HD Lace crafted for royalty.",
      heroImage: "/ck-hair/ck-hair-01.jpeg",
      primaryCtaText: "EXPLORE COLLECTION",
      primaryCtaLink: "/shop",
      secondaryCtaText: "PRE-ORDER EXCLUSIVES",
      secondaryCtaLink: "/preorder",
      announcementText: "COMPLIMENTARY NATIONWIDE EXPRESS DELIVERY ON ORDERS ABOVE ₦500,000 ✦ LAGOS • ABUJA • PORT HARCOURT • NATIONWIDE",
      announcementEnabled: true,
      editorialTitle: "THE CK HAIR PROMISE",
      editorialSubtitle: "Born in Lagos. Crafted for royalty. Hair that moves with natural grace, retains luminous sheen, and feels as luxurious as it looks.",
      editorialImage: "/ck-hair/ck-hair-04.jpeg",
    },
  });
  console.log("✓ Updated HomepageSettings copywriting");

  // 2. Update Store Settings
  await prisma.storeSettings.upsert({
    where: { id: "default" },
    update: {
      tagline: "Uncompromised Luxury. Effortless Confidence.",
      description: "Nigeria's premier atelier for 100% Raw Human Hair, signature Anna Fiber Braiding & Wefts, and invisible HD Skin-Melt Lace.",
    },
    create: {
      id: "default",
      tagline: "Uncompromised Luxury. Effortless Confidence.",
      description: "Nigeria's premier atelier for 100% Raw Human Hair, signature Anna Fiber Braiding & Wefts, and invisible HD Skin-Melt Lace.",
    },
  });
  console.log("✓ Updated StoreSettings copywriting");

  // 3. Update Categories
  await prisma.category.updateMany({
    where: { slug: "blend-premium-fiber-hair" },
    data: {
      description: "Ultra-silky, heat-resilient luxury fiber engineered for flawless knotless braids, goddess curls, wefts, and lightweight long-wear elegance.",
    },
  });

  await prisma.category.updateMany({
    where: { slug: "human-hair" },
    data: {
      description: "Single-donor raw unprocessed human hair bundles, invisible HD skin-melt lace wigs, and deep parting frontals that bleach to 613 blonde.",
    },
  });
  console.log("✓ Updated Categories copywriting");

  // 4. Update Product Descriptions
  const productsCopy = [
    {
      slug: "anna-bodywave",
      shortDescription: "Ultra-silky signature Anna Bodywave with rich S-wave curves, natural movement, and radiant sheen.",
      description: "Indulge in our iconic Anna Bodywave — a masterclass in modern hair artistry. Designed with deep, lustrous S-wave curves that cascade effortlessly down your shoulders, this signature texture delivers high-volume bounce with zero stiffness. Engineered for thermal versatility, heat-styling, and all-day humidity resilience. Whether installed as seamless weft bundles or styled into a custom closure wig, Anna Bodywave holds its luxurious body from morning meetings to evening galas.",
    },
    {
      slug: "anna-bodywave-braiding-hair",
      shortDescription: "Signature Anna Bodywave bulk hair crafted for featherlight knotless, goddess, and boho braids.",
      description: "The undisputed gold standard for luxury braiding in Nigeria. Our bulk loose Anna Bodywave is meticulously formulated for knotless braids, goddess braids, boho feed-ins, and cornrow styles. Lightweight, ultra-soft to the touch, and tangle-resistant, it feeds into your natural hair effortlessly with zero drag or scalp tension. Retains luscious curl definition through weeks of wear and tropical humidity.",
    },
    {
      slug: "anna-bodywave-weft-hair",
      shortDescription: "Double machine-wefted bundles with reinforced stitching for seamless sew-ins and ponytails.",
      description: "Experience unmatched fullness from root to tip. Our Anna Bodywave Weft Hair features precision double-drawn machine wefting that lays completely flat against the scalp. Reinforced multi-thread stitching prevents shedding and tangling, making it the ideal choice for long-lasting sew-ins, quick weaves, clip-ins, and high-glam wrap ponytails with voluminous movement.",
    },
    {
      slug: "anna-straight",
      shortDescription: "Glass-sheen bone straight hair tailored for sleek, head-turning elegance and fluid drape.",
      description: "Couture sophistication at its finest. Anna Straight delivers a mirror-like glass sheen and ultra-fluid drape that stays bone straight even in tropical humidity. Incredibly silky with zero flyaways or frizz, it moves like liquid silk with every step. Perfect for sleek center parts, blunt bobs, and flowing lengths up to 32 inches.",
    },
    {
      slug: "anna-straight-braids",
      shortDescription: "Ultra-fluid straight braiding fiber tailored for clean knotless braids and sleek ponytails.",
      description: "Created specifically for modern protective styling. Anna Straight Braiding Fiber delivers crisp, razor-clean parting and lightweight feed-in flow for knotless braids, straight feed-ins, and sleek braided ponytails. Features softly feathered ends for a natural finish that dips smoothly in hot water without unraveling.",
    },
    {
      slug: "anna-straight-weft",
      shortDescription: "Double-drawn bone straight wefts with reinforced stitching for flat, undetectable sew-ins.",
      description: "Engineered for the discerning woman who demands sleek perfection. Anna Straight Weft Bundles offer maximum root-to-tip thickness with a flat, pliable weft that disappears under any install. Highly heat-tolerant for flat irons and thermal styling, providing a salon-fresh bone straight finish day after day.",
    },
    {
      slug: "anna-natural-curl",
      shortDescription: "Defined high-bounce natural curl texture with effortless volume and radiant moisture retention.",
      description: "Embrace bold, luscious texture. Anna Natural Curl captures the beauty of defined, juicy ringlets with extraordinary bounce and natural sheen. Specially formulated to resist frizz in Nigerian weather while remaining soft and touchable. Perfect for bohemian braids, curly sew-in weaves, and high-impact half-up half-down styles.",
    },
    {
      slug: "ariel-hair",
      shortDescription: "Cascading mermaid deep wave texture with luscious fullness and high humidity resistance.",
      description: "Channel your inner siren with Ariel Hair — a breathtaking deep mermaid wave pattern that delivers unmatched texture, fullness, and goddess-tier glamour. Features rich, uniform wave ripples that hold their bounce wet or dry. Ideal for vacation curls, vacation braids, and show-stopping full installs.",
    },
    {
      slug: "french-curl",
      shortDescription: "Silky spiral curls engineered for iconic French curl braiding styles and bouncy ends.",
      description: "The trending phenomenon perfected. Our French Curl fiber features ultra-silky lengths that transition into bouncy, romantic spiral tips. Specially calibrated so the curly ends remain buoyant, soft, and tangle-free for weeks. Ideal for knotless French curl braids, goddess braids, and glamorous weft installs.",
    },
    {
      slug: "100-raw-hair-bundles",
      shortDescription: "Single-donor raw unprocessed human hair with aligned cuticles. Bleaches effortlessly to 613 blonde.",
      description: "The pinnacle of human hair luxury. Ethically sourced from single donors in Vietnam and Burma, our 100% Raw Hair Bundles are completely unprocessed, chemical-free, and cuticle-aligned from root to end. Luxuriously thick, full to the tips, and naturally lustrous. Can be repeatedly colored, bleached to 613 platinum blonde, and custom-styled, lasting 3+ years with proper atelier care.",
    },
    {
      slug: "ck-luxury-hd-glueless-bodywave-wig",
      shortDescription: "Ready-to-wear 250% density 13x4 HD frontal wig in our signature body wave.",
      description: "Effortless luxury straight out of the box. Constructed with 250% density single-donor human hair and our melt-on-contact Swiss HD lace. Pre-bleached micro-knots, pre-plucked natural hairline with baby hairs, and an adjustable velvet comfort elastic band ensure a secure, glueless fit that looks like hair growing directly from your scalp.",
    },
    {
      slug: "hd-skin-melt-lace-frontal-13x6",
      shortDescription: "Deep parting 13x6 ultra-thin HD lace frontal for undetectable hairline installations.",
      description: "Achieve the ultimate invisible hairline. Our 13x6 HD Skin-Melt Frontal offers an extra-deep 6-inch parting space for full side parts, middle parts, and high ponytails. Hand-ventilated on ultra-thin Swiss HD lace with single knots along the hairline that melt invisibly into all African skin tones with zero demarcation.",
    },
  ];

  for (const item of productsCopy) {
    await prisma.product.updateMany({
      where: { slug: item.slug },
      data: {
        shortDescription: item.shortDescription,
        description: item.description,
      },
    });
    console.log(`✓ Updated copy for product: ${item.slug}`);
  }

  console.log("All website copywriting updated in Neon database successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
