import { formatPrice } from "./formatters";

interface WhatsAppOrderPayload {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  state: string;
  total: number;
  isPreorder: boolean;
  items: Array<{
    productNameSnapshot: string;
    variantNameSnapshot?: string | null;
    quantity: number;
    unitPrice: number;
    isPreorder?: boolean;
    preorderDuration?: string | null;
  }>;
}

export function generateOrderWhatsAppMessage(order: WhatsAppOrderPayload): string {
  const itemsText = order.items
    .map((item) => {
      let line = `• ${item.quantity}x ${item.productNameSnapshot}`;
      if (item.variantNameSnapshot) {
        line += ` (${item.variantNameSnapshot})`;
      }
      line += ` - ${formatPrice(item.unitPrice * item.quantity)}`;
      if (item.isPreorder) {
        line += ` [PRE-ORDER: ${item.preorderDuration || "2–4 weeks"}]`;
      }
      return line;
    })
    .join("\n");

  const orderType = order.isPreorder ? "PRE-ORDER" : "REGULAR ORDER";

  const fulfillmentLine = `• Delivery Address: ${order.deliveryAddress}, ${order.city}, ${order.state}`;

  return `Hello CK Hair,

I have placed an order on your website.

*Order #:* ${order.orderNumber}
*Order Type:* ${orderType}

*Products:*
${itemsText}

*Total Amount:* ${formatPrice(order.total)}

*Customer Details:*
• Name: ${order.customerName}
• Phone: ${order.customerPhone}
${fulfillmentLine}

I have made my bank transfer payment and I am sending this to confirm my order.

Thank you!`;
}

export function generateWhatsAppUrl(phone?: string | null, text: string = ""): string {
  const safePhone = (phone || "2349026555783").toString().replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${safePhone}?text=${encodedText}`;
}


