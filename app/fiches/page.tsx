"use client"

import { useState } from "react"
import { ChevronDown, Check, Plus } from "lucide-react"
import Link from "next/link"

export default function ToutesLesFichesPage() {
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("Mathématiques")

  const subjects = [
    { name: "Mathématiques", icon: "📐", color: "text-[#6B8EFF]", bgColor: "bg-[#EEF2FF]" },
    { name: "Physique-Chimie", icon: "🧪", color: "text-[#A855F7]", bgColor: "bg-[#FAF5FF]" },
    { name: "SVT", icon: "🌿", color: "text-[#10B981]", bgColor: "bg-[#ECFDF5]" },
    { name: "Français", icon: "📚", color: "text-[#EF4444]", bgColor: "bg-[#FEF2F2]" },
  ]

  const exercices = [
    {
      date: "jeudi, 30 oct.",
      items: [
        {
          subject: "Physique-Chimie",
          subjectColor: "from-blue-500 to-blue-600",
          type: "Exercice - Interro",
          title: "Acides et bases (Terminale)",
          subtitle: "Concepts, calculs et méthodes",
          time: "jeudi 30 oct. à 8h38",
          icon: "📘",
          iconBg: "from-blue-100 to-blue-50",
        },
      ],
    },
    {
      date: "dimanche, 19 oct.",
      items: [
        {
          subject: "Mathématiques",
          subjectColor: "from-cyan-500 to-cyan-600",
          type: "Exercice - Révision",
          title: "Fonctions exponentielles",
          subtitle: "Propriétés et applications",
          time: "dimanche 19 oct. à 16h06",
          icon: "📐",
          iconBg: "from-cyan-100 to-cyan-50",
        },
      ],
    },
    {
      date: "lundi, 13 oct.",
      items: [
        {
          subject: "Français",
          subjectColor: "from-purple-500 to-purple-600",
          type: "FlashCard",
          title: "Les figures de style",
          subtitle: "Métaphore, comparaison, hyperbole",
          time: "lundi 13 oct. à 10h15",
          icon: "📖",
          iconBg: "from-purple-100 to-purple-50",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F0] pb-8">
      <header className="sticky top-0 z-50 bg-white px-3 sm:px-6 py-3 sm:py-4 shadow-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/">
            <img
              src="/images/design-mode/dinobot-logo.png"
              alt="Dinobot"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
            <button className="bg-gradient-to-r from-[#D8C8FF] to-[#E8D8FF] hover:from-[#C8B8FF] hover:to-[#D8C8FF] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <span className="text-[#5B3FDD] font-bold text-xs sm:text-sm tracking-tight">Exercice</span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5B3FDD]" />
            </button>
            <button
              onClick={() => setIsSubjectModalOpen(true)}
              className="flex-1 bg-gradient-to-r from-[#C8D8FF] to-[#D8E4FF] hover:from-[#B8C8FF] hover:to-[#C8D8FF] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all shadow-md hover:shadow-lg flex items-center justify-between gap-1.5 sm:gap-2 min-w-0"
            >
              <span className="text-[#5B7FFF] font-bold text-xs sm:text-sm tracking-tight truncate">
                {selectedSubject}
              </span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5B7FFF] flex-shrink-0" />
            </button>
          </div>
          <Link href="/fiches/creer-fiche">
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all flex-shrink-0">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Link>
        </div>
      </header>

      <main className="px-3 sm:px-6 mt-4 sm:mt-6">
        <div className="bg-white rounded-[2rem] px-4 sm:px-5 py-5 sm:py-6 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6 tracking-tight">
            Tous tes exercices
          </h2>

          <div className="space-y-6 sm:space-y-8">
            {exercices.map((dateGroup, idx) => (
              <div key={idx}>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">
                  {dateGroup.date}
                </h3>
                <div className="space-y-2.5 sm:space-y-3">
                  {dateGroup.items.map((exercice, exerciceIdx) => (
                    <Link
                      key={exerciceIdx}
                      href="/fiches/revision"
                      className="block bg-white rounded-[1.5rem] shadow-md hover:shadow-lg transition-all overflow-hidden group"
                    >
                      <div className={`bg-gradient-to-r ${exercice.subjectColor} px-3 sm:px-4 py-2 sm:py-2.5`}>
                        <p className="text-white text-xs sm:text-sm font-bold tracking-tight">
                          {exercice.subject} - {exercice.type}
                        </p>
                      </div>
                      <div className="px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2.5 sm:gap-3">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${exercice.iconBg} rounded-[1rem] flex items-center justify-center flex-shrink-0 shadow-sm`}
                        >
                          <div className="text-lg sm:text-xl">{exercice.icon}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-slate-500 font-medium mb-0.5">{exercice.time}</p>
                          <p className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
                            {exercice.title}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{exercice.subtitle}</p>
                        </div>
                        <div className="text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all flex-shrink-0">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isSubjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSubjectModalOpen(false)} />
          <div className="relative bg-white rounded-t-[2rem] md:rounded-[2rem] w-full md:max-w-lg overflow-hidden shadow-2xl animate-in slide-in-from-bottom">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-5">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Choisis ta matière</h3>
            </div>
            <div className="p-6 space-y-2 max-h-[70vh] overflow-y-auto">
              {subjects.map((subject) => {
                const isSelected = selectedSubject === subject.name
                return (
                  <button
                    key={subject.name}
                    onClick={() => {
                      setSelectedSubject(subject.name)
                      setIsSubjectModalOpen(false)
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-[1.25rem] transition-all hover:scale-[1.01] ${
                      isSelected ? subject.bgColor : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-3xl">{subject.icon}</div>
                    <span className={`text-base font-bold tracking-tight flex-1 text-left ${subject.color}`}>
                      {subject.name}
                    </span>
                    {isSelected && <Check className={`w-6 h-6 ${subject.color}`} />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
