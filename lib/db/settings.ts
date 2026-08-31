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
        data: { id: "default" },
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
      whatsappNumber: "2348012345678",
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
      updatedAt: new Date(),
    };
  }
}
