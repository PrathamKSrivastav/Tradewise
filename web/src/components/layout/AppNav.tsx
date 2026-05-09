"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useWallet } from "@/hooks/useWallet"

const NAV = [
  { href: "/",            label: "Simulator"   },
  { href: "/academy",     label: "Academy"     },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/portfolio",   label: "Portfolio"   },
  { href: "/profile",     label: "Profile"     },
  { href: "/certificate", label: "Certificate" },
]

export function AppNav() {
  const path = usePathname()
  const { username, signOut } = useAuth()
  const { wallet } = useWallet()

  return (
    <header style={{
      height: 56,
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(10,15,30,0.92)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      flexShrink: 0,
    }}>
      {/* Left: brand + nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {/* Wordmark */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 32, height: 32, flexShrink: 0,
            display: "grid", placeItems: "center",
            borderRadius: 7, background: "#6366f1",
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="5" y="5" width="2" height="10" rx="0.5" fill="white" opacity=".95"/>
              <rect x="9" y="3" width="2" height="14" rx="0.5" fill="white" opacity=".7"/>
              <rect x="13" y="7" width="2" height="8" rx="0.5" fill="white" opacity=".95"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", color: "#e7eaf3", lineHeight: 1 }}>Tradewise</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>FinSim Academy</div>
          </div>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {NAV.map(({ href, label }) => {
            const active = href === "/" ? path === "/" : path.startsWith(href)
            return (
              <Link key={href} href={href} style={{
                padding: "6px 10px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
                color: active ? "#e7eaf3" : "rgba(255,255,255,0.5)",
                background: active ? "rgba(255,255,255,0.05)" : "transparent",
                border: active ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                transition: "color 0.15s",
              }}>
                {label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Right: wallet + user + sign out */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {wallet && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "0 12px", height: 36, borderRadius: 8,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)" }}>WALLET</span>
            <span style={{ fontFamily: "monospace", fontSize: 13, color: "#e7eaf3" }}>
              ₹{wallet.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        )}
        {username && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "0 12px 0 4px", height: 36, borderRadius: 8,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <UserAvatar name={username} size={28} />
            <span style={{ fontSize: 12.5, color: "#e7eaf3" }}>{username}</span>
          </div>
        )}
        <button onClick={signOut} style={{
          fontSize: 12.5, color: "rgba(255,255,255,0.35)",
          background: "none", border: "none", cursor: "pointer", padding: "0 8px",
        }}>
          Sign out
        </button>
      </div>
    </header>
  )
}

function UserAvatar({ name, size }: { name: string; size: number }) {
  const initials = name.split(/[_.\s]/).map((s: string) => s[0]).slice(0, 2).join("").toUpperCase()
  const tones = [
    { bg: "rgba(99,102,241,0.3)",  color: "#a5b4fc" },
    { bg: "rgba(245,158,11,0.25)", color: "#fcd34d" },
    { bg: "rgba(52,211,153,0.25)", color: "#6ee7b7" },
    { bg: "rgba(248,113,113,0.25)",color: "#fca5a5" },
    { bg: "rgba(56,189,248,0.25)", color: "#7dd3fc" },
  ]
  const t = tones[(name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % tones.length]
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      display: "grid", placeItems: "center",
      borderRadius: "50%",
      background: t.bg,
      color: t.color,
      fontSize: Math.max(9, size * 0.38),
      fontWeight: 600,
      border: "1px solid rgba(255,255,255,0.1)",
    }}>
      {initials}
    </div>
  )
}
