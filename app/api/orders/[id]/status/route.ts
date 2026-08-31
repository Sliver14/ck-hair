import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, paymentStatus, note, changedBy = "Admin", adminNotes, batchId } = body;

    const existingOrder = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (batchId !== undefined) updateData.preorderBatch = batchId;

    if (status === "COMPLETED") {
      updateData.completedAt = new Date();
      updateData.completedBy = changedBy;
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData,
    });

    // Create history record
    if (status && status !== existingOrder.status) {
      await prisma.orderStatusHistory.create({
        data: {
          orderId: id,
          oldStatus: existingOrder.status,
          newStatus: status,
          changedBy,
          note: note || `Order status updated to ${status} by ${changedBy}`,
        },
      });
    }

    // If payment confirmed, create or update payment record
    if (paymentStatus === "PAYMENT_CONFIRMED") {
      const existingPayment = await prisma.payment.findFirst({
        where: { orderId: id },
      });

      if (existingPayment) {
        await prisma.payment.update({
          where: { id: existingPayment.id },
          data: {
            status: "PAYMENT_CONFIRMED",
            confirmedAt: new Date(),
            confirmedBy: changedBy,
          },
        });
      } else {
        await prisma.payment.create({
          data: {
            orderId: id,
            status: "PAYMENT_CONFIRMED",
            amount: existingOrder.total,
            confirmedAt: new Date(),
            confirmedBy: changedBy,
            reference: `MANUAL-${Date.now()}`,
          },
        });
      }
    }

    return NextResponse.json({ order: updatedOrder });
  } catch (error: any) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update order status" },
      { status: 500 }
    );
  }
}
