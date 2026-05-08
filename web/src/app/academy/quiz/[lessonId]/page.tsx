"use client"
import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useUserStore } from "@/store/userStore"
import { getLessonById } from "@/content/curriculum"
import { QuizEngine } from "@/components/academy/QuizEngine"

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const token = useUserStore((s) => s.token)
  const lessonId = params.lessonId as string

  useEffect(() => { if (!token) router.push("/login") }, [token])

  const lesson = getLessonById(lessonId)

  if (!token) return null

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-ink2">Lesson not found.</p>
      </div>
    )
  }

  return <QuizEngine lesson={lesson} />
}
