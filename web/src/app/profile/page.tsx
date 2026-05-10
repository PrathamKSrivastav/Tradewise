"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "../../hooks/useAuth"
import { fetchUserProgress, fetchBadges } from "../../lib/api"
import { AppLayout } from "../../components/layout/AppLayout"
import { BadgeShelf } from "../../components/academy/BadgeShelf"
import { getLessonById, curriculum } from "../../content/curriculum"
import type { UserProgress, BadgesResponse } from "../../lib/types"
import clsx from "clsx"

const LEVEL_XP: Record<number, number> = { 1: 0, 2: 120, 3: 270, 4: 470, 5: 670, 6: 850, 7: 1050, 8: 1270 }

const MASTERY_GROUPS = [
  { label: "Basics",          levels: [1, 2], color: "bg-emerald-500" },
  { label: "Technical",       levels: [3, 4], color: "bg-blue-500"    },
  { label: "Risk & Strategy", levels: [5, 6], color: "bg-purple-500"  },
  { label: "Advanced",        levels: [7, 8], color: "bg-amber-500"   },
]

export default function ProfilePage() {
  const { token, user_id, username, isAuthed, isHydrated, signOut } = useAuth()
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [badges, setBadges] = useState<BadgesResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!token || !user_id) return
      try {
        const [p, b] = await Promise.all([
          fetchUserProgress(token, user_id),
          fetchBadges(token, user_id)
        ])
        setProgress(p)
        setBadges(b)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    if (isAuthed) load()
  }, [token, user_id, isAuthed])

  useEffect(() => {
    if (isHydrated && !isAuthed) window.location.href = "/login"
  }, [isAuthed, isHydrated])

  if (!isHydrated || !isAuthed) return null

  const currentLevel = progress?.currentLevel ?? 1
  const totalXP = progress?.totalXP ?? 0
  const currentThreshold = LEVEL_XP[currentLevel] ?? 0
  const nextThreshold = LEVEL_XP[currentLevel + 1]
  const isMaxLevel = currentLevel >= 8
  const xpToNext = isMaxLevel ? 0 : (nextThreshold - totalXP)
  const barPct = isMaxLevel
    ? 100
    : Math.min(100, Math.max(0, ((totalXP - currentThreshold) / (nextThreshold - currentThreshold)) * 100))

  const unlockedLevels = progress?.unlockedLevels ?? [1]

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 lg:px-6 py-6 lg:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            {loading ? (
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl animate-pulse bg-white/[0.07]" />
                <div className="space-y-2">
                  <div className="w-40 h-6 animate-pulse bg-white/[0.07] rounded" />
                  <div className="w-28 h-5 animate-pulse bg-white/[0.07] rounded" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[34px] font-black text-white shadow-xl shadow-indigo-500/20 ring-2 ring-white/10 flex-shrink-0">
                  {username?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div>
                  <h1 className="text-[26px] lg:text-[30px] font-black text-white tracking-tight leading-none mb-2">{username}</h1>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="h-6 px-3 rounded-full bg-white/[0.06] text-white/50 text-[10.5px] font-bold uppercase tracking-widest flex items-center ring-1 ring-white/[0.07]">
                      Level {currentLevel}
                    </div>
                    <div className="h-6 px-3 rounded-full bg-amber-500/10 text-amber-400 text-[10.5px] font-bold uppercase tracking-widest flex items-center ring-1 ring-amber-500/20">
                      {progress?.currentStreak ?? 0} day streak
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={signOut}
              className="h-9 px-5 rounded-lg border border-white/10 text-white/40 text-[12.5px] font-semibold hover:bg-white/[0.05] hover:text-rose-400 transition flex-shrink-0"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col */}
            <div className="space-y-5 lg:col-span-1">
              {/* XP Card */}
              <div className="p-5 rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-5">Experience Points</h3>
                {loading ? (
                  <div className="space-y-3">
                    <div className="w-32 h-8 animate-pulse bg-white/[0.07] rounded" />
                    <div className="w-full h-2.5 animate-pulse bg-white/[0.07] rounded-full" />
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-end mb-2.5">
                      <div className="text-[32px] font-black text-white leading-none">
                        {totalXP.toLocaleString()}
                        <span className="text-[13px] text-white/30 font-medium ml-1 tracking-normal">XP</span>
                      </div>
                      <div className="text-[11.5px] text-white/35 font-medium pb-0.5">
                        {isMaxLevel ? "Max Level!" : `${xpToNext} XP to next`}
                      </div>
                    </div>
                    <div className="h-2.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-white/20 mt-1.5">
                      {isMaxLevel ? "Maximum level reached" : `${Math.round(barPct)}% to Level ${currentLevel + 1}`}
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-white/[0.05]">
                  {loading ? (
                    <>
                      <div className="space-y-1.5"><div className="w-14 h-3 animate-pulse bg-white/[0.07] rounded"/><div className="w-8 h-5 animate-pulse bg-white/[0.07] rounded"/></div>
                      <div className="space-y-1.5"><div className="w-14 h-3 animate-pulse bg-white/[0.07] rounded"/><div className="w-8 h-5 animate-pulse bg-white/[0.07] rounded"/></div>
                    </>
                  ) : (
                    <>
                      <StatItem label="Lessons Done" value={progress?.completedLessons.length.toString() ?? "0"} />
                      <StatItem label="Multiplier" value={`${progress?.streakMultiplier.toFixed(1) ?? "1.0"}x`} />
                    </>
                  )}
                </div>
              </div>

              {/* Mastery Summary */}
              <div className="p-5 rounded-2xl bg-[#080c18] ring-1 ring-white/[0.06]">
                <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Mastery Summary</h3>
                {loading ? (
                  <div className="space-y-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="space-y-1.5">
                        <div className="w-24 h-3 animate-pulse bg-white/[0.07] rounded"/>
                        <div className="w-full h-1.5 animate-pulse bg-white/[0.07] rounded-full"/>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {MASTERY_GROUPS.map(({ label, levels, color }) => {
                      const groupLessons = levels.flatMap(lv => curriculum[lv] || [])
                      const totalInGroup = groupLessons.length
                      const completedInGroup = groupLessons.filter(l => progress?.completedLessons.includes(l.id)).length
                      const pct = totalInGroup > 0 ? Math.round((completedInGroup / totalInGroup) * 100) : 0
                      return <MasteryItem key={label} label={label} pct={pct} color={color} />
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Col */}
            <div className="lg:col-span-2 space-y-6">
              {/* Badge Showcase */}
              <div className="p-6 rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                  <svg className="w-28 h-28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L9 9H1L7 15L5 23L12 18L19 23L17 15L23 9H15L12 1Z" /></svg>
                </div>
                <h3 className="text-[14px] font-bold text-white mb-5 flex items-center gap-2">
                  Badge Showcase
                  <span className="text-[10.5px] font-normal text-white/30 bg-white/[0.05] px-2 py-0.5 rounded-full">
                    {badges?.earned.length ?? 0} Unlocked
                  </span>
                </h3>
                {loading || !badges ? (
                  <div className="h-24 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                  </div>
                ) : (
                  <BadgeShelf data={badges} />
                )}
              </div>

              {/* Completed Curriculum */}
              <div className="p-6 rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                <h3 className="text-[14px] font-bold text-white mb-5">Completed Curriculum</h3>
                {loading ? (
                  <div className="flex flex-wrap gap-2">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="h-8 w-32 animate-pulse bg-white/[0.07] rounded-full" />
                    ))}
                  </div>
                ) : progress?.completedLessons.length ? (
                  <div className="flex flex-wrap gap-2">
                    {progress.completedLessons.map(lessonId => {
                      const lesson = getLessonById(lessonId)
                      if (!lesson) return null
                      return (
                        <Link
                          key={lessonId}
                          href={`/academy/${lesson.level}/${lesson.id}`}
                          className="h-8 px-4 rounded-full bg-white/[0.05] ring-1 ring-white/[0.07] text-white/60 text-[12px] flex items-center hover:bg-indigo-500/10 hover:text-indigo-300 hover:ring-indigo-500/20 transition-all"
                        >
                          {lesson.title}
                        </Link>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 gap-4 text-center">
                    <div className="text-4xl opacity-40">📚</div>
                    <p className="text-[13.5px] text-white/35">No lessons completed yet.</p>
                    <Link
                      href="/academy"
                      className="h-9 px-5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-[13px] font-semibold transition flex items-center gap-2"
                    >
                      Start Learning
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] text-white/30 uppercase font-medium mb-1 tracking-wider">{label}</div>
      <div className="text-[18px] font-bold text-white">{value}</div>
    </div>
  )
}

function MasteryItem({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] font-semibold mb-1.5">
        <span className="text-white/60">{label}</span>
        <span className="text-white/30">{pct}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
        <div className={clsx("h-full rounded-full transition-all duration-1000", color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
