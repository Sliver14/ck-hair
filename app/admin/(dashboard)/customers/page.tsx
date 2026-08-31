import React from "react";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/formatters";
import { Users, Mail, PhoneCall, ShoppingBag } from "lucide-react";

export const revalidate = 0;

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      orders: {
        select: {
          id: true,
          total: true,
          status: true,
          isPreorder: true,
          createdAt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
          CUSTOMER DIRECTORY ({customers.length})
        </h1>
        <p className="text-xs text-brand-muted mt-0.5">
          Clients and buyers with lifetime spend and purchasing history.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAF8] text-brand-muted uppercase tracking-wider text-[10px] border-b border-brand-border">
              <tr>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Total Orders</th>
                <th className="py-4 px-6">Lifetime Spend</th>
                <th className="py-4 px-6">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-sand">
              {customers.map((c) => {
                const totalSpent = c.orders.reduce((sum, o) => sum + o.total, 0);
                return (
                  <tr key={c.id} className="hover:bg-brand-sand/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-brand-dark text-xs">
                      {c.name}
                    </td>

                    <td className="py-4 px-6 space-y-0.5">
                      <p className="text-brand-dark">{c.email}</p>
                      <p className="text-[11px] text-brand-muted">{c.phone}</p>
                    </td>

                    <td className="py-4 px-6 text-brand-muted">
                      {c.city || "Lekki"}, {c.state || "Lagos"}
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-bold text-brand-dark">{c.orders.length} orders</span>
                    </td>

                    <td className="py-4 px-6 font-bold text-brand-dark text-xs">
                      {formatPrice(totalSpent)}
                    </td>

                    <td className="py-4 px-6 text-brand-muted text-[11px]">
                      {formatDate(c.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
