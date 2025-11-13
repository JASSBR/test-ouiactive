"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FindByPhotoPage() {
  const router = useRouter()
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [searching, setSearching] = useState(false)
  const [candidates, setCandidates] = useState<Array<{ id: string; url: string; alt?: string; associatedExercise?: { id: string } | null }>>([])
  const [message, setMessage] = useState<string | null>(null)

  async function handleFile(file: File | null) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string
      setPhotoPreview(dataUrl)
      const base64 = dataUrl.split(",")[1]
      setSearching(true)
      try {
        const res = await fetch("/api/image-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64 }),
        })
        const data = await res.json()
        // Only keep candidates that are mapped to an exercise
        const mapped = (data.candidates || []).filter((c: any) => c.associatedExercise && c.associatedExercise.id)
        setCandidates(mapped)
        if (data.matched && data.matched.associatedExercise && data.matched.associatedExercise.id) {
          // put the matched exercise first if present
          setCandidates((prev) => [data.matched, ...prev.filter((p) => p.id !== data.matched.id)])
          setMessage(null)
        } else if (mapped.length === 0) {
          setMessage("Aucun exercice trouvé pour cette image.")
        } else {
          setMessage(null)
        }
      } catch (e) {
        console.error(e)
        setMessage("Erreur lors de la recherche.")
      } finally {
        setSearching(false)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-3">
          <Link href="/" className="text-sm text-slate-700">← Accueil</Link>
          <h1 className="text-lg font-bold text-slate-900 ml-3">Trouver ton exercice par photo</h1>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
          <p className="text-sm text-slate-600 mb-4">Prends une photo du support d'exercice (tableau, feuille) et DinoBot proposera des exercices correspondants.</p>

          <div className="space-y-4">
            <input type="file" accept="image/*" capture="environment" onChange={(e) => handleFile(e.target.files ? e.target.files[0] : null)} />

            {photoPreview && (
              <div className="border rounded p-2">
                <img src={photoPreview} alt="preview" className="w-full object-contain" />
              </div>
            )}

            {searching && <div>Recherche en cours...</div>}

            {message && <div className="text-sm text-slate-700">{message}</div>}

            {!searching && candidates.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Exercices trouvés</h3>
                <div className="grid grid-cols-2 gap-3">
                  {candidates.map((c) => (
                    <div key={c.id} className="border rounded overflow-hidden">
                      <img src={c.url} alt={c.alt} className="w-full h-32 object-cover" />
                      <div className="p-2 flex items-center justify-between">
                        <div className="text-xs text-slate-600 truncate">{c.alt}</div>
                        <div className="flex gap-2">
                          <button onClick={() => router.push(`/fiches/revision?exerciseId=${c.associatedExercise?.id}`)} className="px-2 py-1 rounded bg-blue-600 text-white text-xs">Ouvrir</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* This page is search-only; no inline association controls */}
          </div>
        </div>
      </main>
    </div>
  )
}
