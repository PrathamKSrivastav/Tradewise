"use client"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function StreakTracker({
  streak,
  multiplier,
}: {
  streak: number
  multiplier: number
}) {
  const freezeAvailable = streak > 0 && streak % 7 !== 0
  const daysInWeek = streak % 7 === 0 && streak > 0 ? 7 : streak % 7

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-white/50">
        <span>Daily Streak</span>
        {freezeAvailable && (
          <span className="text-sky-400 text-[10px]">❄ freeze available</span>
        )}
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              i < daysInWeek ? "bg-amber-400" : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p className="text-[11px] text-white/40">
        {streak === 0
          ? "Start your streak today"
          : `${streak} day streak · ${multiplier}× XP multiplier`}
      </p>
    </div>
  )
}
