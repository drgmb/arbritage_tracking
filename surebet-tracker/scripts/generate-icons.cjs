const { writeFileSync, mkdirSync, existsSync } = require('fs');
const { resolve } = require('path');
const zlib = require('zlib');

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

function createPNG(size) {
  const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);
  ihdrData.writeUInt32BE(size, 4);
  ihdrData.writeUInt8(8, 8);   // bit depth
  ihdrData.writeUInt8(2, 9);   // RGB
  ihdrData.writeUInt8(0, 10);  // compression
  ihdrData.writeUInt8(0, 11);  // filter
  ihdrData.writeUInt8(0, 12);  // interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Create image data
  const rawData = [];
  const primary = [99, 102, 241];   // #6366F1
  const white = [248, 250, 252];    // #F8FAFC

  const center = size / 2;
  const outerRadius = size * 0.38;
  const innerRadius = size * 0.15;
  const ringWidth = size * 0.08;
  const crossWidth = size * 0.08;

  for (let y = 0; y < size; y++) {
    rawData.push(0); // filter byte
    for (let x = 0; x < size; x++) {
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Check if on ring
      const onRing = dist >= outerRadius - ringWidth && dist <= outerRadius;
      // Check if in center dot
      const inCenter = dist <= innerRadius;
      // Check if on cross arms (not in center area)
      const onVerticalCross = Math.abs(dx) <= crossWidth && (dy < -outerRadius * 0.4 || dy > outerRadius * 0.4);
      const onHorizontalCross = Math.abs(dy) <= crossWidth && (dx < -outerRadius * 0.4 || dx > outerRadius * 0.4);
      const onCross = onVerticalCross || onHorizontalCross;

      if (onRing || inCenter || onCross) {
        rawData.push(white[0], white[1], white[2]);
      } else {
        rawData.push(primary[0], primary[1], primary[2]);
      }
    }
  }

  const compressed = zlib.deflateSync(Buffer.from(rawData));
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([PNG_SIGNATURE, ihdrChunk, idatChunk, iendChunk]);
}

const iconsDir = resolve(__dirname, '..', 'public', 'icons');
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

[16, 48, 128].forEach(size => {
  const png = createPNG(size);
  const path = resolve(iconsDir, `icon${size}.png`);
  writeFileSync(path, png);
  console.log(`Created ${path}`);
});

console.log('Done!');
