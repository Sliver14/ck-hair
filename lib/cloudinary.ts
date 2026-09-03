import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Helper to parse CLOUDINARY_URL
function getCloudinaryCredentials() {
  const rawUrl = process.env.CLOUDINARY_URL;
  if (rawUrl) {
    let cleaned = rawUrl.trim().replace(/^['"]|['"]$/g, "");
    if (cleaned.startsWith("CLOUDINARY_URL=")) {
      cleaned = cleaned.replace("CLOUDINARY_URL=", "").trim().replace(/^['"]|['"]$/g, "");
    }
    const match = cleaned.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
    if (match) {
      return {
        api_key: match[1],
        api_secret: match[2],
        cloud_name: match[3],
      };
    }
  }

  return {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };
}

const creds = getCloudinaryCredentials();

if (creds.cloud_name && creds.api_key && creds.api_secret) {
  cloudinary.config({
    cloud_name: creds.cloud_name,
    api_key: creds.api_key,
    api_secret: creds.api_secret,
    secure: true,
  });
}

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  folder: string = "ck-hair/products"
): Promise<CloudinaryUploadResult> {
  const activeCreds = getCloudinaryCredentials();

  if (!activeCreds.cloud_name || !activeCreds.api_key || !activeCreds.api_secret) {
    throw new Error(
      "Cloudinary is not configured. Please set a valid CLOUDINARY_URL in your .env file."
    );
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          { quality: "auto", fetch_format: "auto" },
        ],
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          reject(error || new Error("Failed to upload image to Cloudinary"));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        }
      }
    );

    uploadStream.end(buffer);
  });
}

export { cloudinary };
