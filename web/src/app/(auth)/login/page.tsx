// web/src/app/(auth)/login/page.tsx
"use client"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "../../../hooks/useAuth"
import { Button } from "../../../components/ui/Button"
export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      await login(email, password)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Tradewise</h1>
          <p className="text-sm text-white/40 mt-1">Sign in to your account</p>
        </div>
        <div className="flex flex-col gap-3 bg-white/4 border border-white/8 rounded-2xl p-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="bg-white/6 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="bg-white/6 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
          />
          {error && <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}
          <Button variant="primary" loading={loading} onClick={handleSubmit} className="w-full py-2.5 mt-1">
            Sign In
          </Button>
          <p className="text-center text-xs text-white/30">
            No account?{" "}
            <Link href="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}