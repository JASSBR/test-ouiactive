"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Camera, Upload, X } from "lucide-react"
import type { ImageMeta, ImageSearchResponse } from "@/types"

export default function FindByPhotoPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [searching, setSearching] = useState(false)
  const [candidates, setCandidates] = useState<ImageMeta[]>([])
  const [message, setMessage] = useState<string | null>(null)

  async function handleFile(file: File | null) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (e: ProgressEvent<FileReader>) => {
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
        const data = await res.json() as ImageSearchResponse
        // Only keep candidates that are mapped to an exercise
        const mapped = (data.candidates || []).filter((c: ImageMeta) => c.associatedExercise && c.associatedExercise.id)
        setCandidates(mapped)
        if (data.matched && data.matched.associatedExercise && data.matched.associatedExercise.id) {
          // put the matched exercise first if present
          setCandidates((prev: ImageMeta[]) => [data.matched!, ...prev.filter((p: ImageMeta) => p.id !== data.matched!.id)])
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

  const handleRemovePhoto = () => {
    setPhotoPreview(null)
    setCandidates([])
    setMessage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-green-100">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-3">
          <Link href="/" className="text-sm text-slate-700">← Accueil</Link>
          <h1 className="text-lg font-bold text-slate-900 ml-3">Trouver ton exercice par photo</h1>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
          <p className="text-sm text-slate-600 mb-6">Prends une photo du support d'exercice (tableau, feuille) et DinoBot proposera des exercices correspondants.</p>

          <div className="space-y-4">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e.target.files ? e.target.files[0] : null)}
              className="hidden"
              id="file-upload"
            />

            {/* Custom Upload UI */}
            {!photoPreview ? (
              <div className="space-y-3">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-green-300 rounded-xl cursor-pointer bg-green-50 hover:bg-green-100 transition-all duration-200 group"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-3 text-green-500 group-hover:text-green-600 transition-colors" />
                    <p className="mb-2 text-sm text-slate-700 font-semibold">
                      <span className="text-green-600">Clique pour télécharger</span> ou glisse une image
                    </p>
                    <p className="text-xs text-slate-500">PNG, JPG, JPEG (MAX. 10MB)</p>
                  </div>
                </label>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-xs text-slate-500 font-medium">OU</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Camera className="w-5 h-5" />
                  Prendre une photo
                </button>
              </div>
            ) : (
              <div className="relative border-2 border-green-200 rounded-xl overflow-hidden bg-slate-50">
                <button
                  onClick={handleRemovePhoto}
                  className="absolute top-3 right-3 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
                  aria-label="Supprimer la photo"
                >
                  <X className="w-4 h-4" />
                </button>
                <img src={photoPreview} alt="preview" className="w-full object-contain max-h-96" />
              </div>
            )}

            {searching && (
              <div className="flex items-center justify-center gap-3 py-4">
                <div className="w-5 h-5 border-3 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-slate-700 font-medium">Recherche en cours...</span>
              </div>
            )}

            {message && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">{message}</p>
              </div>
            )}

            {!searching && candidates.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Exercices trouvés</h3>
                <div className="grid grid-cols-2 gap-3">
                  {candidates.map((c: ImageMeta) => (
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
