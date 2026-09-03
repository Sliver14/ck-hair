import React from "react";
import { HairLoader } from "@/components/ui/HairLoader";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF6F2] flex items-center justify-center p-6">
      <HairLoader
        size="lg"
        text="CK HAIR"
        subtext="Preparing luxury raw & premium fiber pieces..."
      />
    </div>
  );
}
