"use client"
import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useUserStore } from "@/store/userStore"
import { fetchUserProgress } from "@/lib/api"
import { getLessonById, getLessonsByLevel } from "@/content/curriculum"
import { LessonReader } from "@/components/academy/LessonReader"
import { useQuery } from "@tanstack/react-query"

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const token = useUserStore((s) => s.token)
  const userId = useUserStore((s) => s.user_id)
  const lessonId = params.lessonId as string
  const levelId = Number(params.levelId)

  useEffect(() => { if (!token) router.push("/login") }, [token])

  const lesson = getLessonById(lessonId)
  const levelLessons = getLessonsByLevel(levelId)

  const { data: progress } = useQuery({
    queryKey: ["progress"],
    queryFn: () => fetchUserProgress(token!, userId!),
    enabled: !!token && !!userId,
  })

  if (!token) return null

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-ink2">Lesson not found.</p>
      </div>
    )
  }

  return (
    <LessonReader
      lesson={lesson}
      totalLessons={levelLessons.length}
      completedIds={progress?.completedLessons ?? []}
    />
  )
}
