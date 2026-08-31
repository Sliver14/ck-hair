"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string; // unique item key
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  variantName?: string | null;
  length?: string | null;
  color?: string | null;
  texture?: string | null;
  quantity: number;
  isPreorder: boolean;
  preorderDuration?: string | null;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id"> & { id?: string }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalCount: number;
  hasPreorderItems: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "ck_hair_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
    setIsHydrated(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [items, isHydrated]);

  const addItem = (itemToAdd: Omit<CartItem, "id"> & { id?: string }) => {
    const itemKey =
      itemToAdd.id ||
      `${itemToAdd.productId}-${itemToAdd.variantName || "standard"}-${itemToAdd.isPreorder ? "pre" : "reg"}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += itemToAdd.quantity;
        return updated;
      }
      return [...prev, { ...itemToAdd, id: itemKey }];
    });

    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const hasPreorderItems = items.some((item) => item.isPreorder);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        totalCount,
        hasPreorderItems,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
