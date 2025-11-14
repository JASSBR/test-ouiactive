import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import type { ImageMeta, ImageSearchResponse } from "@/types"

// Prototype image-search endpoint.
// Accepts JSON { imageBase64: string } where imageBase64 is the image data (no data: prefix).
// Saves uploaded image to public/uploads and returns candidate images from data/images.json.
// Additionally, computes a SHA256 of the uploaded image and compares against images in public
// to detect exact file matches. If a match is found, returns `matched` with image metadata.

function readImages(): ImageMeta[] {
  const p = path.join(process.cwd(), "data", "images.json")
  try {
    return JSON.parse(fs.readFileSync(p, "utf8")) as ImageMeta[]
  } catch (e) {
    return []
  }
}

function ensureUploadsDir() {
  const dir = path.join(process.cwd(), "public", "uploads")
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  return dir
}

function sha256(buffer: Buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex")
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { imageBase64 } = body || {}
    if (!imageBase64) return NextResponse.json({ error: "No image provided" }, { status: 400 })

    // Decode base64 and save
    const buffer = Buffer.from(imageBase64, "base64")
    const dir = ensureUploadsDir()
    const filename = `upload-${Date.now()}.jpg`
    const full = path.join(dir, filename)
    fs.writeFileSync(full, buffer)

    const uploadedHash = sha256(buffer)

    // Read known images and compute hashes to find exact match
    const images = readImages()
    let matched: ImageMeta | null = null

    for (const img of images) {
      try {
        const imgPath = img.url.startsWith("/") ? img.url.slice(1) : img.url
        const fullPath = path.join(process.cwd(), "public", imgPath)
        if (fs.existsSync(fullPath)) {
          const imgBuf = fs.readFileSync(fullPath)
          const h = sha256(imgBuf)
          if (h === uploadedHash) {
            matched = img
            break
          }
        }
      } catch (e) {
        // skip file read errors
      }
    }

    // Return candidate images (for now simply return all images as suggestions)
    const candidates = images

    return NextResponse.json<ImageSearchResponse>({ uploaded: `/uploads/${filename}`, candidates, matched })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function GET() {
  const images = readImages()
  return NextResponse.json({ images })
}
