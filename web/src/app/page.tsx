"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../hooks/useAuth"
import { StockSelector } from "../components/StockSelector"
import { Leaderboard } from "../components/Leaderboard"
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
      <div style={{ display: "flex", flex: 1, gap: 24, padding: 24, minHeight: 0, overflow: "hidden" }}>
        {/* Markets — 2/3 */}
        <section style={{ flex: 2, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>
                Select a market
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: "#e7eaf3" }}>
                Instruments · Live OHLC
              </div>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "0 12px", height: 32,
              borderRadius: 9999, background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
              <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)" }}>Market open · NSE</span>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }} className="scrollbar-none">
            <StockSelector />
          </div>
        </section>

        {/* Leaderboard sidebar — 1/3 */}
        <aside style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>
                Rankings
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: "#e7eaf3" }}>
                This week
              </div>
            </div>
            <Link href="/leaderboard" style={{
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 12, color: "#818cf8", textDecoration: "none",
            }}>
              Full board
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <div style={{
            flex: 1,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: 8,
            overflowY: "auto",
          }} className="scrollbar-none">
            <Leaderboard compact />
          </div>
        </aside>
      </div>
    </AppLayout>
  )
}
