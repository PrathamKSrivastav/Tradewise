"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useUserStore } from "@/store/userStore"
import { fetchUserProgress, fetchBadges, fetchExamStatus } from "@/lib/api"
import { LevelMap } from "@/components/academy/LevelMap"
import { XPBar } from "@/components/academy/XPBar"
import { StreakTracker } from "@/components/academy/StreakTracker"
import { AppLayout } from "@/components/layout/AppLayout"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"

const BADGE_CONFIG: Record<string, { emoji: string; label: string }> = {
  "first-lesson": { emoji: "⭐", label: "Novice" },
  "first-trade": { emoji: "📈", label: "Trader" },
  "streak-7": { emoji: "🔥", label: "7 Day" },
  "streak-30": { emoji: "🚀", label: "Monthly" },
  "quiz-perfect": { emoji: "💎", label: "Perfect" },
  "level-3-complete": { emoji: "🎓", label: "Analyst" },
  "portfolio-10": { emoji: "💰", label: "Pro" },
  "market-ready": { emoji: "👑", label: "Master" },
  default: { emoji: "🏅", label: "Badge" },
}

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
    ...progress,
    completedLessons: progress?.completedLessons ?? [],
    unlockedLevels: progress?.unlockedLevels ?? [1],
    badges: progress?.badges ?? [],
  }

  const earnedBadges = badges?.earned ?? []
  const displayBadges = earnedBadges.slice(0, 6)

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full lg:w-[280px] flex-none border-b lg:border-b-0 lg:border-r border-stroke1 overflow-y-auto lg:overflow-auto scrollbar-none p-4 lg:p-5 flex flex-col gap-4 bg-black/10 lg:bg-transparent">
          {/* XP card */}
          <div className="rounded-card bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 ring-1 ring-indigo-500/20 p-4 shadow-lg">
            <div className="text-[10px] text-indigo-300 font-black uppercase tracking-[0.2em] mb-1.5 opacity-80">Experience Points</div>
            <div className="font-mono text-[28px] lg:text-[30px] font-black text-white leading-none tracking-tighter">
              {safeProgress.totalXP.toLocaleString()}
              <span className="text-[13px] text-indigo-300/60 font-bold uppercase tracking-normal ml-1">XP</span>
            </div>
            <div className="mt-4">
              <XPBar progress={safeProgress} />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Streak */}
            <div className="rounded-card bg-elev1 ring-1 ring-stroke1 p-4 shadow-md">
              <div className="text-[9px] text-ink3 font-black uppercase tracking-[0.2em] mb-3 opacity-60">Daily Momentum</div>
              <StreakTracker streak={safeProgress.currentStreak} multiplier={safeProgress.streakMultiplier} />
            </div>

            {/* Badges Preview */}
            <div className="rounded-card bg-elev1 ring-1 ring-stroke1 p-4 shadow-md">
              <div className="text-[9px] text-ink3 font-black uppercase tracking-[0.2em] mb-3 opacity-60">Badges</div>
              {displayBadges.length === 0 ? (
                <div className="text-[11px] text-ink3 italic leading-relaxed">
                  0 badges yet — complete lessons to earn!
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {displayBadges.map((b, idx) => {
                    const config = BADGE_CONFIG[b.id] ?? BADGE_CONFIG.default
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.06] ring-1 ring-white/[0.09] flex items-center justify-center text-xl">
                          {config.emoji}
                        </div>
                        <span className="text-[9px] text-ink3 text-center leading-tight truncate w-full capitalize">
                          {config.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-card bg-elev1 ring-1 ring-stroke1 p-4 shadow-md mt-auto">
            <div className="text-[9px] text-ink3 font-black uppercase tracking-[0.2em] mb-3 opacity-60">Quick Links</div>
            <div className="space-y-1.5">
              <Link href="/profile" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/[0.05] text-ink2 hover:text-ink transition text-[12.5px] font-medium">
                <svg className="w-3.5 h-3.5 opacity-50" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                My Profile
              </Link>
              <Link href="/certificate" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/[0.05] text-ink2 hover:text-ink transition text-[12.5px] font-medium">
                <svg className="w-3.5 h-3.5 opacity-50" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Certificate
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto scrollbar-none p-4 lg:p-8 bg-canvas">
          <div className="max-w-[760px] mx-auto space-y-8">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2">Curriculum</div>
              <h1 className="text-[30px] lg:text-[38px] font-black tracking-tight text-white leading-none mb-3">Your Learning Path</h1>
              <p className="text-[14px] lg:text-[15px] text-ink2 leading-relaxed">Master the Indian stock market through our AI-guided educational levels.</p>
            </div>

            <div className="relative">
              <LevelMap progress={safeProgress} />
            </div>

            {/* Final Exam card */}
            <div className={clsx(
              "rounded-3xl ring-1 p-6 lg:p-8 flex flex-col sm:flex-row items-start lg:items-center justify-between gap-6 transition-all duration-300 shadow-xl",
              examStatus?.passed
                ? "bg-amber-500/10 ring-amber-500/30 shadow-amber-500/5"
                : "bg-white/[0.03] ring-white/10 hover:bg-white/[0.05]"
            )}>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
                    <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 1a.75.75 0 0 1 .67.415l2.08 4.217 4.651.677a.75.75 0 0 1 .416 1.279l-3.366 3.28.794 4.633a.75.75 0 0 1-1.088.791L10 13.902l-4.157 2.39a.75.75 0 0 1-1.088-.79l.794-4.634-3.366-3.28a.75.75 0 0 1 .416-1.28l4.651-.676L9.33 1.415A.75.75 0 0 1 10 1Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[17px] lg:text-[19px] font-black text-white tracking-tight">FinSim Certification Exam</h3>
                    {examStatus?.passed && (
                      <span className="inline-block mt-1 text-[10px] font-black bg-emerald-500 text-[#062a1a] px-2 py-0.5 rounded-full tracking-wider">VERIFIED PASSED</span>
                    )}
                  </div>
                </div>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-md">The final challenge. 60 questions covering all levels. 75% score required for your graduation certificate.</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  {examStatus?.passed ? (
                    <div className="text-[13px] text-emerald-400 font-bold flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Best Score: {examStatus.bestScore}%
                    </div>
                  ) : (
                    <>
                      <div className="text-[11px] text-white/30 font-bold uppercase tracking-wider italic">
                        Attempts: {examStatus?.attemptsUsed ?? 0} / 3
                      </div>
                      {examStatus?.bestScore != null && (
                        <div className="text-[11px] text-white/40 font-bold uppercase tracking-wider">
                          Record: {examStatus.bestScore}%
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <Link
                href="/academy/exam"
                className={clsx(
                  "w-full sm:w-auto flex-none flex items-center justify-center gap-2 px-8 h-12 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-[0.98]",
                  examStatus?.passed
                    ? "bg-amber-500 hover:bg-amber-400 text-[#231703] shadow-amber-500/20"
                    : "bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-500/20"
                )}
              >
                {examStatus?.passed ? "View Credentials" : "Start Final Exam"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
