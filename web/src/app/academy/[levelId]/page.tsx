"use client"
import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useUserStore } from "@/store/userStore"
import { fetchUserProgress } from "@/lib/api"
import { getLessonsByLevel } from "@/content/curriculum"
import { AppLayout } from "@/components/layout/AppLayout"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"

export default function LevelDetailPage() {
  const router = useRouter()
  const params = useParams()
  const token = useUserStore(s => s.token)
  const userId = useUserStore(s => s.user_id)
  const levelId = Number(params.levelId)

  useEffect(() => { if (!token) router.push("/login") }, [token])

  const lessons = getLessonsByLevel(levelId)

  const { data: progress } = useQuery({
    queryKey: ["progress"],
    queryFn: () => fetchUserProgress(token!, userId!),
    enabled: !!token && !!userId,
  })

  if (!token) return null

  const completedLessons = progress?.completedLessons ?? []
  const unlockedLevels = progress?.unlockedLevels ?? [1]

  if (!unlockedLevels.includes(levelId)) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <div className="w-14 h-14 rounded-card bg-elev1 ring-1 ring-stroke1 grid place-items-center">
            <svg className="w-6 h-6 text-ink3" viewBox="0 0 24 24" fill="none"><path d="M12 15v2m0 0v2m0-2h2m-2 0h-2M9 11V7a3 3 0 1 1 6 0v4m-9 0h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <p className="text-[14px] text-ink2">Level {levelId} is locked. Earn more XP to unlock it.</p>
          <Link href="/academy" className="text-[13px] text-indigo-400 hover:text-indigo-300">← Back to Academy</Link>
        </div>
      </AppLayout>
    )
  }

  if (lessons.length === 0) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <p className="text-ink2">Content for Level {levelId} is coming soon.</p>
          <Link href="/academy" className="text-[13px] text-indigo-400 hover:text-indigo-300">← Back to Academy</Link>
        </div>
      </AppLayout>
    )
  }

  const doneCount = lessons.filter(l => completedLessons.includes(l.id)).length

  return (
    <AppLayout>
      <div className="px-6 py-6 overflow-auto scrollbar-none">
        <div className="max-w-[680px] mx-auto">
          {/* Breadcrumb */}
          <Link href="/academy" className="flex items-center gap-1.5 text-[12.5px] text-ink2 hover:text-ink transition mb-5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Academy
          </Link>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[28px] font-semibold tracking-[-0.02em]">Level {levelId}</h1>
            <p className="text-[13px] text-ink2 mt-1">
              {lessons.length} lessons · {doneCount} completed
            </p>
          </div>

          {/* Lesson list */}
          <div className="space-y-2">
            {lessons.map((lesson, idx) => {
              const done = completedLessons.includes(lesson.id)
              const accessible = idx === 0 || completedLessons.includes(lessons[idx - 1].id)

              return (
                <div
                  key={lesson.id}
                  className={clsx(
                    "relative rounded-card ring-1 p-4 flex items-center gap-4 transition",
                    done ? "bg-elev1 ring-stroke1" : accessible ? "bg-elev1 ring-stroke1 hover:ring-stroke2" : "bg-elev1/40 ring-stroke1/50 opacity-50 pointer-events-none"
                  )}
                >
                  {/* Left accent bar for active (next to do) */}
                  {accessible && !done && (
                    <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-indigo-500 rounded-full" />
                  )}

                  {/* Number / check circle */}
                  <div className={clsx(
                    "w-9 h-9 rounded-full grid place-items-center flex-none text-[13px] font-semibold ring-1",
                    done
                      ? "bg-emerald-400/15 text-emerald-400 ring-emerald-400/30"
                      : accessible
                        ? "bg-indigo-500/15 text-indigo-400 ring-indigo-500/25"
                        : "bg-white/4 text-ink3 ring-stroke1"
                  )}>
                    {done ? (
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>
                    ) : idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className={clsx("text-[14px] font-semibold leading-snug", accessible ? "text-ink" : "text-ink3")}>
                      {lesson.title}
                    </div>
                    <div className="text-[11.5px] text-ink3 mt-0.5">
                      ~{lesson.estimatedReadTime ?? 5} min · +{lesson.xpReward} XP
                    </div>
                  </div>

                  {accessible && (
                    <Link
                      href={`/academy/${levelId}/${lesson.id}`}
                      className="flex-none flex items-center gap-1.5 text-[12.5px] font-medium text-indigo-400 hover:text-indigo-300 transition"
                    >
                      {done ? "Review" : "Start"}
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
