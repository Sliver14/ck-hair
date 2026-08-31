import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/formatters";

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerWhatsapp?: string;
  deliveryAddress: string;
  city: string;
  state: string;
  country?: string;
  customerNotes?: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  isPreorder: boolean;
  items: Array<{
    productId?: string;
    productNameSnapshot: string;
    variantNameSnapshot?: string | null;
    productImageSnapshot?: string | null;
    isPreorder: boolean;
    preorderDuration?: string | null;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
}

export async function createOrder(data: CreateOrderInput) {
  // Upsert customer
  const customer = await prisma.customer.upsert({
    where: { email: data.customerEmail },
    update: {
      name: data.customerName,
      phone: data.customerPhone,
      whatsapp: data.customerWhatsapp || data.customerPhone,
      address: data.deliveryAddress,
      city: data.city,
      state: data.state,
      country: data.country || "Nigeria",
    },
    create: {
      name: data.customerName,
      email: data.customerEmail,
      phone: data.customerPhone,
      whatsapp: data.customerWhatsapp || data.customerPhone,
      address: data.deliveryAddress,
      city: data.city,
      state: data.state,
      country: data.country || "Nigeria",
    },
  });

  const orderNumber = generateOrderNumber();
  const orderType = data.isPreorder ? "PREORDER" : "REGULAR";
  const initialStatus = data.isPreorder ? "PREORDER_PLACED" : "AWAITING_PAYMENT";

  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerId: customer.id,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      customerWhatsapp: data.customerWhatsapp || data.customerPhone,
      type: orderType,
      status: initialStatus,
      paymentStatus: "UNPAID",
      subtotal: data.subtotal,
      deliveryFee: data.deliveryFee,
      total: data.total,
      deliveryAddress: data.deliveryAddress,
      city: data.city,
      state: data.state,
      country: data.country || "Nigeria",
      customerNotes: data.customerNotes || null,
      isPreorder: data.isPreorder,
      items: {
        create: data.items.map((item) => ({
          productId: item.productId || null,
          productNameSnapshot: item.productNameSnapshot,
          variantNameSnapshot: item.variantNameSnapshot || null,
          productImageSnapshot: item.productImageSnapshot || null,
          isPreorder: item.isPreorder,
          preorderDuration: item.preorderDuration || null,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        })),
      },
      statusHistory: {
        create: {
          oldStatus: null,
          newStatus: initialStatus,
          changedBy: "Customer",
          note: "Order placed via online checkout.",
        },
      },
    },
    include: {
      items: true,
      statusHistory: true,
    },
  });

  // Automatically reduce stock pieces for ordered products
  for (const item of data.items) {
    if (item.productId) {
      try {
        const prod = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (prod) {
          const newStock = Math.max(0, prod.stock - item.quantity);
          const shouldSwitchToPreorder = newStock === 0;

          await prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: newStock,
              availability: shouldSwitchToPreorder ? "PREORDER" : prod.availability,
              preorderEnabled: shouldSwitchToPreorder ? true : prod.preorderEnabled,
            },
          });
        }
      } catch (err) {
        console.error("Error updating product stock for:", item.productId, err);
      }
    }
  }

  return order;
}

export async function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: true,
      statusHistory: { orderBy: { createdAt: "desc" } },
      payments: true,
      customer: true,
    },
  });
}
