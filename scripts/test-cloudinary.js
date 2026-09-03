const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Read .env file manually
const envPath = path.join(__dirname, '..', '.env');
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

let cloudinaryUrl = '';
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (trimmed.startsWith('CLOUDINARY_URL=')) {
    cloudinaryUrl = trimmed.substring('CLOUDINARY_URL='.length).trim().replace(/^['"]|['"]$/g, '');
  }
}

console.log("Found CLOUDINARY_URL in .env:", Boolean(cloudinaryUrl));

if (cloudinaryUrl) {
  let cleaned = cloudinaryUrl.trim().replace(/^['"]|['"]$/g, '');
  if (cleaned.startsWith('CLOUDINARY_URL=')) {
    cleaned = cleaned.replace('CLOUDINARY_URL=', '').trim().replace(/^['"]|['"]$/g, '');
  }

  const match = cleaned.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
  if (match) {
    const [, apiKey, apiSecret, cloudName] = match;
    console.log("Parsed Cloud Name:", cloudName);
    console.log("Parsed API Key:", apiKey);
    console.log("Parsed API Secret:", apiSecret ? `${apiSecret.substring(0, 4)}***` : "None");

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    cloudinary.api.ping((err, res) => {
      if (err) {
        console.error("Cloudinary Ping Error (HTTP status/message):", err.http_code, err.message);
      } else {
        console.log("Cloudinary Ping SUCCESS:", res);
      }
    });
  } else {
    console.log("Invalid format. Value starts with:", cleaned.substring(0, 20));
  }
} else {
  console.log("No CLOUDINARY_URL found in .env");
}
