// web/src/app/page.tsx
"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../hooks/useAuth"
import { StockSelector } from "../components/StockSelector"
import { Leaderboard } from "../components/Leaderboard"
import { useWallet } from "../hooks/useWallet"
export default function HomePage() {
  const { isAuthed, username, signOut } = useAuth()
  const { wallet } = useWallet()
  const router = useRouter()
  useEffect(() => {
    if (!isAuthed) router.push("/login")
  }, [isAuthed])
  if (!isAuthed) return null
  return (
    <main className="min-h-screen px-4 py-8 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Tradewise</h1>
          <p className="text-xs text-white/30 mt-0.5">Indian Market Simulator · Paper Trading</p>
        </div>
        <div className="flex items-center gap-4">
          {wallet && (
            <div className="text-right">
              <p className="text-xs text-white/30">Balance</p>
              <p className="text-sm font-mono font-bold text-white">
                ₹{wallet.balance.toLocaleString("en-IN")}
              </p>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">{username}</span>
            <button
              onClick={signOut}
              className="text-xs text-white/30 hover:text-white/70 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xs font-mono text-white/40 tracking-widest mb-4">SELECT A MARKET</h2>
          <StockSelector />
        </div>
        <div>
          <h2 className="text-xs font-mono text-white/40 tracking-widest mb-4">RANKINGS</h2>
          <Leaderboard />
        </div>
      </div>
    </main>
  )
}