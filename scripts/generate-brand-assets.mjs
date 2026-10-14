// Generates the brand image assets the app references but cannot ship as code:
// the PWA/app icons (public/icons/) and the 1200x630 social-preview cards
// (public/og/). Run once, or whenever the source photos change:
//
//   node scripts/generate-brand-assets.mjs
//
// Everything is derived from assets already in the repo -- the wordmark
// (public/logo-transparent.png) and existing photos -- so there is no external
// design dependency. Outputs are committed; the script is kept for provenance
// and reproducibility.

import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pub = (...p) => path.join(root, 'public', ...p)

// Brand palette (see README / assets/scss/_theme.scss).
const BRAND_BLACK = { r: 10, g: 10, b: 10, alpha: 1 } // #0A0A0A
const BRAND_GOLD = '#D4AF37'

const WORDMARK = pub('logo-transparent.png')

// --- Icons ------------------------------------------------------------------
// The wordmark is a wide lockup (~2.5:1), so icons render it centred on a
// brand-black tile with padding. Black keeps the gold legible at every size
// (gold on white measures ~2:1 contrast); the opaque tile also survives both
// light and dark browser chrome.
async function makeIcon(size, outFile, padding = 0.14) {
  const box = Math.round(size * (1 - padding * 2))
  const wordmark = await sharp(WORDMARK)
    .resize(box, box, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer({ resolveWithObject: true })

  await sharp({ create: { width: size, height: size, channels: 4, background: BRAND_BLACK } })
    .composite([
      {
        input: wordmark.data,
        left: Math.round((size - wordmark.info.width) / 2),
        top: Math.round((size - wordmark.info.height) / 2)
      }
    ])
    .png()
    .toFile(outFile)

  console.log(`icon  ${size}x${size} -> ${path.relative(root, outFile)}`)
}

// --- Open Graph cards -------------------------------------------------------
// A photo cropped to 1200x630, darkened toward the bottom so the wordmark sits
// on a legible scrim, with a thin gold baseline for brand recognition.
function ogScrim(width, height) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.35" stop-color="#000000" stop-opacity="0"/>
          <stop offset="1" stop-color="#000000" stop-opacity="0.85"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#scrim)"/>
      <rect x="0" y="${height - 8}" width="${width}" height="8" fill="${BRAND_GOLD}"/>
    </svg>`
  )
}

async function makeOg(source, outFile, position = 'centre') {
  const W = 1200
  const H = 630
  const logoWidth = 320
  const margin = 64

  const logo = await sharp(WORDMARK)
    .resize({ width: logoWidth })
    .png()
    .toBuffer({ resolveWithObject: true })

  await sharp(source)
    .resize(W, H, { fit: 'cover', position })
    .composite([
      { input: ogScrim(W, H), top: 0, left: 0 },
      {
        input: logo.data,
        left: margin,
        top: H - margin - logo.info.height
      }
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outFile)

  console.log(`og    ${W}x${H}  -> ${path.relative(root, outFile)}`)
}

async function main() {
  await mkdir(pub('icons'), { recursive: true })
  await mkdir(pub('og'), { recursive: true })

  await makeIcon(32, pub('icons', 'favicon-32x32.png'), 0.08)
  await makeIcon(180, pub('icons', 'apple-touch-icon.png'))
  await makeIcon(192, pub('icons', 'icon-192x192.png'))
  await makeIcon(512, pub('icons', 'icon-512x512.png'))

  // Sources are tracked webp derivatives (public/images/webp/) so the script
  // reproduces from a clean checkout. The owner's original uploads live outside
  // the deploy in the gitignored source-images/images/ tree.
  await makeOg(pub('images', 'webp', 'image_acceuil-1920.webp'), pub('og', 'og-default.jpg'))
  await makeOg(pub('images', 'webp', 'image_acceuil-1920.webp'), pub('og', 'og-home.jpg'))
  await makeOg(pub('images', 'webp', 'craft-pdg-1-800.webp'), pub('og', 'og-about.jpg'), 'top')
  await makeOg(pub('images', 'webp', 'best4-1920.webp'), pub('og', 'og-galerie.jpg'))
  await makeOg(pub('images', 'webp', 'svc-space-best-1200.webp'), pub('og', 'og-contact.jpg'))
  await makeOg(pub('images', 'webp', 'craft-metier-1-800.webp'), pub('og', 'og-services.jpg'))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
