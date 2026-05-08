"use client"
import { useUserStore } from "@/store/userStore"

const LEVEL_XP: Record<number, number> = {
  1: 0, 2: 120, 3: 270, 4: 470, 5: 670, 6: 850, 7: 1050, 8: 1270,
}
const MULTIPLIER_LABELS: Record<number, string> = {
  1: "1×", 1.25: "1.25×", 1.5: "1.5×", 2: "2×",
}

export function XPBar({ progress }: { progress?: { totalXP: number; currentLevel: number; currentStreak: number; streakMultiplier: number } }) {
  const level = progress?.currentLevel ?? 1
  const totalXP = progress?.totalXP ?? 0
  const streak = progress?.currentStreak ?? 0
  const multiplier = progress?.streakMultiplier ?? 1

  const currentLevelXP = LEVEL_XP[level] ?? 0
  const nextLevelXP = LEVEL_XP[level + 1]
  const pct = nextLevelXP
    ? Math.min(100, ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100)
    : 100

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/50">Level {level}</span>
        <div className="flex items-center gap-2">
          {streak > 0 && (
            <span className="text-amber-400 font-semibold">🔥 {streak}d</span>
          )}
          {multiplier > 1 && (
            <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded text-[10px] font-bold">
              {MULTIPLIER_LABELS[multiplier] ?? `${multiplier}×`} XP
            </span>
          )}
          <span className="text-white/40">{totalXP} XP</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      {nextLevelXP && (
        <p className="text-[10px] text-white/30 text-right">
          {nextLevelXP - totalXP} XP to Level {level + 1}
        </p>
      )}
    </div>
  )
}
