import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

type ImageMeta = { id: string; url: string; alt?: string; tags?: string[] }

function readImages(): ImageMeta[] {
  const p = path.join(process.cwd(), "data", "images.json")
  try {
    const raw = fs.readFileSync(p, "utf8")
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

// Very small matching function: count tag/keyword matches
function scoreImage(img: ImageMeta, keywords: string[]) {
  const tags = (img.tags || []).map((t) => t.toLowerCase())
  let score = 0
  for (const kw of keywords) {
    const k = kw.toLowerCase()
    if (tags.includes(k)) score += 2
    if ((img.alt || "").toLowerCase().includes(k)) score += 1
    if ((img.url || "").toLowerCase().includes(k)) score += 1
  }
  return score
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Expecting { title, description, tags?: string[] }
    const { title, description, tags } = body || {}
    const images = readImages()

    const keywords = [] as string[]
    if (title) keywords.push(...String(title).split(/[^\p{L}\d]+/u).filter(Boolean))
    if (description) keywords.push(...String(description).split(/[^\p{L}\d]+/u).filter(Boolean))
    if (Array.isArray(tags)) keywords.push(...tags.map(String))

    // If no keywords, return first image as default (if any)
    if (keywords.length === 0) {
      const fallback = images[0]
      return NextResponse.json({ image: fallback ?? null })
    }

    // Score images
    const scored = images
      .map((img) => ({ img, score: scoreImage(img, keywords) }))
      .sort((a, b) => b.score - a.score)

    const best = scored.length ? scored[0] : null
    if (!best || best.score === 0) {
      // no good match -> return null so client can fallback
      return NextResponse.json({ image: null })
    }

    return NextResponse.json({ image: best.img })
  } catch (err) {
    return NextResponse.json({ image: null, error: String(err) }, { status: 500 })
  }
}

export async function GET() {
  const images = readImages()
  return NextResponse.json({ images })
}
