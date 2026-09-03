import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CK Hair database...");

  // 1. Store Settings
  await prisma.storeSettings.upsert({
    where: { id: "default" },
    update: {
      email: "ckhair.ng@gmail.com",
      phone: "+234 902 655 5783",
      whatsapp: "2349026555783",
      instagram: "https://instagram.com/CK_Hair.Ng",
      tiktok: "https://tiktok.com/@ck.hair0",
      address: "Online Boutique • Nationwide Delivery Across Nigeria",
    },
    create: {
      id: "default",
      storeName: "CK Hair",
      tagline: "Luxury Hair. Effortless Confidence.",
      description: "Premium 100% human and raw hair crafted to elevate your everyday beauty with effortless sophistication.",
      email: "ckhair.ng@gmail.com",
      phone: "+234 902 655 5783",
      whatsapp: "2349026555783",
      address: "Online Boutique • Nationwide Delivery Across Nigeria",
      instagram: "https://instagram.com/CK_Hair.Ng",
      tiktok: "https://tiktok.com/@ck.hair0",
      facebook: "https://facebook.com/ckhair",
      currency: "NGN",
      currencySymbol: "₦",
      defaultDeliveryFee: 5000,
      freeDeliveryThreshold: 500000,
      storeStatus: "ONLINE",
      maintenanceMessage: "CK Hair is currently preparing something beautiful. Please check back shortly.",
    },
  });

  // 2. Payment Settings
  await prisma.paymentSettings.upsert({
    where: { id: "default" },
    update: {
      whatsappNumber: "2349026555783",
    },
    create: {
      id: "default",
      bankName: "Guaranty Trust Bank (GTBank)",
      accountName: "CK Hair Luxury Global Ltd",
      accountNumber: "0123456789",
      paymentInstructions: "Please make your direct bank transfer to the account details above. Once paid, click the WhatsApp button to send your payment receipt/screenshot and order confirmation.",
      whatsappNumber: "2349026555783",
    },
  });

  // 3. Homepage Settings
  await prisma.homepageSettings.upsert({
    where: { id: "default" },
    update: {
      heroTitle: "LUXURY HAIR.\nEFFORTLESS CONFIDENCE.",
      heroSubtitle: "Premium raw human hair and signature blend fiber hair crafted for natural bounce, fluid movement, and timeless elegance.",
      heroImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1600&q=85",
      primaryCtaText: "SHOP ALL HAIR",
      primaryCtaLink: "/shop",
      secondaryCtaText: "PRE-ORDER",
      secondaryCtaLink: "/preorder",
    },
    create: {
      id: "default",
      heroTitle: "LUXURY HAIR.\nEFFORTLESS CONFIDENCE.",
      heroSubtitle: "Premium raw human hair and signature blend fiber hair crafted for natural bounce, fluid movement, and timeless elegance.",
      heroImage: "/ck-hair/ck-hair-01.jpeg",
      primaryCtaText: "SHOP ALL HAIR",
      primaryCtaLink: "/shop",
      secondaryCtaText: "PRE-ORDER",
      secondaryCtaLink: "/preorder",
      announcementText: "COMPLIMENTARY NATIONWIDE DELIVERY ON ORDERS ABOVE ₦500,000",
      announcementEnabled: true,
      editorialTitle: "THE CK HAIR EXPERIENCE",
      editorialSubtitle: "Hair that moves with grace, radiates natural sheen, and feels as luxurious as it looks.",
      editorialImage: "/ck-hair/ck-hair-04.jpeg",
    },
  });

  // 4. Admin User (Password: ChangeMe123!)
  const hashedPassword = await bcrypt.hash("ChangeMe123!", 10);
  await prisma.admin.upsert({
    where: { email: "admin@ckhair.com" },
    update: { password: hashedPassword },
    create: {
      email: "admin@ckhair.com",
      name: "CK Hair Admin",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  // 5. Categories (Only 2 Top-Level Categories)
  // Delete all existing categories to ensure only these 2 exist
  await prisma.productVariant.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  const categoriesData = [
    {
      name: "Blend / Premium Fiber Hair",
      slug: "blend-premium-fiber-hair",
      description: "Luxurious heat-resistant premium fiber hair crafted for natural movement, versatile braiding, weft installs, and long-lasting luster.",
      image: "/ck-hair/ck-hair-02.jpeg",
      featured: true,
      order: 1,
    },
    {
      name: "Human Hair",
      slug: "human-hair",
      description: "100% Raw and Virgin human hair bundles, HD lace wigs, and skin-melt invisible frontals.",
      image: "/ck-hair/ck-hair-03.jpeg",
      featured: true,
      order: 2,
    },
  ];

  const categoryMap = new Map<string, string>();
  for (const cat of categoriesData) {
    const created = await prisma.category.create({
      data: cat,
    });
    categoryMap.set(cat.slug, created.id);
  }

  // 6. Products
  const productsData = [
    // 1. Anna Bodywave
    {
      name: "Anna Bodywave",
      slug: "anna-bodywave",
      description: "Our signature luxury Anna Bodywave offers timeless, lustrous S-wave curls. Engineered for superior heat styling, tangle-free longevity, and high-volume glamour.",
      shortDescription: "Ultra-silky signature Anna Bodywave with natural luster and bounce.",
      price: 185000,
      compareAtPrice: 210000,
      sku: "CK-ABW-001",
      categorySlug: "blend-premium-fiber-hair",
      stock: 8,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Blend / Premium Fiber",
      texture: "Body Wave",
      formats: JSON.stringify(["Braiding Hair", "Weft"]),
      lengths: JSON.stringify(['18"', '20"', '22"', '24"', '26"', '28"', '30"']),
      colors: JSON.stringify(["Natural Black", "Jet Black", "Chestnut Brown (#4)", "Honey Blonde (#27)"]),
      featured: true,
      bestseller: true,
      isNew: false,
      images: [
        "/ck-hair/ck-hair-01.jpeg",
        "/ck-hair/ck-hair-06.jpeg",
      ],
    },
    // 2. Anna Bodywave (braiding) hair
    {
      name: "Anna Bodywave (Braiding) Hair",
      slug: "anna-bodywave-braiding-hair",
      description: "Bulk loose Anna Bodywave engineered specifically for knotless braids, goddess braids, boho braids, and cornrow styles. Lightweight, silky, and easy to feed without tangling.",
      shortDescription: "Signature Anna Bodywave bulk hair crafted for knotless & goddess braids.",
      price: 175000,
      compareAtPrice: 195000,
      sku: "CK-ABW-BR-002",
      categorySlug: "blend-premium-fiber-hair",
      stock: 12,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Blend / Premium Fiber",
      texture: "Body Wave",
      formats: JSON.stringify(["Bulk Braiding Hair"]),
      lengths: JSON.stringify(['20"', '22"', '24"', '26"', '28"', '30"']),
      colors: JSON.stringify(["Natural Black", "Dark Auburn (#33)", "Honey Blonde (#27)", "1B/30 Ombre"]),
      featured: true,
      bestseller: true,
      isNew: true,
      images: [
        "/ck-hair/ck-hair-02.jpeg",
        "/ck-hair/ck-hair-07.jpeg",
      ],
    },
    // 3. Anna Bodywave (weft) hair
    {
      name: "Anna Bodywave (Weft) Hair",
      slug: "anna-bodywave-weft-hair",
      description: "Double machine-wefted Anna Bodywave hair bundles. Reinforced stitching prevents shedding, allowing seamless sew-ins, quick weaves, and ponytail installs.",
      shortDescription: "Double-drawn weft bundles with rich S-wave body and movement.",
      price: 185000,
      compareAtPrice: 210000,
      sku: "CK-ABW-WF-003",
      categorySlug: "blend-premium-fiber-hair",
      stock: 10,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Blend / Premium Fiber",
      texture: "Body Wave",
      formats: JSON.stringify(["Weft Bundles"]),
      lengths: JSON.stringify(['18"', '20"', '22"', '24"', '26"', '28"', '30"']),
      colors: JSON.stringify(["Natural Black", "Jet Black", "Chestnut Brown (#4)"]),
      featured: false,
      bestseller: false,
      isNew: false,
      images: [
        "/ck-hair/ck-hair-03.jpeg",
        "/ck-hair/ck-hair-08.jpeg",
      ],
    },
    // 4. Anna Straight
    {
      name: "Anna Straight",
      slug: "anna-straight",
      description: "Ultra-sleek bone straight hair with glass-like luster and fluid drape. Tangle-free, heat-resilient, and effortlessly chic.",
      shortDescription: "Glass-sheen bone straight hair tailored for sleek styling.",
      price: 190000,
      compareAtPrice: 215000,
      sku: "CK-AST-004",
      categorySlug: "blend-premium-fiber-hair",
      stock: 14,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Blend / Premium Fiber",
      texture: "Bone Straight",
      formats: JSON.stringify(["Braids", "Weft"]),
      lengths: JSON.stringify(['18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"']),
      colors: JSON.stringify(["Natural Black", "Jet Black", "Piano Highlight 1B/27"]),
      featured: true,
      bestseller: true,
      isNew: false,
      images: [
        "/ck-hair/ck-hair-04.jpeg",
        "/ck-hair/ck-hair-09.jpeg",
      ],
    },
    // 5. Anna Straight (braids)
    {
      name: "Anna Straight (Braids)",
      slug: "anna-straight-braids",
      description: "Specialized straight braiding fiber tailored for ultra-clean feed-in braids, knotless braids, and sleek straight ponytails with natural feathered ends.",
      shortDescription: "Ultra-fluid straight braiding fiber for clean knotless braids.",
      price: 170000,
      compareAtPrice: 190000,
      sku: "CK-AST-BR-005",
      categorySlug: "blend-premium-fiber-hair",
      stock: 15,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Blend / Premium Fiber",
      texture: "Bone Straight",
      formats: JSON.stringify(["Braiding Fiber"]),
      lengths: JSON.stringify(['22"', '24"', '26"', '28"', '30"', '32"']),
      colors: JSON.stringify(["Natural Black", "Jet Black", "Burgundy (99J)", "Ginger"]),
      featured: false,
      bestseller: true,
      isNew: true,
      images: [
        "/ck-hair/ck-hair-05.jpeg",
        "/ck-hair/ck-hair-10.jpeg",
      ],
    },
    // 6. Anna Straight (weft)
    {
      name: "Anna Straight (Weft)",
      slug: "anna-straight-weft",
      description: "Silky bone-straight double wefts that lay completely flat against the scalp. Zero flyaways, full ends, and high heat tolerance.",
      shortDescription: "Silky bone-straight double weft bundles for sleek sew-ins.",
      price: 195000,
      compareAtPrice: 220000,
      sku: "CK-AST-WF-006",
      categorySlug: "blend-premium-fiber-hair",
      stock: 9,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Blend / Premium Fiber",
      texture: "Bone Straight",
      formats: JSON.stringify(["Weft Bundles"]),
      lengths: JSON.stringify(['18"', '20"', '22"', '24"', '26"', '28"', '30"']),
      colors: JSON.stringify(["Natural Black", "Jet Black"]),
      featured: false,
      bestseller: false,
      isNew: false,
      images: [
        "/ck-hair/ck-hair-06.jpeg",
        "/ck-hair/ck-hair-11.jpeg",
      ],
    },
    // 7. Anna Natural Curl
    {
      name: "Anna Natural Curl",
      slug: "anna-natural-curl",
      description: "Defined raw natural curl with high bounce, volume, and natural sheen. Perfect for boho braids, natural curl sew-ins, and half-up half-down styling.",
      shortDescription: "Defined high-volume natural curl texture with effortless bounce.",
      price: 210000,
      compareAtPrice: null,
      sku: "CK-ANC-007",
      categorySlug: "blend-premium-fiber-hair",
      stock: 6,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Blend / Premium Fiber",
      texture: "Natural Curl",
      formats: JSON.stringify(["Braiding Hair", "Weft"]),
      lengths: JSON.stringify(['16"', '18"', '20"', '22"', '24"', '26"']),
      colors: JSON.stringify(["Natural Black", "Dark Auburn (#33)"]),
      featured: true,
      bestseller: false,
      isNew: true,
      images: [
        "/ck-hair/ck-hair-07.jpeg",
        "/ck-hair/ck-hair-12.jpeg",
      ],
    },
    // 8. Ariel Hair
    {
      name: "Ariel Hair",
      slug: "ariel-hair",
      description: "Deep, luscious mermaid wave pattern offering supreme fullness and flowing length. Exceptional bounce and humidity resistance.",
      shortDescription: "Cascading mermaid deep wave texture with luscious fullness.",
      price: 225000,
      compareAtPrice: null,
      sku: "CK-ARL-008",
      categorySlug: "blend-premium-fiber-hair",
      stock: 10,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Blend / Premium Fiber",
      texture: "Ariel Deep Wave",
      formats: JSON.stringify(["Braiding Hair", "Weft"]),
      lengths: JSON.stringify(['20"', '22"', '24"', '26"', '28"', '30"']),
      colors: JSON.stringify(["Natural Black", "Copper Red", "Honey Blonde (#27)"]),
      featured: true,
      bestseller: true,
      isNew: false,
      images: [
        "/ck-hair/ck-hair-08.jpeg",
        "/ck-hair/ck-hair-13.jpeg",
      ],
    },
    // 9. French Curl
    {
      name: "French Curl",
      slug: "french-curl",
      description: "Silky, bouncy spiral curled tips engineered for knotless French curl braids, goddess braids, and glamorous wefted installs.",
      shortDescription: "Silky spiral curls engineered for iconic French curl braiding styles.",
      price: 175000,
      compareAtPrice: 195000,
      sku: "CK-FC-009",
      categorySlug: "blend-premium-fiber-hair",
      stock: 15,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Blend / Premium Fiber",
      texture: "French Curl Spiral",
      formats: JSON.stringify(["Braiding Hair", "Weft"]),
      lengths: JSON.stringify(['18"', '22"', '26"', '30"']),
      colors: JSON.stringify(["Natural Black", "Burgundy (99J)", "Ginger / Bronze", "1B/30 Ombre"]),
      featured: true,
      bestseller: true,
      isNew: false,
      images: [
        "/ck-hair/ck-hair-09.jpeg",
        "/ck-hair/ck-hair-14.jpeg",
      ],
    },
    // Human Hair - Raw Hair Bundles
    {
      name: "100% Raw Hair Bundles",
      slug: "100-raw-hair-bundles",
      description: "Single-donor unprocessed 100% Raw Vietnamese and Burmese human hair. Cuticles intact, thick from root to ends, dyes to 613 platinum blonde effortlessly.",
      shortDescription: "Single-donor raw unprocessed human hair with aligned cuticles.",
      price: 340000,
      compareAtPrice: 380000,
      sku: "CK-RAW-010",
      categorySlug: "human-hair",
      stock: 10,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "100% Raw Human Hair",
      texture: "Natural Wave",
      formats: JSON.stringify(["Weft (Bundles)"]),
      lengths: JSON.stringify(['20"', '22"', '24"', '26"', '28"', '30"', '32"']),
      colors: JSON.stringify(["Natural Dark Brown", "Raw Natural Black"]),
      featured: true,
      bestseller: true,
      isNew: false,
      images: [
        "/ck-hair/ck-hair-10.jpeg",
        "/ck-hair/ck-hair-15.jpeg",
      ],
    },
    // Human Hair - HD Glueless Wigs
    {
      name: "CK Luxury HD Glueless Bodywave Wig",
      slug: "ck-luxury-hd-glueless-bodywave-wig",
      description: "Custom constructed 13x4 frontal wig ready to wear straight out of the box. Pre-bleached knots, pre-plucked invisible hairline, and velvet grip band.",
      shortDescription: "Ready-to-wear 250% density HD frontal wig in our signature body wave.",
      price: 420000,
      compareAtPrice: 470000,
      sku: "CK-WIG-011",
      categorySlug: "human-hair",
      stock: 4,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "100% Human Hair",
      texture: "Body Wave",
      formats: JSON.stringify(["Ready-to-Wear Wig"]),
      lengths: JSON.stringify(['22"', '24"', '26"', '28"', '30"']),
      colors: JSON.stringify(["Natural Black", "Honey Blonde (#27)"]),
      featured: true,
      bestseller: true,
      isNew: false,
      images: [
        "/ck-hair/ck-hair-11.jpeg",
        "/ck-hair/ck-hair-16.jpeg",
      ],
    },
    // Human Hair - Frontals & Closures
    {
      name: "HD Skin-Melt Lace Frontal 13x6",
      slug: "hd-skin-melt-lace-frontal-13x6",
      description: "Extra deep 6-inch parting space allows for full side parts, middle parts, and half-up half-down updos with invisible melting.",
      shortDescription: "Deep parting 13x6 ultra-thin HD lace frontal.",
      price: 145000,
      compareAtPrice: null,
      sku: "CK-FR-012",
      categorySlug: "human-hair",
      stock: 12,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "100% Virgin Hair",
      texture: "Body Wave",
      formats: JSON.stringify(["Frontal 13x6"]),
      lengths: JSON.stringify(['16"', '18"', '20"']),
      colors: JSON.stringify(["Natural Black"]),
      featured: false,
      bestseller: false,
      isNew: false,
      images: [
        "/ck-hair/ck-hair-12.jpeg",
        "/ck-hair/ck-hair-17.jpeg",
      ],
    },
  ];

  for (const item of productsData) {
    const p = item as any;
    const catId = categoryMap.get(p.categorySlug);
    if (!catId) continue;

    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        shortDescription: p.shortDescription,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        sku: p.sku,
        categoryId: catId,
        stock: p.stock,
        status: p.status,
        availability: p.availability,
        hairType: p.hairType,
        texture: p.texture,
        formats: p.formats,
        lengths: p.lengths,
        colors: p.colors,
        featured: p.featured,
        bestseller: p.bestseller,
        isNew: p.isNew,
        preorderEnabled: p.preorderEnabled || false,
        preorderDuration: p.preorderDuration || "2–4 weeks",
        preorderLimit: p.preorderLimit || null,
      },
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        shortDescription: p.shortDescription,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        sku: p.sku,
        categoryId: catId,
        stock: p.stock,
        status: p.status,
        availability: p.availability,
        hairType: p.hairType,
        texture: p.texture,
        formats: p.formats,
        lengths: p.lengths,
        colors: p.colors,
        featured: p.featured,
        bestseller: p.bestseller,
        isNew: p.isNew,
        preorderEnabled: p.preorderEnabled || false,
        preorderDuration: p.preorderDuration || "2–4 weeks",
        preorderLimit: p.preorderLimit || null,
      },
    });

    if (p.images && p.images.length > 0) {
      await prisma.productImage.deleteMany({
        where: { productId: product.id },
      });

      for (let i = 0; i < p.images.length; i++) {
        await prisma.productImage.create({
          data: {
            productId: product.id,
            url: p.images[i],
            alt: `${product.name} Image ${i + 1}`,
            isPrimary: i === 0,
            order: i,
          },
        });
      }
    }

    // Create sample variants
    await prisma.productVariant.deleteMany({ where: { productId: product.id } });
    const lengths = p.lengths ? JSON.stringify(JSON.parse(p.lengths)) : '["20\\""]';
    const parsedLengths: string[] = JSON.parse(lengths);
    for (let idx = 0; idx < parsedLengths.length; idx++) {
      const len = parsedLengths[idx];
      const lengthAdjustment = idx * 15000;
      await prisma.productVariant.create({
        data: {
          productId: product.id,
          name: `${len} / Natural Black`,
          length: len,
          texture: p.texture,
          color: "Natural Black",
          price: p.price + lengthAdjustment,
          stock: p.availability === "PREORDER" ? 0 : 10,
        },
      });
    }
  }

  // 7. Customers
  const sampleCustomers = [
    { name: "Amaka Eze", email: "amaka.eze@example.com", phone: "+2348031234567", city: "Lekki", state: "Lagos" },
    { name: "Sarah Kalu", email: "sarah.k@example.com", phone: "+2348029876543", city: "Victoria Island", state: "Lagos" },
    { name: "Tolu Adeleke", email: "tolu.adeleke@example.com", phone: "+2348145556677", city: "Ikeja", state: "Lagos" },
    { name: "Chioma Okonjo", email: "chioma.o@example.com", phone: "+2348051112233", city: "Maitama", state: "Abuja" },
    { name: "Fatima Aliyu", email: "fatima.aliyu@example.com", phone: "+2348093334455", city: "Wuse 2", state: "Abuja" },
    { name: "Blessing Nnamdi", email: "blessing.n@example.com", phone: "+2348124445566", city: "Port Harcourt", state: "Rivers" },
    { name: "Zainab Bello", email: "zainab.b@example.com", phone: "+2348077778899", city: "Kano", state: "Kano" },
    { name: "Stephanie Briggs", email: "stephanie.b@example.com", phone: "+2348100001122", city: "GRA", state: "Port Harcourt" },
    { name: "Kemi Balogun", email: "kemi.balogun@example.com", phone: "+2348182223344", city: "Ikoyi", state: "Lagos" },
    { name: "Ngozi Obi", email: "ngozi.obi@example.com", phone: "+2348066667788", city: "Enugu", state: "Enugu" },
  ];

  const createdCustomers: any[] = [];
  for (const cust of sampleCustomers) {
    const c = await prisma.customer.upsert({
      where: { email: cust.email },
      update: cust,
      create: cust,
    });
    createdCustomers.push(c);
  }

  // 8. Orders with different statuses and pre-orders
  const dummyOrders = [
    {
      orderNumber: "CKH-20260825-101",
      customerIndex: 0,
      type: "REGULAR",
      status: "COMPLETED",
      paymentStatus: "PAYMENT_CONFIRMED",
      subtotal: 320000,
      deliveryFee: 5000,
      total: 325000,
      isPreorder: false,
      productSlug: "ck-luxury-body-wave-wig",
      variantName: '24" / Natural Black',
      unitPrice: 320000,
      qty: 1,
    },
    {
      orderNumber: "CKH-20260827-204",
      customerIndex: 1,
      type: "PREORDER",
      status: "PREORDER_PROCESSING",
      paymentStatus: "PAYMENT_CONFIRMED",
      subtotal: 380000,
      deliveryFee: 5000,
      total: 385000,
      isPreorder: true,
      preorderBatch: "BATCH-2026-09A",
      productSlug: "luxury-deep-curl-wig",
      variantName: '26" / Natural Black',
      unitPrice: 380000,
      qty: 1,
    },
    {
      orderNumber: "CKH-20260828-305",
      customerIndex: 2,
      type: "REGULAR",
      status: "PROCESSING",
      paymentStatus: "PAYMENT_CONFIRMED",
      subtotal: 200000,
      deliveryFee: 5000,
      total: 205000,
      isPreorder: false,
      productSlug: "luxury-bone-straight",
      variantName: '20" / Natural Black',
      unitPrice: 200000,
      qty: 1,
    },
    {
      orderNumber: "CKH-20260830-410",
      customerIndex: 3,
      type: "REGULAR",
      status: "AWAITING_PAYMENT",
      paymentStatus: "UNPAID",
      subtotal: 185000,
      deliveryFee: 5000,
      total: 190000,
      isPreorder: false,
      productSlug: "ck-signature-body-wave",
      variantName: '18" / Natural Black',
      unitPrice: 185000,
      qty: 1,
    },
    {
      orderNumber: "CKH-20260831-512",
      customerIndex: 4,
      type: "PREORDER",
      status: "AWAITING_PAYMENT",
      paymentStatus: "UNPAID",
      subtotal: 450000,
      deliveryFee: 0,
      total: 450000,
      isPreorder: true,
      preorderBatch: "BATCH-2026-09B",
      productSlug: "raw-burmese-curly",
      variantName: '28" / Natural Dark Brown',
      unitPrice: 450000,
      qty: 1,
    },
    {
      orderNumber: "CKH-20260826-614",
      customerIndex: 5,
      type: "REGULAR",
      status: "READY_FOR_DELIVERY",
      paymentStatus: "PAYMENT_CONFIRMED",
      subtotal: 295000,
      deliveryFee: 5000,
      total: 300000,
      isPreorder: false,
      productSlug: "silky-straight-closure-wig",
      variantName: '22" / Natural Black',
      unitPrice: 295000,
      qty: 1,
    },
  ];

  for (const ord of dummyOrders) {
    const cust = createdCustomers[ord.customerIndex];
    const prod = await prisma.product.findUnique({ where: { slug: ord.productSlug } });

    const order = await prisma.order.upsert({
      where: { orderNumber: ord.orderNumber },
      update: {},
      create: {
        orderNumber: ord.orderNumber,
        customerId: cust.id,
        customerName: cust.name,
        customerEmail: cust.email,
        customerPhone: cust.phone,
        customerWhatsapp: cust.phone,
        type: ord.type,
        status: ord.status,
        paymentStatus: ord.paymentStatus,
        subtotal: ord.subtotal,
        deliveryFee: ord.deliveryFee,
        total: ord.total,
        deliveryAddress: "15 Admirals Walk",
        city: cust.city,
        state: cust.state,
        country: "Nigeria",
        isPreorder: ord.isPreorder,
        preorderBatch: ord.preorderBatch || null,
        customerNotes: "Please handle with care, thank you!",
        adminNotes: ord.isPreorder ? "Supplier confirmed manufacturing progress." : "Verified payment via bank app.",
      },
    });

    // Create Order Item
    await prisma.orderItem.deleteMany({ where: { orderId: order.id } });
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: prod?.id,
        productNameSnapshot: prod?.name || "CK Hair Piece",
        variantNameSnapshot: ord.variantName,
        isPreorder: ord.isPreorder,
        preorderDuration: ord.isPreorder ? "2–4 weeks" : null,
        quantity: ord.qty,
        unitPrice: ord.unitPrice,
        totalPrice: ord.unitPrice * ord.qty,
      },
    });

    // Create Status History
    await prisma.orderStatusHistory.deleteMany({ where: { orderId: order.id } });
    await prisma.orderStatusHistory.create({
      data: {
        orderId: order.id,
        oldStatus: null,
        newStatus: ord.isPreorder ? "PREORDER_PLACED" : "PENDING",
        changedBy: "System",
        note: "Order placed by customer via online checkout.",
      },
    });

    if (ord.paymentStatus === "PAYMENT_CONFIRMED") {
      await prisma.orderStatusHistory.create({
        data: {
          orderId: order.id,
          oldStatus: "AWAITING_PAYMENT",
          newStatus: "PAYMENT_CONFIRMED",
          changedBy: "CK Admin",
          note: "Direct bank transfer confirmed by Admin.",
        },
      });
      await prisma.payment.create({
        data: {
          orderId: order.id,
          status: "PAYMENT_CONFIRMED",
          amount: ord.total,
          confirmedBy: "CK Admin",
          confirmedAt: new Date(),
          reference: `GTB-${Math.floor(10000000 + Math.random() * 90000000)}`,
        },
      });
    }
  }

  // 9. Newsletter subscribers
  await prisma.newsletterSubscriber.upsert({
    where: { email: "vip.customer@example.com" },
    update: {},
    create: { email: "vip.customer@example.com" },
  });

  console.log("Database seeded successfully with CK Hair luxury demo catalog & admin accounts!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
