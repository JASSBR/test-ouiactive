// Image metadata type
export interface ImageMeta {
  id: string
  url: string
  alt?: string
  tags?: string[]
  associatedExercise?: AssociatedExercise | null
}

// Associated exercise type
export interface AssociatedExercise {
  id: string
  title?: string
}

// Media image type (for bibliotheque-media)
export interface MediaImage {
  id: string
  url: string
  name: string
  tags: string[]
  dateAdded: string
  type: string
  description: string
}

// Image search API response
export interface ImageSearchResponse {
  uploaded: string
  candidates: ImageMeta[]
  matched: ImageMeta | null
}

// Exercise image API response
export interface ExerciseImageResponse {
  image: ImageMeta | null
  error?: string
}

// Exercise image request body
export interface ExerciseImageRequest {
  title?: string
  description?: string
  tags?: string[]
}

// Image search request body
export interface ImageSearchRequest {
  imageBase64: string
}

// Flashcard type
export interface Flashcard {
  id: string
  question: string
  answer: string
  subject: string
}

// Exercise type
export interface Exercise {
  id: string
  title: string
  description?: string
  tags?: string[]
  image?: ImageMeta
  subject?: string
}

// Chat message type
export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}
