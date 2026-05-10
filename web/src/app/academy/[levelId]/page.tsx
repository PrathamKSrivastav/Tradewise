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
  const levelLocked = !unlockedLevels.includes(levelId)

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
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2">Curriculum</div>
              <h1 className="text-[34px] lg:text-[42px] font-black tracking-tighter text-white leading-none">Level {levelId}</h1>
              <p className="text-[14px] text-white/40 mt-3 max-w-md leading-relaxed">
                {lessons.length} specialized modules designed to build your expertise. {levelLocked ? "Unlock this level with more XP." : `${doneCount} modules mastered.`}
              </p>
            </div>
            {!levelLocked && (
              <div className="flex items-center gap-4 bg-white/5 ring-1 ring-white/10 px-5 py-3 rounded-2xl shadow-xl">
                <div className="text-right">
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Progress</div>
                  <div className="text-[18px] font-black text-white">{Math.round((doneCount / lessons.length) * 100)}%</div>
                </div>
                <div className="w-12 h-12 rounded-full border-[3px] border-white/10 border-t-indigo-500 grid place-items-center text-[11px] font-bold text-indigo-400">
                  {doneCount}/{lessons.length}
                </div>
              </div>
            )}
          </div>

          {/* Lesson list */}
          <div className="grid gap-4">
            {lessons.map((lesson, idx) => {
              const done = completedLessons.includes(lesson.id)
              const accessible = !levelLocked && (idx === 0 || completedLessons.includes(lessons[idx - 1].id))
              const locked = levelLocked || (!done && !accessible)

              return (
                <div
                  key={lesson.id}
                  className={clsx(
                    "group relative rounded-[24px] ring-1 p-1 transition-all duration-300",
                    done ? "bg-emerald-500/5 ring-emerald-500/20" :
                    accessible ? "bg-white/[0.03] ring-white/10 hover:ring-indigo-500/30 hover:bg-white/[0.05] shadow-lg hover:shadow-indigo-500/5" :
                    "bg-white/[0.01] ring-white/5 opacity-60"
                  )}
                >
                  <div className="flex items-center gap-5 p-4 pr-6">
                    {/* Status Icon */}
                    <div className={clsx(
                      "w-12 h-12 rounded-2xl grid place-items-center flex-none transition-all duration-500",
                      done ? "bg-emerald-500 text-[#062a1a] shadow-lg shadow-emerald-500/20 rotate-12" :
                      accessible ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" :
                      "bg-white/5 text-white/20"
                    )}>
                      {done ? (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : locked ? (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      ) : <span className="text-lg font-black">{idx + 1}</span>}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={clsx(
                          "text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-md",
                          done ? "bg-emerald-500/20 text-emerald-400" :
                          accessible ? "bg-indigo-500/20 text-indigo-400" :
                          "bg-white/5 text-white/20"
                        )}>
                          Module {idx + 1}
                        </span>
                        {accessible && !done && (
                          <span className="animate-pulse flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        )}
                      </div>
                      <h3 className={clsx(
                        "text-[17px] font-bold tracking-tight truncate",
                        locked ? "text-white/20" : "text-white"
                      )}>
                        {lesson.title}
                      </h3>
                      <div className="flex items-center gap-4 text-[12px] font-medium text-white/30 mt-1">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {lesson.estimatedReadTime ?? 5} min
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40" />
                          +{lesson.xpReward} XP
                        </div>
                      </div>
                    </div>

                    {accessible && (
                      <Link
                        href={`/academy/${levelId}/${lesson.id}`}
                        className={clsx(
                          "flex-none h-10 px-6 rounded-xl text-[13px] font-black uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95",
                          done 
                            ? "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white" 
                            : "bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/20"
                        )}
                      >
                        {done ? "Review" : "Start"}
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
