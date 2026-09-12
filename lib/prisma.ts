import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? [
            { emit: "event", level: "error" },
            { emit: "event", level: "warn" },
          ]
        : [{ emit: "event", level: "error" }],
  });

if (process.env.NODE_ENV === "development" && !globalForPrisma.prisma) {
  // @ts-ignore
  prisma.$on("error", (e: any) => {
    if (
      typeof e?.message === "string" &&
      (e.message.includes("kind: Closed") || e.message.includes("Closed"))
    ) {
      // Benign Neon serverless idle socket closure handled automatically by Prisma
      return;
    }
    console.error("[Prisma Error]:", e);
  });
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

