// web/src/app/(auth)/login/page.tsx
"use client"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "../../../hooks/useAuth"
import { Button } from "../../../components/ui/Button"
import clsx from "clsx"

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
    <div className="min-h-screen w-full bg-[#0a0f1e] text-[#e7eaf3] flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative font-sans">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-amber-500/5 blur-[100px]" />
      </div>

      {/* Left brand panel */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/20 lg:bg-transparent">
        {/* Wordmark */}
        <div className="flex items-center gap-3 mb-12 lg:mb-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 grid place-items-center shadow-lg shadow-indigo-500/20">
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
              <rect x="5" y="5" width="2" height="10" rx="0.5" fill="white" opacity=".95"/>
              <rect x="9" y="3" width="2" height="14" rx="0.5" fill="white" opacity=".7"/>
              <rect x="13" y="7" width="2" height="8" rx="0.5" fill="white" opacity=".95"/>
            </svg>
          </div>
          <div>
            <div className="text-[20px] font-black tracking-tight leading-none">Tradewise</div>
            <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1 font-bold">FinSim Academy</div>
          </div>
        </div>

        {/* Hero copy */}
        <div className="max-w-md py-12 lg:py-0">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6">
            Learn · Practice · Compete
          </div>
          <h1 className="text-[40px] lg:text-[52px] font-black leading-[1.05] tracking-tight mb-8">
            The risk-free way to <br/>
            <span className="text-indigo-400">learn the markets.</span>
          </h1>
          <p className="text-[16px] leading-relaxed text-white/50 mb-10">
            Trade Nifty-style instruments with virtual ₹5 lakh, finish 8 levels of curriculum, and earn a verified certificate from FinSim Academy.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold">
              SEBI-aligned curriculum
            </div>
            <div className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-bold">
              Earn XP · Streaks
            </div>
          </div>
        </div>

        <div className="hidden lg:block text-[10px] text-white/20 font-mono tracking-widest uppercase mt-12 lg:mt-0">
          v2.4.0 · For educational use only
        </div>
      </div>

      {/* Right auth panel */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 py-16 lg:py-0">
        <div className="w-full max-w-[400px]">
          {/* Card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-xl shadow-2xl">
            {/* Tab toggle */}
            <div className="flex p-1 bg-black/40 border border-white/5 rounded-2xl mb-10">
              <div className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[13px] font-bold text-white shadow-lg">
                Sign in
              </div>
              <Link href="/register" className="flex-1 h-10 flex items-center justify-center text-[13px] font-bold text-white/40 hover:text-white/70 transition-colors no-underline">
                Register
              </Link>
            </div>

            <div className="mb-10">
              <h2 className="text-[24px] font-black tracking-tight text-white mb-2">Welcome back</h2>
              <p className="text-[14px] text-white/40">Enter your credentials to access your terminal.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/50 ml-1">Email</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-indigo-400 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/50">Password</label>
                  <a className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors">Forgot?</a>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-indigo-400 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-12 bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[12px] font-bold p-4 rounded-2xl animate-in fade-in slide-in-from-top-2">
                  {error}
                </div>
              )}

              <Button variant="primary" size="lg" loading={loading} type="submit" className="w-full h-12 rounded-2xl text-[14px] font-black uppercase tracking-widest bg-indigo-500 hover:bg-indigo-400 shadow-xl shadow-indigo-500/20 active:scale-[0.98] transition-all">
                Sign in
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-2">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <span className="text-[13px] text-white/40">New to Tradewise?</span>{" "}
              <Link href="/register" className="text-[13px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors no-underline">
                Create account →
              </Link>
            </div>
          </div>

          <div className="text-[11px] text-white/20 text-center mt-8 px-8 leading-relaxed uppercase tracking-wider font-bold">
            By continuing you agree to our <br className="lg:hidden" /> Terms and Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  )
}
