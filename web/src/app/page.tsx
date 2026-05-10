"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../hooks/useAuth"
import { StockSelector } from "../components/StockSelector"
import { Leaderboard } from "../components/Leaderboard"
import { PortfolioSnapshot } from "../components/PortfolioSnapshot"
import { AppLayout } from "../components/layout/AppLayout"

export default function HomePage() {
  const { isAuthed, isHydrated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isHydrated && !isAuthed) router.push("/login")
  }, [isAuthed, isHydrated, router])

  if (!isHydrated || !isAuthed) return null

  return (
    <AppLayout>
      <div className="flex flex-col lg:flex-row flex-1 gap-6 p-4 lg:p-6 min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* Markets — 2/3 */}
        <section className="flex-[2] flex flex-col min-h-0">
          <div className="flex flex-wrap items-end justify-between mb-4 gap-4">
            <div>
              <div className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] text-white/30 mb-1.5">
                Select a market
              </div>
              <div className="text-[20px] lg:text-[24px] font-black tracking-tight text-white">
                Instruments · <span className="text-indigo-400">Live OHLC</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 h-8 rounded-full bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider">Market open</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto lg:overflow-x-hidden scrollbar-none min-h-[400px]">
            <StockSelector />
          </div>
        </section>

        {/* Right sidebar — portfolio snapshot + leaderboard */}
        <aside className="flex-1 flex flex-col min-h-0 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-6 gap-4">

          {/* Top: Portfolio allocation — natural height */}
          <div className="flex-none bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
            <PortfolioSnapshot />
          </div>

          {/* Bottom: Leaderboard — 2 parts */}
          <div className="flex-[2] flex flex-col min-h-0">
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] text-white/30 mb-1.5">
                  Rankings
                </div>
                <div className="text-[20px] lg:text-[24px] font-black tracking-tight text-white">
                  This week
                </div>
              </div>
              <Link href="/leaderboard" className="flex items-center gap-1 text-[12px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors no-underline">
                Full board
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
            <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl p-2 overflow-y-auto scrollbar-none min-h-[200px]">
              <Leaderboard compact />
            </div>
          </div>

        </aside>
      </div>
    </AppLayout>
  )
}
