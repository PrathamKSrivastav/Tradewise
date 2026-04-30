// web/src/app/admin/page.tsx
"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../hooks/useAuth"
import { Card } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
const GATEWAY = process.env.NEXT_PUBLIC_GATEWAY_URL ?? "http://localhost:8000"
export default function AdminPage() {
  const { token, isAuthed } = useAuth()
  const router = useRouter()
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // if (!isAuthed) router.push("/login")
  }, [isAuthed])
  const resetAll = async () => {
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch(`${GATEWAY}/wallet/reset/all`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail ?? "failed")
      setStatus(`✓ Reset ${data.reset_count} wallets to ₹${data.balance.toLocaleString("en-IN")}`)
    } catch (e: any) {
      setStatus(`✗ ${e.message}`)
    } finally {
      setLoading(false)
    }
  }
  if (!isAuthed) return null
  return (
    <main className="min-h-screen px-4 py-8 max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.push("/")} className="text-white/30 hover:text-white/70 text-sm transition-colors">
          ← Back
        </button>
        <h1 className="text-lg font-bold text-white">Admin Panel</h1>
      </div>
      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-mono text-white/40 tracking-widest mb-1">SESSION MANAGEMENT</p>
          <p className="text-sm text-white/60 mb-4">
            Reset all user wallets to ₹1,00,000 and clear all trades and positions.
            Use this before starting a new test session.
          </p>
          <Button variant="sell" loading={loading} onClick={resetAll} className="w-full py-2.5">
            Reset All Wallets
          </Button>
          {status && (
            <p className={`mt-3 text-xs px-3 py-2 rounded-lg ${
              status.startsWith("✓")
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}>
              {status}
            </p>
          )}
        </Card>
        <Card className="p-5">
          <p className="text-xs font-mono text-white/40 tracking-widest mb-1">TEST CREDENTIALS</p>
          <p className="text-sm text-white/60 mb-3">
            Seed 20 test users by running from your terminal:
          </p>
          <pre className="bg-white/4 rounded-lg px-3 py-2 text-xs font-mono text-white/70 overflow-x-auto">
            python scripts/seed_users.py
          </pre>
          <p className="text-xs text-white/30 mt-2">
            Logins: trader01–trader20 / test1234
          </p>
        </Card>
      </div>
    </main>
  )
}