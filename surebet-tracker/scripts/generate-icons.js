import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Simple 1x1 indigo pixel PNG as base
// We'll create larger icons by repeating this
function createPNG(size) {
  // PNG header for a simple colored square
  // This creates a minimal valid PNG file

  const width = size;
  const height = size;

  // Create PNG data
  const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);   // width
  ihdrData.writeUInt32BE(height, 4);  // height
  ihdrData.writeUInt8(8, 8);          // bit depth
  ihdrData.writeUInt8(2, 9);          // color type (RGB)
  ihdrData.writeUInt8(0, 10);         // compression
  ihdrData.writeUInt8(0, 11);         // filter
  ihdrData.writeUInt8(0, 12);         // interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT chunk - image data
  // Create raw image data (RGB)
  const rawData = [];
  const primaryColor = [99, 102, 241]; // Indigo #6366F1
  const centerColor = [248, 250, 252]; // White #F8FAFC

  for (let y = 0; y < height; y++) {
    rawData.push(0); // filter byte
    for (let x = 0; x < width; x++) {
      // Simple target/crosshair pattern
      const centerX = width / 2;
      const centerY = height / 2;
      const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      const radius = width * 0.35;
      const innerRadius = width * 0.15;

      // Check if on crosshair lines
      const onCross = (Math.abs(x - centerX) < width * 0.06 && (y < height * 0.25 || y > height * 0.75)) ||
                      (Math.abs(y - centerY) < height * 0.06 && (x < width * 0.25 || x > width * 0.75));

      // Check if on circle ring
      const onRing = dist > radius * 0.85 && dist < radius * 1.15;

      // Check if in center dot
      const inCenter = dist < innerRadius;

      if (onCross || onRing || inCenter) {
        rawData.push(centerColor[0], centerColor[1], centerColor[2]);
      } else {
        rawData.push(primaryColor[0], primaryColor[1], primaryColor[2]);
      }
    }
  }

  // Compress with zlib
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(Buffer.from(rawData));
  const idatChunk = createChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([PNG_SIGNATURE, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuffer = Buffer.from(type);
  const crcData = Buffer.concat([typeBuffer, data]);

  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcData), 0);

  return Buffer.concat([length, typeBuffer, data, crc]);
}

function crc32(data) {
  let crc = 0xFFFFFFFF;
  const table = [];

  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }

  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }

  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Generate icons
const sizes = [16, 48, 128];
const iconsDir = resolve(__dirname, '..', 'public', 'icons');

sizes.forEach(size => {
  const png = createPNG(size);
  const path = resolve(iconsDir, `icon${size}.png`);
  writeFileSync(path, png);
  console.log(`Created ${path}`);
});

console.log('Icons generated successfully!');
