const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

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

async function diagnose() {
  console.log("Checking Cloudinary account usage details...");
  cloudinary.api.usage((err, res) => {
    if (err) {
      console.error("Usage Error:", err);
    } else {
      console.log("Account Usage Details:", JSON.stringify(res, null, 2));
    }
  });
}

diagnose();
