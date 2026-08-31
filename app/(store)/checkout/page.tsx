"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/formatters";
import { HairLoader } from "@/components/ui/HairLoader";
import {
  ShieldCheck,
  Clock,
  Lock,
  Building,
  Check,
  AlertCircle,
  ArrowRight,
  MapPin,
  Truck,
  Store,
} from "lucide-react";

const NIGERIAN_STATES = [
  "Lagos", "Abuja FCT", "Rivers", "Oyo", "Ogun", "Delta", "Edo", "Enugu", "Anambra", "Akwa Ibom", "Imo", "Kaduna", "Kano", "Kwara", "Ondo", "Osun", "Abia", "Cross River", "Plateau", "Benue", "Bayelsa", "Ekiti", "Ebonyi", "Bauchi", "Gombe", "Adamawa", "Borno", "Jigawa", "Katsina", "Kebbi", "Kogi", "Nasarawa", "Niger", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const STUDIO_ADDRESS = "Admiralty Way, Lekki Phase 1, Lagos, Nigeria";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, hasPreorderItems, clearCart } = useCart();

  // Fulfillment method: 'pickup' is default, 'delivery' is optional
  const [fulfillmentMethod, setFulfillmentMethod] = useState<"pickup" | "delivery">("pickup");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    city: "",
    state: "Lagos",
    notes: "",
  });

  const [preorderAcknowledged, setPreorderAcknowledged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const FREE_SHIPPING_THRESHOLD = 500000;
  const deliveryFee =
    fulfillmentMethod === "pickup"
      ? 0
      : subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : 5000;

  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (items.length === 0 && !isSubmitting) {
      // If empty, redirect to shop
      const timer = setTimeout(() => {
        router.push("/shop");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [items, router, isSubmitting]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (hasPreorderItems && !preorderAcknowledged) {
      setErrorMsg("Please acknowledge the pre-order fulfillment terms to proceed.");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg("Please complete all required contact details.");
      return;
    }

    if (fulfillmentMethod === "delivery" && (!formData.address || !formData.city)) {
      setErrorMsg("Please provide your complete delivery street address and city.");
      return;
    }

    setIsSubmitting(true);

    try {
      const finalAddress =
        fulfillmentMethod === "pickup"
          ? `Store Pickup: ${STUDIO_ADDRESS}`
          : formData.address;

      const finalCity =
        fulfillmentMethod === "pickup" ? "Lekki" : formData.city;

      const finalState =
        fulfillmentMethod === "pickup" ? "Lagos" : formData.state;

      const customerNotesWithMethod = formData.notes
        ? `[${fulfillmentMethod === "pickup" ? "Studio Pickup" : "Nationwide Delivery"}] ${formData.notes}`
        : `[${fulfillmentMethod === "pickup" ? "Studio Pickup" : "Nationwide Delivery"}]`;

      const payload = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerWhatsapp: formData.whatsapp || formData.phone,
        deliveryAddress: finalAddress,
        city: finalCity,
        state: finalState,
        customerNotes: customerNotesWithMethod,
        subtotal,
        deliveryFee,
        total,
        isPreorder: hasPreorderItems,
        items: items.map((item) => ({
          productId: item.productId,
          productNameSnapshot: item.name,
          variantNameSnapshot: item.variantName,
          productImageSnapshot: item.image,
          isPreorder: item.isPreorder,
          preorderDuration: item.preorderDuration,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      const data = await res.json();
      clearCart();
      router.push(`/order-confirmation/${data.order.orderNumber}`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred while processing your order. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-32 flex items-center justify-center bg-[#FAF6F2] min-h-[60vh]">
        <HairLoader
          size="md"
          text="PREPARING CHECKOUT"
          subtext="Validating your selected pieces..."
        />
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 bg-[#FAF6F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#B76E79] font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Checkout</span>
          </div>
          <h1 className="font-serif-luxury text-3xl md:text-5xl font-bold text-brand-dark">
            FULFILLMENT & PAYMENT
          </h1>
          <p className="text-xs md:text-sm text-brand-muted font-light">
            Choose pickup or delivery, enter your details, and generate your official CK Hair order and GTBank transfer instructions.
          </p>
        </div>

        {errorMsg && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 text-xs">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Fields Left */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Customer Information */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border/60 shadow-xs space-y-6">
              <h2 className="font-serif-luxury text-xl font-bold text-brand-dark border-b border-brand-border/60 pb-3">
                1. CONTACT DETAILS
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Amaka Eze"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="amaka@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="08012345678"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                    WhatsApp Number (for payment confirmation & receipts)
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="Same as phone or enter separate WhatsApp line"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Fulfillment Method (Pickup Default vs Optional Delivery) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border/60 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
                <h2 className="font-serif-luxury text-xl font-bold text-brand-dark">
                  2. FULFILLMENT METHOD
                </h2>
                <span className="text-[11px] text-brand-gold font-bold uppercase tracking-wider">
                  Pickup (Default) or Delivery
                </span>
              </div>

              {/* Selection cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Store Pickup (Default) */}
                <div
                  onClick={() => setFulfillmentMethod("pickup")}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    fulfillmentMethod === "pickup"
                      ? "border-brand-dark bg-[#FAF9F5] shadow-xs"
                      : "border-brand-border hover:border-brand-border/80 bg-white"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-brand-dark" />
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                          Store Pickup
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                        Default • Free
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted font-light leading-relaxed">
                      Collect directly from our luxury studio in Lekki Phase 1, Lagos.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-border/40 flex items-center justify-between text-xs">
                    <span className="text-brand-muted">Cost</span>
                    <span className="font-bold text-brand-dark">₦0 (FREE)</span>
                  </div>
                </div>

                {/* Option 2: Nationwide Delivery (Optional) */}
                <div
                  onClick={() => setFulfillmentMethod("delivery")}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    fulfillmentMethod === "delivery"
                      ? "border-brand-dark bg-[#FAF9F5] shadow-xs"
                      : "border-brand-border hover:border-brand-border/80 bg-white"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-brand-dark" />
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                          Nationwide Delivery
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-sand text-brand-dark">
                        Optional
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted font-light leading-relaxed">
                      Fast, insured delivery to your doorstep anywhere in Nigeria.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-border/40 flex items-center justify-between text-xs">
                    <span className="text-brand-muted">Cost</span>
                    <span className="font-bold text-brand-dark">
                      {subtotal >= FREE_SHIPPING_THRESHOLD
                        ? "FREE (Above ₦500k)"
                        : "₦5,000 Flat Rate"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Conditional Content based on Fulfillment Selection */}
              {fulfillmentMethod === "pickup" ? (
                /* Studio Pickup Details Card */
                <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-brand-border/60 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                        Pickup Location & Collection Hours
                      </h3>
                      <p className="text-xs font-medium text-brand-dark">
                        {STUDIO_ADDRESS}
                      </p>
                      <p className="text-[11px] text-brand-muted">
                        Operating Hours: Monday – Saturday (9:00 AM – 6:00 PM)
                      </p>
                      <p className="text-[11px] text-brand-muted font-light pt-1">
                        We will notify you via WhatsApp as soon as your luxury hair piece is packaged and ready for collection.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-brand-border/40 space-y-1.5">
                    <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                      Pickup Notes or Authorized Representative (Optional)
                    </label>
                    <input
                      type="text"
                      name="notes"
                      placeholder="e.g. Will pick up on Saturday or sending dispatch rider"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-white"
                    />
                  </div>
                </div>
              ) : (
                /* Delivery Address Form */
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                      Street Address / House or Office Number *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required={fulfillmentMethod === "delivery"}
                      placeholder="e.g. 15 Admiralty Way, Lekki Phase 1"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                        City / Area *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required={fulfillmentMethod === "delivery"}
                        placeholder="e.g. Lekki / Victoria Island / Ikeja"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5] cursor-pointer"
                      >
                        {NIGERIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                      Special Delivery Instructions or Landmark
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      placeholder="e.g. Close to the junction, please call before arriving."
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#F5F5F5]"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* 3. Pre-order Terms Acknowledgment */}
            {hasPreorderItems && (
              <div className="p-6 rounded-2xl bg-[#EAD7C3]/30 border border-[#EAD7C3] space-y-4">
                <div className="flex items-center gap-2 text-[#2B2118]">
                  <Clock className="w-5 h-5 text-[#B76E79] flex-shrink-0" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">
                    Pre-Order Fulfillment Agreement
                  </h3>
                </div>
                <p className="text-xs text-[#756558] leading-relaxed font-light">
                  Please note: This order contains custom pre-order item(s). Handcrafting and quality inspection require the estimated fulfillment period stated on the product page.
                </p>
                <label className="flex items-start gap-3 cursor-pointer pt-2 border-t border-[#EAD7C3]">
                  <input
                    type="checkbox"
                    checked={preorderAcknowledged}
                    onChange={(e) => setPreorderAcknowledged(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 accent-brand-dark"
                  />
                  <span className="text-xs font-medium text-[#2B2118]">
                    I understand that this is a pre-order and fulfillment will follow the estimated artisan schedule.
                  </span>
                </label>
              </div>
            )}

          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Order Items Preview */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-4">
              <h2 className="font-serif-luxury text-xl font-bold text-brand-dark border-b border-brand-border/60 pb-3">
                BAG ITEMS ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>

              <div className="divide-y divide-brand-sand max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-16 rounded-lg object-cover bg-brand-sand flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-brand-dark truncate">{item.name}</p>
                      {item.variantName && (
                        <p className="text-[11px] text-brand-muted truncate">{item.variantName}</p>
                      )}
                      <p className="text-[11px] text-brand-muted">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-brand-dark">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="pt-4 border-t border-brand-border/60 space-y-2 text-xs">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span className="font-medium text-brand-dark">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-brand-muted">
                  <span>Fulfillment Method</span>
                  <span className="font-medium text-brand-dark">
                    {fulfillmentMethod === "pickup" ? "Store Pickup (Default)" : "Nationwide Delivery"}
                  </span>
                </div>

                <div className="flex justify-between text-brand-muted">
                  <span>Fulfillment Fee</span>
                  <span className="font-medium text-brand-dark">
                    {fulfillmentMethod === "pickup"
                      ? "FREE (Complimentary Pickup)"
                      : deliveryFee === 0
                      ? "FREE (Complimentary)"
                      : formatPrice(deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-brand-dark pt-2 border-t border-brand-border/60">
                  <span>Total to Pay</span>
                  <span className="font-serif-luxury text-xl">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Notice */}
            <div className="bg-[#FAF6F2] p-6 rounded-2xl border border-brand-border space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-brand-dark">
                <Building className="w-4 h-4 text-[#B76E79]" />
                <span>Payment via Direct Bank Transfer</span>
              </div>
              <p className="text-brand-muted font-light leading-relaxed text-[11px]">
                Upon clicking "Place Order", your unique Order Number and CK Hair GTBank account credentials will be displayed with a 1-click WhatsApp confirmation link.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || (hasPreorderItems && !preorderAcknowledged)}
              className="w-full py-4 bg-brand-dark text-white rounded-full text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#3E3025] transition-all shadow-lg active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Generating Order...</span>
              ) : (
                <>
                  <span>Place Order ({formatPrice(total)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

