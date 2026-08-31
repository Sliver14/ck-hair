import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/formatters";
import { PlusCircle, Edit3, Eye, Clock, CheckCircle2, XCircle } from "lucide-react";
import { ProductStatusToggle } from "@/components/admin/ProductStatusToggle";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
            PRODUCT CATALOG ({products.length})
          </h1>
          <p className="text-xs text-brand-muted mt-0.5">
            Manage luxury wigs, raw bundles, frontals, closures, and active stock levels.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-5 py-2.5 bg-brand-dark text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-2 shadow-xs self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-brand-border/60 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAF8] text-brand-muted uppercase tracking-wider text-[10px] border-b border-brand-border">
              <tr>
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Stock</th>
                <th className="py-4 px-6">Availability</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-sand">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-brand-sand/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images?.[0]?.url || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=200&q=80"}
                        alt={prod.name}
                        className="w-12 h-14 rounded-lg object-cover bg-brand-sand"
                      />
                      <div>
                        <Link
                          href={`/admin/products/${prod.id}`}
                          className="font-bold text-brand-dark hover:underline text-xs"
                        >
                          {prod.name}
                        </Link>
                        <p className="text-[10px] text-brand-muted mt-0.5">
                          SKU: {prod.sku || "N/A"} • {prod.texture || "Natural"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 font-medium text-brand-dark">
                    {prod.category?.name}
                  </td>

                  <td className="py-4 px-6 font-bold text-brand-dark">
                    {formatPrice(prod.price)}
                    {prod.compareAtPrice && (
                      <span className="text-[10px] text-brand-lightMuted line-through ml-1.5 font-normal">
                        {formatPrice(prod.compareAtPrice)}
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    <span className="font-semibold text-brand-dark">
                      {prod.availability === "PREORDER" ? "Pre-order" : `${prod.stock} units`}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    {prod.availability === "PREORDER" ? (
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
                        <Clock className="w-3 h-3" />
                        <span>Pre-Order</span>
                      </span>
                    ) : prod.availability === "OUT_OF_STOCK" ? (
                      <span className="text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-800">
                        Out of Stock
                      </span>
                    ) : (
                      <span className="text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-800">
                        In Stock
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    <ProductStatusToggle
                      productId={prod.id}
                      initialStatus={prod.status}
                    />
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/product/${prod.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-brand-muted hover:text-brand-dark hover:bg-brand-sand transition-colors"
                        title="View Public Store Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/products/${prod.id}`}
                        className="p-1.5 rounded-lg text-brand-muted hover:text-brand-dark hover:bg-brand-sand transition-colors"
                        title="Edit Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
