import React from "react";
import { Check, Clock, PackageCheck, Truck, Sparkles, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/formatters";

interface OrderTimelineProps {
  order: {
    type: string;
    status: string;
    isPreorder: boolean;
    statusHistory?: Array<{
      newStatus: string;
      createdAt: Date | string;
      note?: string | null;
    }>;
  };
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  const isPreorder = order.isPreorder || order.type === "PREORDER";

  const regularSteps = [
    { key: "AWAITING_PAYMENT", label: "Awaiting Bank Payment", desc: "Transfer pending confirmation" },
    { key: "PAYMENT_CONFIRMED", label: "Payment Confirmed", desc: "Funds verified by CK Hair" },
    { key: "PROCESSING", label: "Order Processing", desc: "Unit undergoing inspection & packaging" },
    { key: "READY_FOR_DELIVERY", label: "Ready for Delivery", desc: "Dispatched to delivery courier" },
    { key: "SHIPPED", label: "Shipped", desc: "Out for nationwide delivery" },
    { key: "COMPLETED", label: "Completed", desc: "Delivered to customer" },
  ];

  const preorderSteps = [
    { key: "PREORDER_PLACED", label: "Pre-Order Placed", desc: "Artisan slot reserved" },
    { key: "AWAITING_PAYMENT", label: "Awaiting Bank Payment", desc: "Transfer pending confirmation" },
    { key: "PAYMENT_CONFIRMED", label: "Payment Confirmed", desc: "Funds verified by CK Hair" },
    { key: "PREORDER_PROCESSING", label: "Pre-Order Processing", desc: "Artisan tailoring & handcrafting" },
    { key: "STOCK_ARRIVED", label: "Stock Arrived", desc: "Custom hair verified at atelier" },
    { key: "PREPARING_ORDER", label: "Preparing Order", desc: "Wig customization & styling" },
    { key: "READY_FOR_DELIVERY", label: "Ready for Delivery", desc: "Dispatched to courier" },
    { key: "SHIPPED", label: "Shipped", desc: "In transit to your address" },
    { key: "COMPLETED", label: "Completed", desc: "Delivered with luxury box" },
  ];

  const steps = isPreorder ? preorderSteps : regularSteps;

  const currentStepIndex = steps.findIndex((s) => s.key === order.status);
  const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 0;

  return (
    <div className="py-6">
      <div className="space-y-6">
        {steps.map((step, idx) => {
          const isPassed = idx < activeIndex;
          const isCurrent = idx === activeIndex;
          const isFuture = idx > activeIndex;

          const historyRecord = order.statusHistory?.find(
            (h) => h.newStatus === step.key
          );

          return (
            <div key={step.key} className="flex items-start gap-4 relative">
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div
                  className={`absolute left-4 top-8 -bottom-6 w-[2px] ${
                    isPassed ? "bg-brand-dark" : "bg-brand-border"
                  }`}
                />
              )}

              {/* Status Circle Icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 transition-all ${
                  isPassed
                    ? "bg-brand-dark text-white"
                    : isCurrent
                    ? "bg-brand-gold text-brand-dark ring-4 ring-brand-gold/20"
                    : "bg-brand-sand text-brand-muted border border-brand-border"
                }`}
              >
                {isPassed ? (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                ) : isCurrent ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Status Details */}
              <div className="flex-1 space-y-0.5 pt-1">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-xs uppercase tracking-wider font-bold ${
                      isCurrent
                        ? "text-brand-dark font-extrabold"
                        : isPassed
                        ? "text-brand-dark"
                        : "text-brand-muted"
                    }`}
                  >
                    {step.label}
                  </h4>
                  {historyRecord && (
                    <span className="text-[10px] text-brand-muted font-mono">
                      {formatDate(historyRecord.createdAt)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-brand-muted font-light">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
