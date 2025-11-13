"use client"

import type React from "react"

import { ArrowLeft, FileText, ChevronDown, Upload, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function FileGeneratorFichePage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)

  const handleGenerate = () => {
    router.push("/fiches/bibliotheque-media")
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/fiches/creer-fiche">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/">
            <img
              src="/images/design-mode/dinobot-logo.png"
              alt="Dinobot"
              className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>

          <Button variant="default" className="bg-purple-600 hover:bg-purple-700 text-white text-sm h-10">
            <FileText className="mr-2 h-4 w-4" />
            Exercice
          </Button>

          <Button variant="outline" className="ml-auto bg-transparent text-sm h-10">
            Matière
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-10 text-purple-600">
            Créer un exercice à partir d'une image
          </h1>

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="space-y-4">
              <input type="file" onChange={handleFileSelect} className="hidden" id="file-upload" accept="image/*" />

              <label htmlFor="file-upload">
                <div className="border-2 border-purple-300 rounded-xl p-8 text-center hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-3 text-purple-500" />
                  <h3 className="text-lg font-semibold mb-1">Importer une image</h3>
                  <p className="text-sm text-slate-600">Choisir depuis votre appareil</p>
                </div>
              </label>

              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="camera-upload"
                accept="image/*"
                capture="environment"
              />

              <label htmlFor="camera-upload">
                <div className="border-2 border-purple-300 rounded-xl p-8 text-center hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer">
                  <Camera className="w-12 h-12 mx-auto mb-3 text-purple-500" />
                  <h3 className="text-lg font-semibold mb-1">Prendre une photo</h3>
                  <p className="text-sm text-slate-600">Utiliser votre caméra</p>
                </div>
              </label>
            </div>

            {file && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-700 font-medium">Image sélectionnée: {file.name}</p>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-6 text-lg font-bold"
            >
              Bibliothèque média
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
