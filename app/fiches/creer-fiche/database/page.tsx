"use client"

import { useState } from "react"
import { BookOpen, FileText, ChevronDown, X, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DatabaseGeneratorPage() {
  const router = useRouter()

  const chapters = [
    { id: "01", name: "01 - Acides et bases" },
    { id: "02", name: "02 - Réactions d'oxydoréduction" },
    { id: "03", name: "03 - Cinétique chimique" },
    { id: "04", name: "04 - Équilibres chimiques" },
    { id: "05", name: "05 - Thermodynamique" },
  ]

  const availableParts = [
    { id: "1", name: "1- Définitions et concepts" },
    { id: "2", name: "2- Calculs de pH" },
    { id: "3", name: "3- Titrages" },
  ]

  const [selectedChapter, setSelectedChapter] = useState("01")
  const [selectedParts, setSelectedParts] = useState<string[]>(["1"])
  const [showPartsDropdown, setShowPartsDropdown] = useState(false)
  const [difficulty, setDifficulty] = useState(2)
  const [prompt, setPrompt] = useState("")

  const addPart = (partId: string) => {
    if (!selectedParts.includes(partId)) {
      setSelectedParts([...selectedParts, partId])
    }
    setShowPartsDropdown(false)
  }

  const removePart = (partId: string) => {
    setSelectedParts(selectedParts.filter((id) => id !== partId))
  }

  const handleGenerate = () => {
    ;(async () => {
      try {
        const payload = {
          title: `Chapitre ${selectedChapter} - ${selectedParts.join(",")}`,
          description: prompt,
          tags: ["chimie", `chapitre-${selectedChapter}`],
        }

        const res = await fetch("/api/exercise-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        const data = await res.json()
        if (data?.image) {
          // store in session so revision page can show it
          sessionStorage.setItem("generated_exercise_image", JSON.stringify(data.image))
        } else {
          sessionStorage.removeItem("generated_exercise_image")
        }
      } catch (e) {
        console.error("Image association error", e)
      } finally {
        router.push("/fiches/revision")
      }
    })()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0FF] via-[#FAF5FF] to-[#FFF8FF]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
          <Link href="/">
            <img
              src="/images/design-mode/dinobot-logo.png"
              alt="DinoBot"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
          <h1 className="text-sm sm:text-base md:text-lg font-bold text-slate-800 truncate">
            Créer depuis la base de données
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-5 sm:p-8 space-y-6 sm:space-y-8">
            <div className="text-center pb-3 sm:pb-4 border-b border-slate-200">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 sm:mb-2">
                Configuration de votre exercice
              </h3>
              <p className="text-sm sm:text-base text-slate-600">Personnalisez les paramètres de génération</p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-slate-700">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                Choisir un Chapitre
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-2xl bg-white shadow-md border-2 border-purple-100 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all hover:shadow-lg"
              >
                {chapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-slate-700">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                Partie
              </label>
              <div className="relative">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-white shadow-md border-2 border-purple-100 min-h-[52px] sm:min-h-[56px] transition-all hover:shadow-lg">
                  {selectedParts.map((partId) => {
                    const part = availableParts.find((p) => p.id === partId)
                    return (
                      <span
                        key={partId}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#D8C8FF] to-[#E8D8FF] text-purple-700 rounded-full text-xs sm:text-sm font-medium shadow-sm"
                      >
                        <span className="leading-tight">{part?.name}</span>
                        <button
                          className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                          onClick={() => removePart(partId)}
                        >
                          <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </span>
                    )
                  })}
                  <button
                    onClick={() => setShowPartsDropdown(!showPartsDropdown)}
                    className="ml-auto p-1 sm:p-1.5 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  </button>
                </div>

                {showPartsDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-purple-100 overflow-hidden">
                    {availableParts
                      .filter((part) => !selectedParts.includes(part.id))
                      .map((part) => (
                        <button
                          key={part.id}
                          onClick={() => addPart(part.id)}
                          className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-left text-sm sm:text-base hover:bg-purple-50 transition-colors font-medium text-slate-700"
                        >
                          {part.name}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-slate-700">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                Difficulté
              </label>
              <div className="flex items-center gap-3 sm:gap-5 bg-white rounded-2xl p-3 sm:p-4 shadow-md border-2 border-purple-100">
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                  className="flex-1 accent-purple-500 h-2 rounded-full"
                />
                <span className="text-base sm:text-lg font-bold text-purple-600 min-w-[2.5rem] sm:min-w-[3rem] text-center bg-purple-50 px-2 sm:px-3 py-1 rounded-full">
                  {difficulty}/3
                </span>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-slate-700">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                Personnaliser avec un prompt <span className="text-slate-500 text-xs font-normal">(optionnel)</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Rédigez ici vos instructions personnalisées..."
                maxLength={1000}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-2xl bg-white shadow-md border-2 border-purple-100 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none min-h-[120px] sm:min-h-[140px] resize-none transition-all hover:shadow-lg"
              />
              <div className="text-right text-xs sm:text-sm text-slate-500 font-medium">
                {prompt.length}/1000 caractères
              </div>
            </div>

            <div className="flex justify-center pt-4 sm:pt-6">
              <button
                onClick={handleGenerate}
                className="group relative bg-gradient-to-r from-[#C8D8FF] via-[#D8E4FF] to-[#E8F0FF] text-[#4B6FFF] px-10 sm:px-14 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center gap-1.5 sm:gap-2">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  Générer mon exercice
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
