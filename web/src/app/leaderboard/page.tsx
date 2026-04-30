// web/src/app/leaderboard/page.tsx
"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../hooks/useAuth"
import { Leaderboard } from "../../components/Leaderboard"
import Link from "next/link"
export default function LeaderboardPage() {
  const { isAuthed } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!isAuthed) router.push("/login")
  }, [isAuthed])
  if (!isAuthed) return null
  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="text-white/30 hover:text-white/70 text-sm transition-colors">
          ← Back
        </Link>
        <h1 className="text-lg font-bold text-white">Leaderboard</h1>
      </div>
      <Leaderboard />
    </main>
  )
}