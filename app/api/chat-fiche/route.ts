import { streamText } from "ai"
import { NextResponse } from "next/server"

export const maxDuration = 30

interface ChatRequest {
  message: string
  subject: string
  topic: string
}

interface ChatResponse {
  response: string
}

export async function POST(req: Request) {
  const { message, subject, topic } = await req.json() as ChatRequest

  const systemPrompt = `Tu es DinoBot, un assistant pédagogique sympathique et expert en ${subject}. 
Tu aides les élèves à comprendre le cours sur "${topic}".

Contexte du cours sur les Acides et Bases :
- Modèles acide-base : Arrhenius, Brønsted-Lowry, Lewis
- Couple acide-base : AH/A⁻
- Calcul de pH : pH = −log₁₀[H₃O⁺]
- pH < 7 : acide, pH = 7 : neutre, pH > 7 : basique
- Solutions tampons : résistent aux variations de pH

Réponds de manière claire, pédagogique et encourageante. Utilise des exemples concrets quand c'est pertinent.
Si l'élève pose une question hors sujet, ramène-le gentiment au cours.`

  const result = streamText({
    model: "openai/gpt-5-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    maxOutputTokens: 500,
    temperature: 0.7,
  })

  const textStream = result.textStream
  let fullText = ""

  for await (const chunk of textStream) {
    fullText += chunk
  }

  return NextResponse.json<ChatResponse>({ response: fullText })
}
