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
    <div style={{
      display: "flex",
      width: "100vw",
      height: "100vh",
      background: "#0a0f1e",
      color: "#e7eaf3",
      overflow: "hidden",
      position: "relative",
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(60% 50% at 30% 20%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(45% 40% at 80% 90%, rgba(245,158,11,0.07) 0%, transparent 60%)"
      }} />

      {/* Left brand panel */}
      <div style={{
        position: "relative",
        width: "50%",
        flexShrink: 0,
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}>
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 36, height: 36, flexShrink: 0,
            display: "grid", placeItems: "center",
            borderRadius: 7, background: "#6366f1",
          }}>
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <rect x="5" y="5" width="2" height="10" rx="0.5" fill="white" opacity=".95"/>
              <rect x="9" y="3" width="2" height="14" rx="0.5" fill="white" opacity=".7"/>
              <rect x="13" y="7" width="2" height="8" rx="0.5" fill="white" opacity=".95"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: "#e7eaf3" }}>Tradewise</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>FinSim Academy</div>
          </div>
        </div>

        {/* Hero copy */}
        <div style={{ maxWidth: 440 }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>
            Learn · Practice · Compete
          </div>
          <h1 style={{ fontSize: 40, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.02em", color: "#e7eaf3", marginBottom: 20, margin: "0 0 20px 0" }}>
            The risk-free way to{" "}
            <span style={{ color: "#818cf8" }}>learn the Indian markets.</span>
          </h1>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: "20px 0" }}>
            Trade Nifty-style instruments with virtual ₹5 lakh, finish 8 levels of curriculum, and earn a verified certificate from FinSim Academy.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ padding: "4px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 500, background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)" }}>
              SEBI-aligned curriculum
            </span>
            <span style={{ padding: "4px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 500, background: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)" }}>
              Earn XP · Streaks
            </span>
          </div>
        </div>

        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>
          v2.4.0 · For educational use only · Not investment advice
        </div>
      </div>

      {/* Right auth panel */}
      <div style={{
        position: "relative",
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem",
      }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          {/* Card */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: "28px",
          }}>
            {/* Tab toggle */}
            <div style={{
              display: "flex",
              padding: 4,
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              marginBottom: 24,
              gap: 4,
            }}>
              <button style={{
                flex: 1, height: 36, borderRadius: 6, fontSize: 13, fontWeight: 500,
                background: "rgba(255,255,255,0.08)", color: "#e7eaf3",
                border: "1px solid rgba(255,255,255,0.12)", cursor: "default",
              }}>Sign in</button>
              <Link href="/register" style={{
                flex: 1, height: 36, borderRadius: 6, fontSize: 13, fontWeight: 500,
                color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center",
                justifyContent: "center", textDecoration: "none",
              }}>Register</Link>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>Welcome back</div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>Sign in to keep your portfolio + XP.</div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
              {/* Email */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.55)", marginBottom: 6, fontWeight: 500 }}>Email</label>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8, height: 40, padding: "0 12px",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: "rgba(255,255,255,0.3)" }}>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1, background: "transparent", border: "none", outline: "none",
                      fontSize: 13.5, color: "#e7eaf3", minWidth: 0,
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Password</label>
                  <a style={{ fontSize: 12, color: "#818cf8", cursor: "pointer" }}>Forgot password?</a>
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8, height: 40, padding: "0 12px",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: "rgba(255,255,255,0.3)" }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      flex: 1, background: "transparent", border: "none", outline: "none",
                      fontSize: 13.5, color: "#e7eaf3", minWidth: 0,
                    }}
                  />
                </div>
              </div>

              {error && (
                <div style={{ fontSize: 12, color: "#f87171", background: "rgba(239,68,68,0.1)", borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
                  {error}
                </div>
              )}

              <Button variant="primary" size="lg" loading={loading} type="submit" className="w-full">
                Sign in
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </form>

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center", fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>
              No account?{" "}
              <Link href="/register" style={{ color: "#818cf8", fontWeight: 500, textDecoration: "none" }}>Register →</Link>
            </div>
          </div>

          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", textAlign: "center", marginTop: 20, lineHeight: 1.6 }}>
            By continuing you agree to our Terms and Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  )
}
