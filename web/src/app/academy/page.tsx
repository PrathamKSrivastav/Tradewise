"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useUserStore } from "@/store/userStore"
import { fetchUserProgress, fetchBadges, fetchExamStatus } from "@/lib/api"
import { LevelMap } from "@/components/academy/LevelMap"
import { XPBar } from "@/components/academy/XPBar"
import { StreakTracker } from "@/components/academy/StreakTracker"
import { BadgeShelf } from "@/components/academy/BadgeShelf"
import { AppLayout } from "@/components/layout/AppLayout"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"

export default function AcademyPage() {
  const router = useRouter()
  const token = useUserStore(s => s.token)
  const userId = useUserStore(s => s.user_id)
  const isAuthed = !!token

  useEffect(() => { if (!isAuthed) router.push("/login") }, [isAuthed])

  const { data: progress } = useQuery({
    queryKey: ["progress"],
    queryFn: () => fetchUserProgress(token!, userId!),
    enabled: !!token && !!userId,
  })

  const { data: badges } = useQuery({
    queryKey: ["badges"],
    queryFn: () => fetchBadges(token!, userId!),
    enabled: !!token && !!userId,
  })

  const { data: examStatus } = useQuery({
    queryKey: ["examStatus", userId],
    queryFn: () => fetchExamStatus(token!, userId!),
    enabled: !!token && !!userId,
  })

  if (!isAuthed) return null

  const safeProgress = {
    totalXP: 0,
    currentLevel: 1,
    currentStreak: 0,
    streakMultiplier: 1,
    unlockedLevels: [1],
    badges: [],
    completedLessons: [],
    ...progress,
    completedLessons: progress?.completedLessons ?? [],
    unlockedLevels: progress?.unlockedLevels ?? [1],
    badges: progress?.badges ?? [],
  }

  return (
    <AppLayout>
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left sidebar — 300px */}
        <aside className="w-[300px] flex-none border-r border-stroke1 overflow-auto scrollbar-none p-5 flex flex-col gap-4">
          {/* XP card */}
          <div className="rounded-card bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 ring-1 ring-indigo-500/20 p-4">
            <div className="text-[10.5px] text-indigo-300 font-semibold tracking-[0.16em] uppercase mb-1">Total XP</div>
            <div className="mono text-[32px] font-bold num text-ink leading-none">
              {safeProgress.totalXP.toLocaleString()}
            </div>
            <div className="mt-3">
              <XPBar progress={safeProgress} />
            </div>
          </div>

          {/* Streak */}
          <div className="rounded-card bg-elev1 ring-1 ring-stroke1 p-4">
            <div className="text-[10.5px] text-ink3 font-semibold tracking-[0.14em] uppercase mb-3">Streak</div>
            <StreakTracker streak={safeProgress.currentStreak} multiplier={safeProgress.streakMultiplier} />
          </div>

          {/* Badges */}
          {badges && badges.earned.length > 0 && (
            <div className="rounded-card bg-elev1 ring-1 ring-stroke1 p-4">
              <div className="text-[10.5px] text-ink3 font-semibold tracking-[0.14em] uppercase mb-3">Badges</div>
              <BadgeShelf data={badges} />
            </div>
          )}
        </aside>

        {/* Main content */}
        <div className="flex-1 overflow-auto scrollbar-none p-6">
          <div className="max-w-[760px] mx-auto space-y-6">
            {/* Header */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink3 mb-1.5">Academy</div>
              <h1 className="text-[28px] font-semibold tracking-[-0.02em]">Your Learning Path</h1>
              <p className="text-[13px] text-ink2 mt-1">AI-guided financial education for Indian investors.</p>
            </div>

            {/* Level map */}
            <LevelMap progress={safeProgress} />

            {/* Final Exam card */}
            <div className={clsx(
              "rounded-card ring-1 p-5 flex items-start justify-between gap-4",
              examStatus?.passed
                ? "bg-amber-500/8 ring-amber-500/25"
                : "bg-elev1 ring-stroke1"
            )}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 1a.75.75 0 0 1 .67.415l2.08 4.217 4.651.677a.75.75 0 0 1 .416 1.279l-3.366 3.28.794 4.633a.75.75 0 0 1-1.088.791L10 13.902l-4.157 2.39a.75.75 0 0 1-1.088-.79l.794-4.634-3.366-3.28a.75.75 0 0 1 .416-1.28l4.651-.676L9.33 1.415A.75.75 0 0 1 10 1Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[15px] font-semibold">Final Exam</span>
                  {examStatus?.passed && (
                    <span className="text-[10px] font-semibold bg-emerald-400/15 text-emerald-400 px-2 py-0.5 rounded-pill">PASSED</span>
                  )}
                </div>
                <p className="text-[12.5px] text-ink2">60 questions · 75% to pass · 60-minute timer · PDF certificate on completion</p>
                {examStatus?.passed && (
                  <p className="text-[12px] text-emerald-400 mt-1.5 font-medium">Score: {examStatus.bestScore}%</p>
                )}
                {examStatus && !examStatus.passed && examStatus.bestScore != null && (
                  <p className="text-[12px] text-ink3 mt-1.5">Best score: {examStatus.bestScore}%</p>
                )}
                {examStatus && (
                  <p className="text-[11.5px] text-ink3 mt-1">Attempts: {examStatus.attemptsUsed ?? 0} / 3</p>
                )}
              </div>
              <Link
                href="/academy/exam"
                className={clsx(
                  "flex-none flex items-center gap-2 px-4 h-10 rounded-btn text-[13px] font-semibold transition whitespace-nowrap",
                  examStatus?.passed
                    ? "bg-amber-500 hover:bg-amber-600 text-[#231703] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                    : "bg-white/8 hover:bg-white/12 text-ink ring-1 ring-stroke2"
                )}
              >
                {examStatus?.passed ? "View Certificate" : examStatus?.attemptsUsed ? "Retry Exam" : "Take Exam"}
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
