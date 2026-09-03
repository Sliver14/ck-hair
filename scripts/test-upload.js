const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Read .env
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
let rawUrl = '';
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (trimmed.startsWith('CLOUDINARY_URL=')) {
    rawUrl = trimmed.substring('CLOUDINARY_URL='.length).trim().replace(/^['"]|['"]$/g, '');
  }
}

let cleaned = rawUrl.trim().replace(/^['"]|['"]$/g, "");
if (cleaned.startsWith("CLOUDINARY_URL=")) {
  cleaned = cleaned.replace("CLOUDINARY_URL=", "").trim().replace(/^['"]|['"]$/g, "");
}
const match = cleaned.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
const [, apiKey, apiSecret, cloudName] = match;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

async function run() {
  const samplePath = path.join(__dirname, '..', 'public', 'ck-hair', 'ck-hair-01.jpeg');
  const buffer = fs.readFileSync(samplePath);

  console.log("Uploading test image to Cloudinary...");
  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "ck-hair/test-uploads",
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
    uploadStream.end(buffer);
  });

  console.log("SUCCESS! Secure URL:", result.secure_url);
}

run().catch(console.error);
