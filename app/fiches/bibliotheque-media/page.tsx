"use client"

import { useState } from "react"
import { ArrowLeft, Search, X, Tag, Calendar, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { MediaImage } from "@/types"

export default function BibliothequeMediaPage() {
  const [selectedImage, setSelectedImage] = useState<MediaImage | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const mediaImages: MediaImage[] = [
    {
      id: "1",
      url: "/images/molecules/reaction-hcl.png",
      name: "Réaction HCl",
      tags: ["chimie", "acide", "réaction", "molécule", "addition", "alcène", "carbocation", "mécanisme"],
      dateAdded: "2025-01-15",
      type: "Chimie organique",
      description:
        "Mécanisme réactionnel détaillé de l'addition électrophile de HCl sur un alcène. Le schéma illustre la formation d'un carbocation intermédiaire lors de la première étape, suivie de l'attaque nucléophile de l'ion chlorure. Cette réaction permet d'étudier la régiosélectivité selon la règle de Markovnikov et la stabilité relative des carbocations.",
    },
    {
      id: "2",
      url: "/images/molecules/carbon-types.png",
      name: "Types de carbone",
      tags: ["chimie", "organique", "carbone", "structure", "classification", "primaire", "secondaire", "tertiaire"],
      dateAdded: "2025-01-14",
      type: "Chimie organique",
      description:
        "Classification complète des atomes de carbone selon leur degré de substitution : carbone primaire (lié à un seul carbone), secondaire (lié à deux carbones), tertiaire (lié à trois carbones) et quaternaire (lié à quatre carbones). Cette classification est essentielle pour comprendre la réactivité des molécules organiques et prédire la stabilité des intermédiaires réactionnels.",
    },
    {
      id: "3",
      url: "/images/molecules/carbocations.png",
      name: "Carbocations",
      tags: [
        "chimie",
        "organique",
        "ion",
        "carbone",
        "stabilité",
        "mésomère",
        "électrophile",
        "allylique",
        "benzylique",
      ],
      dateAdded: "2025-01-13",
      type: "Chimie organique",
      description:
        "Étude approfondie de la stabilité des carbocations par effet mésomère (+M). Le schéma présente les carbocations allylique et benzylique, montrant comment la délocalisation électronique par résonance stabilise ces espèces chargées positivement. Ces concepts sont fondamentaux pour comprendre les mécanismes réactionnels en chimie organique, notamment les réactions de substitution et d'addition.",
    },
    {
      id: "4",
      url: "/physique-optique.jpg",
      name: "Optique géométrique",
      tags: ["physique", "optique", "lumière", "lentille", "réfraction", "rayon", "foyer"],
      dateAdded: "2025-01-12",
      type: "Physique",
      description:
        "Diagramme illustrant les principes fondamentaux de l'optique géométrique avec des lentilles convergentes et divergentes. Le schéma montre la propagation des rayons lumineux, les points focaux, et la formation d'images. Utile pour étudier les lois de la réfraction, le calcul de distance focale, et les applications pratiques comme les lunettes et microscopes.",
    },
    {
      id: "5",
      url: "/-lectricit--circuit.jpg",
      name: "Circuit électrique",
      tags: ["physique", "électricité", "circuit", "courant", "résistance", "tension", "loi d'Ohm"],
      dateAdded: "2025-01-11",
      type: "Physique",
      description:
        "Schéma d'un circuit électrique simple montrant les composants essentiels : générateur, résistances, conducteurs et interrupteur. Ce diagramme permet d'étudier la loi d'Ohm (U=RI), les circuits en série et en parallèle, ainsi que les calculs de puissance électrique. Idéal pour comprendre les bases de l'électrocinétique.",
    },
    {
      id: "6",
      url: "/thermodynamique-diagramme.jpg",
      name: "Diagramme thermodynamique",
      tags: ["physique", "thermodynamique", "énergie", "température", "pression", "phase", "transition"],
      dateAdded: "2025-01-10",
      type: "Physique",
      description:
        "Diagramme de phase pression-température illustrant les trois états de la matière (solide, liquide, gaz) et leurs transitions. Le point triple et le point critique sont clairement identifiés. Ce diagramme est essentiel pour comprendre les changements d'état, la sublimation, et les conditions d'équilibre thermodynamique.",
    },
    {
      id: "7",
      url: "/tableau-p-riodique.jpg",
      name: "Tableau périodique",
      tags: ["chimie", "éléments", "atome", "classification", "période", "groupe", "propriétés", "électronégativité"],
      dateAdded: "2025-01-09",
      type: "Chimie",
      description:
        "Classification périodique complète des éléments chimiques organisée par numéro atomique croissant. Le tableau montre les familles chimiques (métaux alcalins, halogènes, gaz nobles), les périodes, et permet de prédire les propriétés chimiques des éléments. Outil indispensable pour comprendre la structure électronique, l'électronégativité, et la réactivité chimique.",
    },
    {
      id: "8",
      url: "/m-canique-forces.jpg",
      name: "Forces et mouvement",
      tags: ["physique", "mécanique", "force", "mouvement", "vecteur", "Newton", "dynamique"],
      dateAdded: "2025-01-08",
      type: "Physique",
      description:
        "Diagramme vectoriel des forces appliquées sur un système mécanique. Le schéma illustre la décomposition des forces, le principe fondamental de la dynamique (F=ma), et l'équilibre des forces. Permet d'étudier les lois de Newton, le calcul de résultantes, et l'analyse du mouvement des corps.",
    },
  ]

  const filteredImages = mediaImages.filter(
    (img) =>
      img.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      img.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleUseImage = () => {
    if (!selectedImage) return

    // Store the selected image data in sessionStorage for the revision page
    sessionStorage.setItem(
      "selectedMediaImage",
      JSON.stringify({
        url: selectedImage.url,
        name: selectedImage.name,
        tags: selectedImage.tags,
        type: selectedImage.type,
        description: selectedImage.description,
      }),
    )

    // Navigate to revision page
    router.push("/fiches/revision")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/fiches/creer-fiche/fichier">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/">
            <img
              src="/images/design-mode/dinobot-logo.jpg"
              alt="Dinobot"
              className="w-10 h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>

          <h1 className="text-lg font-bold text-slate-800">Bibliothèque média</h1>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Image Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Images disponibles</h2>
              <p className="text-slate-600">
                {filteredImages.length} image{filteredImages.length > 1 ? "s" : ""} trouvée
                {filteredImages.length > 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={`group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border-2 ${
                    selectedImage?.id === image.id ? "border-purple-500 ring-4 ring-purple-100" : "border-transparent"
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-slate-800 text-sm mb-1 truncate">{image.name}</h3>
                    <p className="text-xs text-slate-500">{image.type}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-12">
                <FileImage className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 text-lg">Aucune image trouvée</p>
              </div>
            )}
          </div>

          {/* Side Panel */}
          {selectedImage && (
            <div className="w-96 bg-white rounded-xl shadow-xl p-6 sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">Détails de l'image</h3>
                <Button variant="ghost" size="icon" onClick={() => setSelectedImage(null)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src={selectedImage.url || "/placeholder.svg"}
                    alt={selectedImage.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">{selectedImage.name}</h4>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">Description</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{selectedImage.description}</p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Tag className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-700 mb-2">Tags pour exercices</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedImage.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FileImage className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Type</p>
                      <p className="text-sm text-slate-600">{selectedImage.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Date d'ajout</p>
                      <p className="text-sm text-slate-600">
                        {new Date(selectedImage.dateAdded).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleUseImage}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                >
                  Utiliser cette image
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
