import { prisma } from "@/lib/prisma";

export async function getStoreSettings() {
  try {
    let settings = await prisma.storeSettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) {
      settings = await prisma.storeSettings.create({
        data: { id: "default" },
      });
    }
    return settings;
  } catch (error) {
    console.error("Error fetching store settings:", error);
    return {
      id: "default",
      storeName: "CK Hair",
      tagline: "Luxury Hair. Effortless Confidence.",
      logo: null,
      favicon: null,
      description: "Premium hair crafted to elevate your everyday beauty.",
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
      updatedAt: new Date(),
    };
  }
}

export async function getPaymentSettings() {
  try {
    let settings = await prisma.paymentSettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) {
      settings = await prisma.paymentSettings.create({
        data: { id: "default", whatsappNumber: "2349026555783" },
      });
    }
    return settings;
  } catch (error) {
    console.error("Error fetching payment settings:", error);
    return {
      id: "default",
      bankName: "GTBank",
      accountName: "CK Hair Luxury Global Ltd",
      accountNumber: "0123456789",
      paymentInstructions: "Please make your direct bank transfer to the account details above. Once paid, click the WhatsApp button to send your payment receipt/screenshot and order confirmation.",
      whatsappNumber: "2349026555783",
      whatsappMessageTemplate: null,
      updatedAt: new Date(),
    };
  }
}

export async function getHomepageSettings() {
  try {
    let settings = await prisma.homepageSettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) {
      settings = await prisma.homepageSettings.create({
        data: { id: "default" },
      });
    }
    return settings;
  } catch (error) {
    console.error("Error fetching homepage settings:", error);
    return {
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
      updatedAt: new Date(),
    };
  }
}
