import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const profileImage = join(publicDir, 'profile.jpg');

const sizes = [
  { name: 'favicon-16.png', size: 16 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'favicon-48.png', size: 48 },
  { name: 'favicon-64.png', size: 64 },
  { name: 'favicon-180.png', size: 180 },  // Apple touch icon
  { name: 'favicon-192.png', size: 192 },  // Android
  { name: 'favicon-512.png', size: 512 },  // PWA
];

async function generateFavicons() {
  console.log('Generating favicons from profile image...');

  for (const { name, size } of sizes) {
    await sharp(profileImage)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(join(publicDir, name));

    console.log(`✓ Created ${name} (${size}x${size})`);
  }

  // Create favicon.ico (multi-size ICO)
  // For .ico we'll just use 32x32 as it's the most common
  await sharp(profileImage)
    .resize(32, 32, { fit: 'cover', position: 'center' })
    .png()
    .toFile(join(publicDir, 'favicon.png'));

  console.log('✓ Created favicon.png (32x32)');
  console.log('\nDone! All favicons generated.');
}

generateFavicons().catch(console.error);
