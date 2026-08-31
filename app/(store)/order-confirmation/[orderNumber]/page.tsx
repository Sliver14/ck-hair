import React from "react";
import { notFound } from "next/navigation";
import { getOrderByNumber } from "@/lib/db/orders";
import { getPaymentSettings } from "@/lib/db/settings";
import { OrderConfirmationView } from "@/components/store/OrderConfirmationView";

export const revalidate = 0;

interface OrderConfirmationPageProps {
  params: { orderNumber: string };
}

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const [order, paymentSettings] = await Promise.all([
    getOrderByNumber(params.orderNumber),
    getPaymentSettings(),
  ]);

  if (!order) {
    notFound();
  }

  return (
    <OrderConfirmationView
      order={order}
      paymentSettings={paymentSettings}
    />
  );
}
