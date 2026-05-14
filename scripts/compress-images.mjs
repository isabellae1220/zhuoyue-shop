import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '../public')
const DIRS = ['goods', 'mascot']
const MAX_WIDTH = 800
const MAX_BYTES = 200 * 1024

async function compress(filePath) {
  const before = (await stat(filePath)).size
  const img = sharp(filePath)
  const meta = await img.metadata()

  await img
    .resize(meta.width > MAX_WIDTH ? MAX_WIDTH : undefined, null, { withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(filePath + '.tmp')

  // If tmp is still over 200KB, reduce quality further
  let tmpSize = (await stat(filePath + '.tmp')).size
  if (tmpSize > MAX_BYTES) {
    const quality = Math.floor(82 * (MAX_BYTES / tmpSize) * 0.95)
    await sharp(filePath)
      .resize(meta.width > MAX_WIDTH ? MAX_WIDTH : undefined, null, { withoutEnlargement: true })
      .jpeg({ quality: Math.max(quality, 40), mozjpeg: true })
      .toFile(filePath + '.tmp')
    tmpSize = (await stat(filePath + '.tmp')).size
  }

  const { rename } = await import('fs/promises')
  await rename(filePath + '.tmp', filePath)

  const after = tmpSize
  const arrow = after < before ? '↓' : '='
  console.log(`${arrow} ${filePath.split('/public/')[1].padEnd(40)} ${kb(before)} → ${kb(after)}`)
}

const kb = (b) => `${Math.round(b / 1024)}KB`.padStart(7)

for (const dir of DIRS) {
  const dirPath = join(PUBLIC, dir)
  const files = (await readdir(dirPath)).filter(f => /\.(jpe?g|png|webp)$/i.test(f))
  for (const file of files) {
    await compress(join(dirPath, file))
  }
}

console.log('\n完成。')
