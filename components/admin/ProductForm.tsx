"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, Clock, Sparkles, RefreshCw } from "lucide-react";
import { CloudinaryImageUploader } from "./CloudinaryImageUploader";

interface ProductFormProps {
  initialData?: any;
  categories: any[];
  isEditing?: boolean;
}

function generateSku(name: string = ""): string {
  const prefix = "CKH";
  const clean = name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 4);
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return clean ? `${prefix}-${clean}-${randomSuffix}` : `${prefix}-${randomSuffix}`;
}

export function ProductForm({
  initialData,
  categories,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    shortDescription: initialData?.shortDescription || "",
    price: initialData?.price || "",
    compareAtPrice: initialData?.compareAtPrice || "",
    sku: initialData?.sku || (isEditing ? "" : generateSku(initialData?.name || "")),
    categoryId: initialData?.categoryId || categories[0]?.id || "",
    stock: initialData?.stock || 10,
    status: initialData?.status || "ACTIVE",
    availability: initialData?.availability || "IN_STOCK",
    hairType: initialData?.hairType || "Virgin Human Hair",
    texture: initialData?.texture || "Body Wave",
    formats: initialData?.formats
      ? typeof initialData.formats === "string"
        ? JSON.parse(initialData.formats).join(", ")
        : Array.isArray(initialData.formats)
        ? initialData.formats.join(", ")
        : ""
      : "Braiding Hair, Weft",
    lengths: initialData?.lengths
      ? JSON.parse(initialData.lengths).join(", ")
      : '16", 18", 20", 22", 24"',
    colors: initialData?.colors
      ? JSON.parse(initialData.colors).join(", ")
      : "Natural Black, Jet Black",
    featured: initialData?.featured ?? false,
    bestseller: initialData?.bestseller ?? false,
    isNew: initialData?.isNew ?? false,
    preorderEnabled: initialData?.preorderEnabled ?? false,
    preorderDuration: initialData?.preorderDuration || "2–4 weeks",
    preorderLimit: initialData?.preorderLimit || "",
  });

  const [images, setImages] = useState<string[]>(
    initialData?.images?.map((i: any) => i.url) || [
      "/ck-hair/ck-hair-01.jpeg",
    ]
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "name") {
      setFormData((prev) => {
        const generatedSlug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

        // Auto-generate SKU on name entry for new products or empty SKU
        const shouldUpdateSku = !isEditing && (!prev.sku || prev.sku.startsWith("CKH-"));
        return {
          ...prev,
          name: value,
          slug: !isEditing ? generatedSlug : prev.slug,
          sku: shouldUpdateSku ? generateSku(value) : prev.sku,
        };
      });
    } else if (name === "stock") {
      const parsed = parseInt(value);
      if (!isNaN(parsed) && parsed > 0) {
        setFormData((prev) => ({
          ...prev,
          stock: parsed,
          availability: prev.availability === "PREORDER" ? "IN_STOCK" : prev.availability,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          stock: value === "" ? "" : 0,
          availability: "PREORDER",
          preorderEnabled: true,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");

    try {
      const parsedLengths = formData.lengths
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
      const parsedColors = formData.colors
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
      const parsedFormats = formData.formats
        ? formData.formats
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [];

      const payload = {
        ...formData,
        formats: parsedFormats,
        lengths: parsedLengths,
        colors: parsedColors,
        images,
      };

      const url = isEditing
        ? `/api/products/${initialData.id}`
        : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to save product");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white border border-brand-border text-brand-dark hover:bg-brand-sand transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif-luxury text-2xl font-bold text-brand-dark">
              {isEditing ? `Edit: ${initialData?.name}` : "ADD NEW LUXURY PRODUCT"}
            </h1>
            <p className="text-xs text-brand-muted">
              Configure product details, variants, images, and pre-order parameters.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 rounded-xl border border-brand-border bg-white text-xs font-semibold uppercase tracking-wider text-brand-dark hover:border-brand-dark transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-2 shadow-xs active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save & Publish"}</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Left Info */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* General Information */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border/60 shadow-xs space-y-4">
            <h2 className="font-serif-luxury text-lg font-bold text-brand-dark border-b border-brand-border/60 pb-2">
              General Product Information
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Product Title *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. CK Signature Body Wave Wig"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider block">
                  SKU (Stock Keeping Unit)
                </label>
                <input
                  type="text"
                  name="sku"
                  disabled
                  value={formData.sku}
                  placeholder="Auto-generated SKU"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border/80 text-xs font-mono font-semibold tracking-wider bg-stone-100 text-stone-600 cursor-not-allowed select-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Category *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.parent ? `${c.parent.name} → ${c.name}` : c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Short Tagline / Teaser
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="e.g. 100% Raw single-donor bundles with natural bounce."
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Detailed Product Description *
              </label>
              <textarea
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Comprehensive description regarding cuticle alignment, lace melting, hair origin, and longevity..."
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              />
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border/60 shadow-xs space-y-4">
            <h2 className="font-serif-luxury text-lg font-bold text-brand-dark border-b border-brand-border/60 pb-2">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Price (₦) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="185000"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Compare At Price (₦)
                </label>
                <input
                  type="number"
                  name="compareAtPrice"
                  value={formData.compareAtPrice}
                  onChange={handleChange}
                  placeholder="210000"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Stock Units (if in-stock)
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>
            </div>
          </div>

          {/* Hair Attributes & Variants */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border/60 shadow-xs space-y-4">
            <h2 className="font-serif-luxury text-lg font-bold text-brand-dark border-b border-brand-border/60 pb-2">
              Hair Attributes & Sizes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Hair Type / Origin
                </label>
                <input
                  type="text"
                  name="hairType"
                  value={formData.hairType}
                  onChange={handleChange}
                  placeholder="e.g. 100% Raw Vietnamese Hair"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  Hair Texture
                </label>
                <input
                  type="text"
                  name="texture"
                  value={formData.texture}
                  onChange={handleChange}
                  placeholder="e.g. Body Wave, Bone Straight"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Hair Formats / Types (e.g. Braiding Hair, Weft)
              </label>
              <input
                type="text"
                name="formats"
                value={formData.formats}
                onChange={handleChange}
                placeholder="e.g. Braiding Hair, Weft"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Available Lengths (comma separated)
              </label>
              <input
                type="text"
                name="lengths"
                value={formData.lengths}
                onChange={handleChange}
                placeholder='14", 16", 18", 20", 22", 24", 26", 28"'
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Available Colors (comma separated)
              </label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                placeholder="Natural Black, Jet Black, Chestnut Brown"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              />
            </div>
          </div>

          {/* Product Images Gallery with Cloudinary */}
          <CloudinaryImageUploader
            images={images}
            onChange={setImages}
            folder="ck-hair/products"
            label="Product Image Showcase"
            description="Upload multiple high-definition photos directly to Cloudinary or paste web image URLs."
          />

        </div>

        {/* Right Settings Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status & Availability */}
          <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-4">
            <h2 className="font-serif-luxury text-base font-bold text-brand-dark border-b border-brand-border/60 pb-2">
              Visibility & Stock Status
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Store Visibility Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              >
                <option value="ACTIVE">ACTIVE (Published publicly)</option>
                <option value="DISABLED">DISABLED (Hidden from public store)</option>
                <option value="DRAFT">DRAFT</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                Availability Mode
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
              >
                <option value="IN_STOCK">IN STOCK (Immediate Dispatch)</option>
                <option value="PREORDER">PRE-ORDER (Artisan Preparation)</option>
                <option value="OUT_OF_STOCK">OUT OF STOCK</option>
              </select>
            </div>
          </div>

          {/* Pre-Order Configuration Box */}
          <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-brand-dark border-b border-brand-border/60 pb-2">
              <Clock className="w-4 h-4 text-brand-gold" />
              <h2 className="font-serif-luxury text-base font-bold">
                Pre-Order Engine
              </h2>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-dark">
              <input
                type="checkbox"
                name="preorderEnabled"
                checked={formData.preorderEnabled}
                onChange={handleChange}
                className="w-4 h-4 accent-brand-dark"
              />
              <span>Enable Pre-Order for this Product</span>
            </label>

            {formData.preorderEnabled && (
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                    Fulfillment Timeline
                  </label>
                  <input
                    type="text"
                    name="preorderDuration"
                    value={formData.preorderDuration}
                    onChange={handleChange}
                    placeholder="e.g. 2–4 weeks"
                    className="w-full px-4 py-2 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                    Max Pre-Order Capacity Limit
                  </label>
                  <input
                    type="number"
                    name="preorderLimit"
                    value={formData.preorderLimit}
                    onChange={handleChange}
                    placeholder="e.g. 20"
                    className="w-full px-4 py-2 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Badges & Highlights */}
          <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-3">
            <h2 className="font-serif-luxury text-base font-bold text-brand-dark border-b border-brand-border/60 pb-2">
              Marketing Badges
            </h2>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-brand-dark">
              <input
                type="checkbox"
                name="bestseller"
                checked={formData.bestseller}
                onChange={handleChange}
                className="w-4 h-4 accent-brand-dark"
              />
              <span>Mark as Bestseller Unit</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-brand-dark">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 accent-brand-dark"
              />
              <span>Feature on Homepage</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-brand-dark">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleChange}
                className="w-4 h-4 accent-brand-dark"
              />
              <span>Mark as New Arrival Drop</span>
            </label>
          </div>

        </div>

      </div>
    </form>
  );
}
