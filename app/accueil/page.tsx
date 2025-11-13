"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function AccueilPage() {
  useEffect(() => {
    redirect("/")
  }, [])

  return null
}
