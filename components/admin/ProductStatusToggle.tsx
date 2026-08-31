"use client";

import React, { useState } from "react";

interface ProductStatusToggleProps {
  productId: string;
  initialStatus: string;
}

export function ProductStatusToggle({
  productId,
  initialStatus,
}: ProductStatusToggleProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = async () => {
    setIsLoading(true);
    const newStatus = status === "ACTIVE" ? "DISABLED" : "ACTIVE";
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={isLoading}
      className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border transition-all ${
        status === "ACTIVE"
          ? "bg-green-50 text-green-800 border-green-200 hover:bg-green-100"
          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
      }`}
      title="Click to toggle status"
    >
      {isLoading ? "..." : status}
    </button>
  );
}
