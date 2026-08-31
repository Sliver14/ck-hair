"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderTree,
  Plus,
  Edit3,
  Trash2,
  X,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
} from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  featured: boolean;
  order: number;
  parentId: string | null;
  parent?: CategoryItem | null;
  children?: CategoryItem[];
  _count?: {
    products: number;
  };
}

interface CategoryManagerProps {
  initialCategories: CategoryItem[];
}

export function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formParentId, setFormParentId] = useState<string>("");
  const [formOrder, setFormOrder] = useState<number>(0);
  const [formFeatured, setFormFeatured] = useState<boolean>(false);

  const openAddModal = (parentId?: string) => {
    setEditingCategory(null);
    setFormName("");
    setFormSlug("");
    setFormDescription("");
    setFormImage("https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=85");
    setFormParentId(parentId || "");
    setFormOrder(categories.length + 1);
    setFormFeatured(false);
    setFeedback(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormDescription(cat.description || "");
    setFormImage(cat.image || "");
    setFormParentId(cat.parentId || "");
    setFormOrder(cat.order);
    setFormFeatured(cat.featured);
    setFeedback(null);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setFormName(val);
    if (!editingCategory) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormSlug(generatedSlug);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSlug.trim()) {
      setFeedback({ type: "error", text: "Name and URL slug are required." });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const payload = {
      name: formName,
      slug: formSlug,
      description: formDescription,
      image: formImage,
      parentId: formParentId || null,
      order: Number(formOrder),
      featured: formFeatured,
    };

    try {
      const url = editingCategory
        ? `/api/categories/${editingCategory.id}`
        : "/api/categories";
      const method = editingCategory ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save category");
      }

      // Refresh list
      const fetchRes = await fetch("/api/categories");
      const listData = await fetchRes.json();
      if (listData.categories) {
        setCategories(listData.categories);
      }

      setIsModalOpen(false);
      setFeedback({
        type: "success",
        text: `Category "${formName}" ${editingCategory ? "updated" : "created"} successfully.`,
      });
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message || "An error occurred." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (cat: CategoryItem) => {
    if (
      !confirm(
        `Are you sure you want to delete category "${cat.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setFeedback(null);
    try {
      const res = await fetch(`/api/categories/${cat.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete category");
      }

      const fetchRes = await fetch("/api/categories");
      const listData = await fetchRes.json();
      if (listData.categories) {
        setCategories(listData.categories);
      }

      setFeedback({
        type: "success",
        text: `Category "${cat.name}" deleted successfully.`,
      });
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message || "Could not delete category." });
    }
  };

  // Group top-level categories and standalone
  const topLevelCategories = categories.filter((c) => !c.parentId);
  const getSubcategories = (parentId: string) =>
    categories.filter((c) => c.parentId === parentId);

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-brand-dark">
              CATEGORY MANAGEMENT
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-sand text-brand-dark">
              {categories.length} total
            </span>
          </div>
          <p className="text-xs text-brand-muted mt-1">
            Manage top-level hair lines, subcategories, cover visuals, and storefront arrangement.
          </p>
        </div>

        <button
          onClick={() => openAddModal()}
          className="px-6 py-3 bg-brand-dark text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between gap-3 ${
            feedback.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <Check className="w-4 h-4 text-green-700 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-700 flex-shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="p-1 hover:opacity-75">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Category Tree Display */}
      <div className="space-y-6">
        {topLevelCategories.map((topCat) => {
          const subs = getSubcategories(topCat.id);

          return (
            <div
              key={topCat.id}
              className="bg-white rounded-2xl border border-brand-border/60 shadow-xs overflow-hidden"
            >
              {/* Top Level Category Header Card */}
              <div className="p-5 sm:p-6 bg-brand-sand/30 border-b border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-brand-sand border border-brand-border flex-shrink-0">
                    <img
                      src={topCat.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80"}
                      alt={topCat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-brand-dark">
                        {topCat.name}
                      </h2>
                      {topCat.featured && (
                        <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-brand-gold text-brand-dark">
                          Featured
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-brand-muted bg-white px-2 py-0.5 rounded border border-brand-border/60">
                        /{topCat.slug}
                      </span>
                    </div>
                    <p className="text-xs text-brand-muted mt-0.5 line-clamp-1">
                      {topCat.description || "Top-level collection category."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-brand-dark bg-white border border-brand-border px-3 py-1.5 rounded-xl">
                    {topCat._count?.products || 0} Direct Products • {subs.length} Subcategories
                  </span>
                  <button
                    onClick={() => openAddModal(topCat.id)}
                    className="p-2 rounded-xl bg-white border border-brand-border text-brand-dark hover:bg-brand-sand transition-colors text-xs font-semibold flex items-center gap-1.5"
                    title={`Add subcategory under ${topCat.name}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Subcategory</span>
                  </button>
                  <button
                    onClick={() => openEditModal(topCat)}
                    className="p-2 rounded-xl bg-white border border-brand-border text-brand-dark hover:bg-brand-sand transition-colors"
                    title="Edit Category"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(topCat)}
                    className="p-2 rounded-xl bg-white border border-brand-border text-brand-lightMuted hover:text-red-600 hover:border-red-200 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Subcategories Grid */}
              <div className="p-5 sm:p-6">
                {subs.length === 0 ? (
                  <p className="text-xs text-brand-muted italic py-2">
                    No subcategories added under this section yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subs.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-4 rounded-xl border border-brand-border bg-white hover:border-brand-dark/40 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg bg-brand-sand overflow-hidden flex-shrink-0 border border-brand-border/60">
                            <img
                              src={sub.image || topCat.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80"}
                              alt={sub.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h3 className="font-bold text-xs text-brand-dark truncate">
                                {sub.name}
                              </h3>
                              <span className="text-[10px] text-brand-muted font-bold flex-shrink-0">
                                {sub._count?.products || 0} pcs
                              </span>
                            </div>
                            <p className="text-[11px] text-brand-muted font-mono truncate mt-0.5">
                              /{sub.slug}
                            </p>
                            {sub.description && (
                              <p className="text-[11px] text-brand-muted line-clamp-2 mt-1 font-light">
                                {sub.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-brand-sand flex items-center justify-between text-xs">
                          <Link
                            href={`/shop/${sub.slug}`}
                            target="_blank"
                            className="text-[11px] text-brand-dark hover:text-brand-gold font-semibold flex items-center gap-1"
                          >
                            <span>View in Store</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditModal(sub)}
                              className="p-1 text-brand-muted hover:text-brand-dark transition-colors"
                              title="Edit Subcategory"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(sub)}
                              className="p-1 text-brand-lightMuted hover:text-red-500 transition-colors"
                              title="Delete Subcategory"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-border relative animate-fade-in space-y-6">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <div>
                <h2 className="font-serif-luxury text-xl font-bold text-brand-dark">
                  {editingCategory ? `Edit "${editingCategory.name}"` : "Create New Category"}
                </h2>
                <p className="text-xs text-brand-muted mt-0.5">
                  Configure classification, URL slug, and parent grouping.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-brand-sand text-brand-muted hover:text-brand-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold uppercase tracking-wider text-brand-dark">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anna Bodywave, French Curl, or Human Hair"
                  value={formName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold uppercase tracking-wider text-brand-dark">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. anna-bodywave"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8] font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold uppercase tracking-wider text-brand-dark">
                    Parent Category
                  </label>
                  <select
                    value={formParentId}
                    onChange={(e) => setFormParentId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8] cursor-pointer"
                  >
                    <option value="">None (Top-Level Category)</option>
                    {categories
                      .filter((c) => !c.parentId && (!editingCategory || c.id !== editingCategory.id))
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold uppercase tracking-wider text-brand-dark">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold uppercase tracking-wider text-brand-dark">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description for collection cards and SEO."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="font-semibold uppercase tracking-wider text-brand-dark">
                    Display Order Index
                  </label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="featCheck"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="w-4 h-4 accent-brand-dark"
                  />
                  <label htmlFor="featCheck" className="font-semibold uppercase tracking-wider text-brand-dark cursor-pointer">
                    Feature on Homepage
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl border border-brand-border hover:border-brand-dark text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 bg-brand-dark hover:bg-black text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-98 disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : editingCategory ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
