"use client"
import type { BadgesResponse } from "@/lib/types"

const BADGE_META: Record<string, { emoji: string; label: string; description: string }> = {
  "first-lesson":       { emoji: "📖", label: "First Step",     description: "Complete your first lesson" },
  "first-trade":        { emoji: "📈", label: "First Trade",    description: "Execute your first simulated trade" },
  "streak-7":           { emoji: "🔥", label: "Week Warrior",   description: "Maintain a 7-day streak" },
  "streak-30":          { emoji: "⚡", label: "Month Master",   description: "Maintain a 30-day streak" },
  "quiz-perfect":       { emoji: "🎯", label: "Perfect Score",  description: "Score 100% on a quiz" },
  "level-3-complete":   { emoji: "🏆", label: "Level 3 Done",   description: "Complete all Level 3 lessons" },
  "portfolio-10":       { emoji: "💰", label: "10% Gains",      description: "Achieve 10% portfolio return" },
  "market-ready":       { emoji: "🚀", label: "Market Ready",   description: "Complete all 8 academy levels" },
}

export function BadgeShelf({ data }: { data: BadgesResponse }) {
  const earnedIds = new Set(data?.earned?.map((b) => b.id) || [])
  const allIds = Object.keys(BADGE_META)

  if (!data) return null;

  return (
    <div className="grid grid-cols-4 gap-3">
      {allIds.map((id) => {
        const meta = BADGE_META[id]
        const earned = earnedIds.has(id)
        return (
          <div
            key={id}
            title={meta.description}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
              earned
                ? "border-indigo-500/40 bg-indigo-500/10"
                : "border-white/8 bg-white/3 opacity-40 grayscale"
            }`}
          >
            <span className="text-2xl">{meta.emoji}</span>
            <span className="text-[10px] text-center text-white/70 leading-tight">{meta.label}</span>
          </div>
        )
      })}
    </div>
  )
}
