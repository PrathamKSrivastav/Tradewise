// web/src/app/profile/page.tsx
"use client"
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { fetchUserProgress, fetchBadges } from "../../lib/api"
import { AppNav } from "../../components/layout/AppNav"
import { BadgeShelf } from "../../components/academy/BadgeShelf"
import type { UserProgress, BadgesResponse } from "../../lib/types"
import clsx from "clsx"

export default function ProfilePage() {
  const { token, user_id, username, isAuthed, signOut } = useAuth()
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

  if (!isAuthed) return null

  return (
    <div className="min-h-screen bg-canvas">
      <AppNav />
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[40px] font-black text-white shadow-xl shadow-indigo-500/20 ring-4 ring-white/5">
                {username?.[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-[32px] font-black text-ink tracking-tight mb-1">{username}</h1>
                <div className="flex items-center gap-3">
                  <div className="h-6 px-3 rounded-full bg-white/5 text-ink3 text-[11px] font-bold uppercase tracking-widest flex items-center ring-1 ring-white/5">
                    LEVEL {progress?.currentLevel ?? 1}
                  </div>
                  <div className="h-6 px-3 rounded-full bg-amber-500/10 text-amber-500 text-[11px] font-bold uppercase tracking-widest flex items-center ring-1 ring-amber-500/20">
                    {progress?.currentStreak ?? 0} DAY STREAK
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={signOut}
              className="h-10 px-6 rounded-btn border border-white/10 text-ink3 text-[13px] font-bold hover:bg-white/5 hover:text-rose-400 transition"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col: Progress Stats */}
            <div className="space-y-6 lg:col-span-1">
              <div className="p-6 rounded-2xl bg-white/4 ring-1 ring-white/5">
                <h3 className="text-[11px] font-bold text-ink3 uppercase tracking-[0.2em] mb-6">Experience Points</h3>
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <div className="text-[36px] font-black text-ink leading-none">{progress?.totalXP.toLocaleString()} <span className="text-[14px] text-ink3 font-medium uppercase tracking-normal">XP</span></div>
                    <div className="text-[12px] text-ink3 font-medium mb-1">To Next Level: {1000 - ((progress?.totalXP ?? 0) % 1000)}</div>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                      style={{ width: `${((progress?.totalXP ?? 0) % 1000) / 10}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                  <StatItem label="Lessons Done" value={progress?.completedLessons.length.toString() ?? "0"} />
                  <StatItem label="Multiplier" value={`${progress?.streakMultiplier.toFixed(1)}x`} />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0a0a0f] ring-1 ring-white/5">
                <h3 className="text-[11px] font-bold text-ink3 uppercase tracking-[0.2em] mb-4">Mastery Summary</h3>
                <div className="space-y-3">
                  <MasteryItem label="Basics" pct={100} color="bg-emerald-500" />
                  <MasteryItem label="Technical" pct={progress?.unlockedLevels.includes(4) ? 100 : 40} color="bg-blue-500" />
                  <MasteryItem label="Risk Mgmt" pct={progress?.unlockedLevels.includes(6) ? 100 : 0} color="bg-purple-500" />
                </div>
              </div>
            </div>

            {/* Right Col: Badges & Activity */}
            <div className="lg:col-span-2 space-y-8">
              <div className="p-8 rounded-2xl bg-white/4 ring-1 ring-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L9 9H1L7 15L5 23L12 18L19 23L17 15L23 9H15L12 1Z" /></svg>
                </div>
                
                <h3 className="text-[15px] font-bold text-ink mb-6 flex items-center gap-2">
                  Badge Showcase
                  <span className="text-[11px] font-normal text-ink3 bg-white/5 px-2 py-0.5 rounded-full">
                    {badges?.earned.length ?? 0} Unlocked
                  </span>
                </h3>
                
                {loading || !badges ? (
                  <div className="h-32 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                  </div>
                ) : (
                  <BadgeShelf data={badges} />
                )}
              </div>

              <div className="p-8 rounded-2xl bg-white/4 ring-1 ring-white/5">
                <h3 className="text-[15px] font-bold text-ink mb-6">Completed Curriculum</h3>
                <div className="flex flex-wrap gap-2">
                  {progress?.completedLessons.length ? progress.completedLessons.map(lessonId => (
                    <div key={lessonId} className="h-8 px-4 rounded-full bg-white/5 border border-white/5 text-ink2 text-[12px] flex items-center">
                      {lessonId.replace(/-/g, ' ')}
                    </div>
                  )) : (
                    <p className="text-[13px] text-ink3 italic">No lessons completed yet. Start your journey in the Academy!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] text-ink3 uppercase font-medium mb-1">{label}</div>
      <div className="text-[18px] font-bold text-ink">{value}</div>
    </div>
  )
}

function MasteryItem({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] font-bold mb-1.5">
        <span className="text-ink2">{label}</span>
        <span className="text-ink3">{pct}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className={clsx("h-full transition-all duration-1000", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
