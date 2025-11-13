"use client"

import { ArrowLeft, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ExamGeneratorFichePage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)

  const handleGenerate = () => {
    router.push("/fiches/revision")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 px-6 py-4">
          <Link href="/fiches/creer-fiche" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/design-mode/dinobot-logo.png" alt="DinoBot" className="h-8 w-8" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Créer un exercice depuis un examen</h1>
        </div>
      </div>

      <div className="px-6 py-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors">
            <Upload className="w-16 h-16 mx-auto mb-4 text-blue-500" />
            <h3 className="text-lg font-semibold mb-2">Importez votre examen</h3>
            <p className="text-sm text-slate-600 mb-4">PDF, DOC, DOCX ou image</p>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="exam-upload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label htmlFor="exam-upload">
              <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                <span>Choisir un fichier</span>
              </Button>
            </label>
            {file && <p className="mt-4 text-sm text-blue-600 font-medium">Fichier sélectionné: {file.name}</p>}
          </div>

          <Button
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6 text-lg font-bold"
            disabled={!file}
          >
            Générer mon exercice
          </Button>
        </div>
      </div>
    </div>
  )
}
