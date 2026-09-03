import React from "react";
import { HairLoader } from "@/components/ui/HairLoader";

export default function AdminLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <HairLoader
        size="md"
        text="CK HAIR ADMIN"
        subtext="Loading dashboard intelligence..."
      />
    </div>
  );
}
