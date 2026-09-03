const fs = require('fs');
const path = require('path');
const { uploadBufferToCloudinary } = require('../lib/cloudinary');

async function testUpload() {
  // Read an existing local image from public/ck-hair/ck-hair-01.jpeg
  const samplePath = path.join(__dirname, '..', 'public', 'ck-hair', 'ck-hair-01.jpeg');
  const buffer = fs.readFileSync(samplePath);

  console.log("Testing upload to Cloudinary using CLOUDINARY_URL...");
  const result = await uploadBufferToCloudinary(buffer, "ck-hair/test-uploads");
  console.log("Upload SUCCESS! Result:", result);
}

testUpload().catch(console.error);
