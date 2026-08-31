import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CK Hair database...");

  // 1. Store Settings
  await prisma.storeSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      storeName: "CK Hair",
      tagline: "Luxury Hair. Effortless Confidence.",
      description: "Premium 100% human and raw hair crafted to elevate your everyday beauty with effortless sophistication.",
      email: "orders@ckhair.com",
      phone: "+234 801 234 5678",
      whatsapp: "2348012345678",
      address: "Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
      instagram: "https://instagram.com/ckhair",
      tiktok: "https://tiktok.com/@ckhair",
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
    update: {},
    create: {
      id: "default",
      bankName: "Guaranty Trust Bank (GTBank)",
      accountName: "CK Hair Luxury Global Ltd",
      accountNumber: "0123456789",
      paymentInstructions: "Please make your direct bank transfer to the account details above. Once paid, click the WhatsApp button to send your payment receipt/screenshot and order confirmation.",
      whatsappNumber: "2348012345678",
    },
  });

  // 3. Homepage Settings
  await prisma.homepageSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      heroTitle: "LUXURY HAIR.\nEFFORTLESS CONFIDENCE.",
      heroSubtitle: "Curated 100% raw human hair, handcrafted luxury wigs, and high-definition lace tailored for timeless elegance.",
      heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=85",
      primaryCtaText: "SHOP THE COLLECTION",
      primaryCtaLink: "/shop",
      secondaryCtaText: "EXPLORE PRE-ORDERS",
      secondaryCtaLink: "/preorder",
      announcementText: "COMPLIMENTARY NATIONWIDE DELIVERY ON ORDERS ABOVE ₦500,000",
      announcementEnabled: true,
      editorialTitle: "THE CK HAIR EXPERIENCE",
      editorialSubtitle: "Hair that moves with grace, radiates natural sheen, and feels as luxurious as it looks.",
      editorialImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
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

  // 5. Categories
  const categoriesData = [
    {
      name: "Wigs",
      slug: "wigs",
      description: "Ready-to-wear luxury closure & frontal wigs expertly customized with natural hairlines.",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=800&q=80",
      featured: true,
      order: 1,
    },
    {
      name: "Bundles",
      slug: "bundles",
      description: "Double-drawn virgin & single-donor raw hair bundles that hold curls and dye flawlessly.",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
      featured: true,
      order: 2,
    },
    {
      name: "Frontals",
      slug: "frontals",
      description: "Ultra-thin HD invisible lace frontals for the ultimate melt and seamless styling.",
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      featured: true,
      order: 3,
    },
    {
      name: "Closures",
      slug: "closures",
      description: "Natural part Swiss & HD lace closures designed for durable, effortless elegance.",
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
      featured: true,
      order: 4,
    },
    {
      name: "Extensions",
      slug: "extensions",
      description: "Seamless clip-ins and tape-ins for instant volume, bounce, and length.",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
      featured: false,
      order: 5,
    },
    {
      name: "Ponytails",
      slug: "ponytails",
      description: "Instant glam sleek and textured wrap-around ponytails.",
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80",
      featured: false,
      order: 6,
    },
    {
      name: "Hair Care",
      slug: "hair-care",
      description: "Salon-grade serums, edge controls, and silk maintenance essentials.",
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
      featured: false,
      order: 7,
    },
    {
      name: "New Arrivals",
      slug: "new-arrivals",
      description: "Fresh drops of limited edition textures and custom coloured units.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      featured: true,
      order: 8,
    },
  ];

  const categoryMap = new Map<string, string>();
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap.set(cat.slug, created.id);
  }

  // 6. Products
  const productsData = [
    {
      name: "CK Signature Body Wave",
      slug: "ck-signature-body-wave",
      description: "Our signature 100% Virgin Body Wave hair offers unmatched luster, bounce, and versatility. Can be bleached to blonde (#613) and heat styled repeatedly while maintaining full cuticles aligned from root to tip.",
      shortDescription: "Ultra-silky Virgin body wave bundles with natural luster and bounce.",
      price: 185000,
      compareAtPrice: 210000,
      sku: "CK-BW-001",
      categorySlug: "bundles",
      stock: 25,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Virgin Human Hair",
      texture: "Body Wave",
      lengths: JSON.stringify(['14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"']),
      colors: JSON.stringify(["Natural Black", "Jet Black", "Chestnut Brown"]),
      featured: true,
      bestseller: true,
      isNew: false,
      images: [
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85",
      ],
    },
    {
      name: "Brazilian Deep Wave",
      slug: "brazilian-deep-wave",
      description: "Rich, defined water-wave curl patterns with minimum shedding and maximum volume. Perfectly holds moisture and defines effortlessly with a dab of leave-in conditioner.",
      shortDescription: "Deeply defined, voluminous curly textures with deep wave definition.",
      price: 220000,
      compareAtPrice: null,
      sku: "CK-DW-002",
      categorySlug: "bundles",
      stock: 18,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Virgin Brazilian Hair",
      texture: "Deep Wave",
      lengths: JSON.stringify(['16"', '18"', '20"', '22"', '24"', '28"']),
      colors: JSON.stringify(["Natural Black"]),
      featured: true,
      bestseller: false,
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=85",
      ],
    },
    {
      name: "Luxury Bone Straight",
      slug: "luxury-bone-straight",
      description: "Sleek, fluid, and glass-like straight hair that flows effortlessly with every movement. No flyaways, tangle-free, and stays pin-straight even in humid weather.",
      shortDescription: "Signature glass-sheen bone straight double drawn bundles.",
      price: 200000,
      compareAtPrice: 230000,
      sku: "CK-BS-003",
      categorySlug: "bundles",
      stock: 30,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "100% Raw Vietnamese Hair",
      texture: "Bone Straight",
      lengths: JSON.stringify(['18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"']),
      colors: JSON.stringify(["Natural Black", "Jet Black", "Piano Highlight 1B/27"]),
      featured: true,
      bestseller: true,
      isNew: false,
      images: [
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=85",
      ],
    },
    {
      name: "HD Lace Frontal 13x4",
      slug: "hd-lace-frontal-13x4",
      description: "High definition skin-melt swiss lace that disappears invisibly against all skin tones. Pre-plucked with delicate baby hairs for the most realistic install.",
      shortDescription: "Ultra-thin invisible HD lace frontal 13x4 with pre-plucked hairline.",
      price: 125000,
      compareAtPrice: null,
      sku: "CK-FR-004",
      categorySlug: "frontals",
      stock: 15,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Virgin Hair",
      texture: "Straight",
      lengths: JSON.stringify(['14"', '16"', '18"', '20"']),
      colors: JSON.stringify(["Natural Black"]),
      featured: false,
      bestseller: true,
      isNew: false,
      images: [
        "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=85",
      ],
    },
    {
      name: "Premium Swiss Lace Closure 5x5",
      slug: "premium-swiss-lace-closure-5x5",
      description: "Free-part 5x5 lace closure providing deep parting versatility and scalp-like realism without the maintenance of a full frontal.",
      shortDescription: "5x5 HD free parting closure for effortless daily protective styling.",
      price: 95000,
      compareAtPrice: null,
      sku: "CK-CL-005",
      categorySlug: "closures",
      stock: 22,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Virgin Hair",
      texture: "Body Wave",
      lengths: JSON.stringify(['12"', '14"', '16"', '18"']),
      colors: JSON.stringify(["Natural Black"]),
      featured: false,
      bestseller: false,
      isNew: false,
      images: [
        "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=85",
      ],
    },
    {
      name: "Natural Kinky Curly",
      slug: "natural-kinky-curly",
      description: "Authentic 3C-4A curl texture mimicking natural afro hair blown out or freshly washed. Full of volume, lightweight, and exceptionally soft.",
      shortDescription: "Gorgeous high-density kinky curly texture that blends seamlessly with natural hair.",
      price: 210000,
      compareAtPrice: null,
      sku: "CK-KC-006",
      categorySlug: "bundles",
      stock: 14,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Virgin Hair",
      texture: "Kinky Curly",
      lengths: JSON.stringify(['16"', '18"', '20"', '22"', '24"']),
      colors: JSON.stringify(["Natural Black"]),
      featured: false,
      bestseller: false,
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=800&q=85",
      ],
    },
    {
      name: "CK Luxury Body Wave Wig",
      slug: "ck-luxury-body-wave-wig",
      description: "Custom constructed 13x4 frontal wig ready to wear straight out of the luxury box. Features bleached knots, pre-plucked transition, adjustable elastic band, and 250% density.",
      shortDescription: "Ready-to-wear 250% density HD frontal wig in our signature body wave.",
      price: 320000,
      compareAtPrice: 350000,
      sku: "CK-WIG-007",
      categorySlug: "wigs",
      stock: 10,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "100% Virgin Hair",
      texture: "Body Wave",
      lengths: JSON.stringify(['20"', '22"', '24"', '26"', '28"', '30"']),
      colors: JSON.stringify(["Natural Black", "Honey Blonde (#27)", "Burgundy (99J)"]),
      featured: true,
      bestseller: true,
      isNew: false,
      images: [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=800&q=85",
      ],
    },
    {
      name: "Silky Straight Closure Wig",
      slug: "silky-straight-closure-wig",
      description: "Beginner-friendly glueless 5x5 closure wig. Slip on in 60 seconds with our pre-installed invisible velvet grip band. 200% density with full, thick ends.",
      shortDescription: "Glueless 5x5 HD closure unit for effortless, everyday luxury styling.",
      price: 295000,
      compareAtPrice: null,
      sku: "CK-WIG-008",
      categorySlug: "wigs",
      stock: 12,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Virgin Hair",
      texture: "Straight",
      lengths: JSON.stringify(['18"', '20"', '22"', '24"']),
      colors: JSON.stringify(["Natural Black", "Jet Black"]),
      featured: false,
      bestseller: true,
      isNew: false,
      images: [
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=85",
      ],
    },
    {
      name: "Raw Burmese Curly",
      slug: "raw-burmese-curly",
      description: "Direct single-donor unprocessed Burmese raw hair. Thick from weft to tips, coarse yet silky, holds wet-and-wavy styling indefinitely. Available for pre-order direct from our Yangon artisan suppliers.",
      shortDescription: "Ultra-rare single-donor Raw Burmese curly hair. Exclusive pre-order drop.",
      price: 450000,
      compareAtPrice: 500000,
      sku: "CK-PRE-009",
      categorySlug: "bundles",
      stock: 0,
      status: "ACTIVE",
      availability: "PREORDER",
      preorderEnabled: true,
      preorderDuration: "2–4 weeks",
      preorderLimit: 20,
      hairType: "Single Donor Raw Burmese Hair",
      texture: "Raw Curly",
      lengths: JSON.stringify(['22"', '24"', '26"', '28"', '30"', '32"']),
      colors: JSON.stringify(["Natural Dark Brown"]),
      featured: true,
      bestseller: false,
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85",
      ],
    },
    {
      name: "Natural Black Ponytail",
      slug: "natural-black-ponytail",
      description: "Instant clip-and-wrap drawstring ponytail. Made with 100% human hair for a seamless sleek high or low bun/ponytail look.",
      shortDescription: "Wrap-around drawstring ponytail with secure inner combs.",
      price: 85000,
      compareAtPrice: null,
      sku: "CK-PT-010",
      categorySlug: "ponytails",
      stock: 16,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Human Hair",
      texture: "Straight",
      lengths: JSON.stringify(['18"', '22"', '26"']),
      colors: JSON.stringify(["Natural Black", "Jet Black"]),
      featured: false,
      bestseller: false,
      isNew: false,
      images: [
        "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=85",
      ],
    },
    {
      name: "HD Lace 13x6 Frontal",
      slug: "hd-lace-13x6-frontal",
      description: "Extra deep 6-inch parting space allows for full side parts, middle parts, and half-up half-down updos with invisible melting.",
      shortDescription: "Deep parting 13x6 ultra-thin HD lace frontal.",
      price: 145000,
      compareAtPrice: null,
      sku: "CK-FR-011",
      categorySlug: "frontals",
      stock: 11,
      status: "ACTIVE",
      availability: "IN_STOCK",
      hairType: "Virgin Hair",
      texture: "Body Wave",
      lengths: JSON.stringify(['16"', '18"', '20"']),
      colors: JSON.stringify(["Natural Black"]),
      featured: false,
      bestseller: false,
      isNew: false,
      images: [
        "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=85",
      ],
    },
    {
      name: "Luxury Deep Curl Wig",
      slug: "luxury-deep-curl-wig",
      description: "Premium handcrafted high-density 13x6 HD lace wig with cascading water curls. Cuticle intact, soft, bouncy, and tailored for red carpet moments.",
      shortDescription: "Exclusive 300% density luxury curly unit. Pre-order direct from CK artisan workshop.",
      price: 380000,
      compareAtPrice: 420000,
      sku: "CK-PRE-012",
      categorySlug: "wigs",
      stock: 0,
      status: "ACTIVE",
      availability: "PREORDER",
      preorderEnabled: true,
      preorderDuration: "2–4 weeks",
      preorderLimit: 15,
      hairType: "Raw Virgin Hair",
      texture: "Deep Curl",
      lengths: JSON.stringify(['24"', '26"', '28"', '30"', '32"']),
      colors: JSON.stringify(["Natural Black", "Rich Chocolate Brown"]),
      featured: true,
      bestseller: true,
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=85",
      ],
    },
  ];

  for (const p of productsData) {
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

    // Delete existing images to recreate cleanly
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    for (let i = 0; i < p.images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: p.images[i],
          alt: `${p.name} image ${i + 1}`,
          isPrimary: i === 0,
          order: i,
        },
      });
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
