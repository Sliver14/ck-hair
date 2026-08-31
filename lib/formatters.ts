export function formatPrice(amount: number, currency: string = "NGN"): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount).replace("NGN", "₦").trim();
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(100 + Math.random() * 900);
  return `CKH-${year}${month}${day}-${random}`;
}
