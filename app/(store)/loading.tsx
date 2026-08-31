import React from "react";
import { HairLoader } from "@/components/ui/HairLoader";

export default function StoreLoading() {
  return (
    <div className="min-h-[70vh] bg-[#FAF6F2] flex items-center justify-center p-6">
      <HairLoader
        size="md"
        text="CURATING YOUR COLLECTION"
        subtext="Loading luxury hair pieces & textures..."
      />
    </div>
  );
}
