"use client"
import Link from "next/link"
import type { UserProgress } from "@/lib/types"
import { getLessonsByLevel } from "@/content/curriculum"

const LEVEL_XP: Record<number, number> = {
  1: 0, 2: 120, 3: 270, 4: 470, 5: 670, 6: 850, 7: 1050, 8: 1270,
}
const LEVEL_TITLES: Record<number, string> = {
  1: "Financial Basics",
  2: "Stock Market Fundamentals",
  3: "Technical Analysis",
  4: "Fundamental Analysis",
  5: "Risk Management",
  6: "Trading Strategies",
  7: "Derivatives F&O",
  8: "Advanced Markets",
}
const LEVEL_COLORS: Record<number, string> = {
  1: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
  2: "from-sky-500/20 to-sky-500/5 border-sky-500/30",
  3: "from-violet-500/20 to-violet-500/5 border-violet-500/30",
  4: "from-amber-500/20 to-amber-500/5 border-amber-500/30",
  5: "from-rose-500/20 to-rose-500/5 border-rose-500/30",
  6: "from-pink-500/20 to-pink-500/5 border-pink-500/30",
  7: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30",
  8: "from-teal-500/20 to-teal-500/5 border-teal-500/30",
}

export function LevelMap({ progress }: { progress: UserProgress }) {
  const unlockedLevels = progress?.unlockedLevels ?? [1]
  const completedLessons = progress?.completedLessons ?? []
  const totalXP = progress?.totalXP ?? 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {Array.from({ length: 8 }, (_, i) => i + 1).map((level) => {
        const lessons = getLessonsByLevel(level)
        const unlocked = unlockedLevels.includes(level)
        const completed = lessons.length > 0 && lessons.every((l) => completedLessons.includes(l.id))
        const xpNeeded = LEVEL_XP[level] ?? 0
        const inProgress = unlocked && !completed && lessons.some((l) => completedLessons.includes(l.id))
        const completedCount = lessons.filter((l) => completedLessons.includes(l.id)).length
        const colorClass = LEVEL_COLORS[level]

        return (
          <div
            key={level}
            className={`relative rounded-xl border bg-gradient-to-br p-5 transition-all ${
              unlocked ? colorClass : "border-white/8 bg-white/3"
            }`}
          >
            {completed && (
              <span className="absolute top-3 right-3 text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                ✓ Done
              </span>
            )}
            {!unlocked && (
              <span className="absolute top-3 right-3 text-white/30 text-sm">🔒</span>
            )}

            <div className="flex items-start gap-3">
              <div className={`text-2xl font-bold tabular-nums ${unlocked ? "text-white/80" : "text-white/20"}`}>
                {String(level).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-sm ${unlocked ? "text-white" : "text-white/30"}`}>
                  {LEVEL_TITLES[level]}
                </h3>
                <p className={`text-xs mt-0.5 ${unlocked ? "text-white/40" : "text-white/20"}`}>
                  {lessons.length > 0 ? `${lessons.length} lessons` : "Coming soon"}
                  {!unlocked && ` · ${xpNeeded} XP required`}
                </p>

                {unlocked && lessons.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-white/40">
                      <span>{completedCount}/{lessons.length} completed</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-current transition-all duration-500"
                        style={{ width: `${(completedCount / lessons.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {lessons.length > 0 && (
                  unlocked ? (
                    <Link
                      href={`/academy/${level}`}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/70 hover:text-white transition-colors"
                    >
                      {completed ? "Review" : inProgress ? "Continue →" : "Start →"}
                    </Link>
                  ) : (
                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-white/25 cursor-not-allowed">
                      🔒 Locked
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
