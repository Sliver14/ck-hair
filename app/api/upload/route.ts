import { NextRequest, NextResponse } from "next/server";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "ck-hair/products";

    const allFiles: File[] = [];
    if (singleFile && singleFile.size > 0) {
      allFiles.push(singleFile);
    }
    for (const f of files) {
      if (f && f.size > 0 && !allFiles.some((item) => item.name === f.name && item.size === f.size)) {
        allFiles.push(f);
      }
    }

    if (allFiles.length === 0) {
      return NextResponse.json(
        { error: "No image file provided for upload" },
        { status: 400 }
      );
    }

    const results = [];
    const urls: string[] = [];

    for (const file of allFiles) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: `Invalid file type: ${file.name}. Only images are supported.` },
          { status: 400 }
        );
      }

      // Max size: 10MB
      const maxSizeBytes = 10 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return NextResponse.json(
          { error: `File too large: ${file.name}. Max size is 10MB.` },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await uploadBufferToCloudinary(buffer, folder);
      results.push(uploadResult);
      urls.push(uploadResult.url);
    }

    return NextResponse.json({
      success: true,
      url: urls[0],
      urls,
      results,
      count: urls.length,
    });
  } catch (error: any) {
    console.error("Cloudinary upload API error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to upload image to Cloudinary",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
