import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartToast } from "@/components/store/CartToast";
import { InitialSplashLoader } from "@/components/ui/InitialSplashLoader";

export const metadata: Metadata = {
  title: "CK HAIR — Luxury Hair. Effortless Confidence.",
  description: "Premium 100% human and raw hair crafted to elevate your everyday beauty with effortless sophistication. Handcrafted luxury wigs, raw bundles, and invisible HD lace.",
  keywords: ["CK Hair", "luxury wigs", "raw hair bundles", "HD lace frontal", "closure wigs Lagos", "human hair extensions"],
  openGraph: {
    title: "CK HAIR — Luxury Hair. Effortless Confidence.",
    description: "Premium 100% human and raw hair crafted to elevate your everyday beauty.",
    type: "website",
  },
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col justify-between">
        <InitialSplashLoader />
        <CartProvider>
          {children}
          <CartDrawer />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
