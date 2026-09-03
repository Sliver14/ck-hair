"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  Star,
  ArrowLeft,
  ArrowRight,
  Plus,
  Link as LinkIcon,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface CloudinaryImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
  maxFiles?: number;
  label?: string;
  description?: string;
}

export function CloudinaryImageUploader({
  images,
  onChange,
  folder = "ck-hair/products",
  maxFiles = 10,
  label = "Product Images Gallery",
  description = "Upload high-definition hair photos via Cloudinary or paste direct image URLs.",
}: CloudinaryImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");

  const handleFiles = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length === 0) {
      setErrorMsg("Please select valid image files (JPG, PNG, WebP, etc.)");
      return;
    }

    if (images.length + validFiles.length > maxFiles) {
      setErrorMsg(`Maximum of ${maxFiles} images allowed per product.`);
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setIsUploading(true);
    setUploadProgress(`Uploading ${validFiles.length} image${validFiles.length > 1 ? "s" : ""} to Cloudinary...`);

    try {
      const formData = new FormData();
      formData.append("folder", folder);
      validFiles.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload to Cloudinary");
      }

      if (data.urls && data.urls.length > 0) {
        onChange([...images, ...data.urls]);
        setSuccessMsg(`Successfully uploaded ${data.urls.length} image${data.urls.length > 1 ? "s" : ""} to Cloudinary!`);
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setErrorMsg(err.message || "Failed to upload image. Make sure Cloudinary credentials are set.");
    } finally {
      setIsUploading(false);
      setUploadProgress("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      setErrorMsg("Please enter a valid HTTP or HTTPS image URL.");
      return;
    }
    if (images.includes(trimmed)) {
      setErrorMsg("This image URL is already in the gallery.");
      return;
    }
    setErrorMsg("");
    onChange([...images, trimmed]);
    setUrlInput("");
    setSuccessMsg("Image URL added to gallery.");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const setCoverImage = (idx: number) => {
    if (idx === 0) return;
    const selected = images[idx];
    const rest = images.filter((_, i) => i !== idx);
    onChange([selected, ...rest]);
    setSuccessMsg("Cover image updated.");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const moveImage = (idx: number, direction: "left" | "right") => {
    const targetIdx = direction === "left" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    const updated = [...images];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange(updated);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-border/60 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border/60 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif-luxury text-lg font-bold text-brand-dark">
              {label}
            </h2>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#EAD7C3]/60 text-brand-dark">
              Cloudinary Powered
            </span>
          </div>
          <p className="text-xs text-brand-muted mt-0.5">
            {description}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-[#FAF6F2] p-1 rounded-xl border border-brand-border/60 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === "upload"
                ? "bg-white text-brand-dark shadow-2xs"
                : "text-brand-muted hover:text-brand-dark"
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === "url"
                ? "bg-white text-brand-dark shadow-2xs"
                : "text-brand-muted hover:text-brand-dark"
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Paste URL</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">{errorMsg}</p>
            {errorMsg.includes("credentials") && (
              <p className="mt-1 text-[11px] text-red-600">
                Tip: Add <code className="bg-red-100 px-1 py-0.5 rounded">CLOUDINARY_CLOUD_NAME</code>,{" "}
                <code className="bg-red-100 px-1 py-0.5 rounded">CLOUDINARY_API_KEY</code>, and{" "}
                <code className="bg-red-100 px-1 py-0.5 rounded">CLOUDINARY_API_SECRET</code> to your <code className="bg-red-100 px-1 py-0.5 rounded">.env</code> file.
              </p>
            )}
          </div>
        </div>
      )}

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Uploader Dropzone / Input Section */}
      {activeTab === "upload" ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all ${
            isDragOver
              ? "border-[#B76E79] bg-[#B76E79]/5 scale-[0.99]"
              : "border-brand-border bg-[#FAF6F2]/60 hover:bg-[#FAF6F2] hover:border-brand-dark/40"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            disabled={isUploading}
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
            id="cloudinary-file-input"
          />

          <div className="max-w-md mx-auto flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white border border-brand-border/80 flex items-center justify-center text-brand-dark shadow-xs">
              {isUploading ? (
                <Loader2 className="w-7 h-7 text-[#B76E79] animate-spin" />
              ) : (
                <UploadCloud className="w-7 h-7 text-brand-dark" />
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-brand-dark">
                {isUploading ? uploadProgress : "Drop your hair product photos here"}
              </p>
              <p className="text-xs text-brand-muted font-light">
                Supports JPG, PNG, WebP up to 10MB per file
              </p>
            </div>

            <label
              htmlFor="cloudinary-file-input"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-dark text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer ${
                isUploading ? "opacity-50 pointer-events-none" : "hover:bg-black active:scale-98"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isUploading ? "Uploading..." : "Browse Files"}</span>
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Paste direct Cloudinary or image URL (e.g. https://res.cloudinary.com/...)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddUrl();
                }
              }}
              className="flex-1 px-4 py-2.5 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-dark bg-[#FAFAF8]"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="px-5 py-2.5 bg-brand-dark text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add URL</span>
            </button>
          </div>
        </div>
      )}

      {/* Gallery Grid Preview */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
            Gallery Images ({images.length})
          </h3>
          {images.length > 0 && (
            <p className="text-[11px] text-brand-muted">
              First image serves as the main Cover photo.
            </p>
          )}
        </div>

        {images.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-[#FAF6F2] border border-brand-border/40 text-brand-muted text-xs">
            <ImageIcon className="w-8 h-8 mx-auto text-brand-muted/50 mb-2" />
            <p>No images added yet. Upload files above to build your product showcase.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#FAF6F2] border transition-all ${
                  idx === 0
                    ? "border-brand-dark ring-2 ring-brand-dark/20 shadow-sm"
                    : "border-brand-border hover:border-brand-dark/60 hover:shadow-md"
                }`}
              >
                <img
                  src={img}
                  alt={`Product Preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Top badges & controls */}
                <div className="absolute top-2 inset-x-2 flex items-center justify-between">
                  {idx === 0 ? (
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider bg-brand-dark text-white px-2 py-0.5 rounded-full font-bold shadow-xs">
                      <Star className="w-2.5 h-2.5 fill-current text-[#B76E79]" />
                      Cover
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCoverImage(idx)}
                      className="text-[9px] uppercase tracking-wider bg-black/60 hover:bg-black text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs font-semibold"
                      title="Set as main cover image"
                    >
                      Make Cover
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                    title="Delete image"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Bottom Reorder Controls */}
                <div className="absolute bottom-2 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveImage(idx, "left")}
                    className={`p-1 rounded-full bg-white/90 text-brand-dark backdrop-blur-xs shadow-xs ${
                      idx === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white"
                    }`}
                    title="Move left"
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] font-mono font-bold text-white bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    #{idx + 1}
                  </span>
                  <button
                    type="button"
                    disabled={idx === images.length - 1}
                    onClick={() => moveImage(idx, "right")}
                    className={`p-1 rounded-full bg-white/90 text-brand-dark backdrop-blur-xs shadow-xs ${
                      idx === images.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white"
                    }`}
                    title="Move right"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
