"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useWallet } from "@/hooks/useWallet"
import clsx from "clsx"

const NAV = [
  { href: "/",            label: "Simulator",   icon: "M3 12l9-9 9 9M5 10v10h14V10"  },
  { href: "/academy",     label: "Academy",     icon: "M12 14l9-5-9-5-9 5 9 5zm0 7V9m9-2v10M3 7v10" },
  { href: "/leaderboard", label: "Leaderboard", icon: "M16 4h2a2 2 0 0 1 2 2v14H4V6a2 2 0 0 1 2-2h2M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1z" },
  { href: "/portfolio",   label: "Portfolio",   icon: "M3 3v18h18M7 16l4-4 4 4 4-4" },
  { href: "/profile",     label: "Profile",     icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
  { href: "/certificate", label: "Certificate", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z" },
]

export function AppNav() {
  const path = usePathname()
  const { username, signOut } = useAuth()
  const { wallet } = useWallet()
  const [mobileOpen, setMobileOpen] = useState(false)

  const walletDotColor =
    wallet == null ? "" :
    wallet.balance > 50000 ? "bg-emerald-400" :
    wallet.balance >= 10000 ? "bg-amber-400" :
    "bg-rose-500"

  return (
    <header className="sticky top-0 z-50 flex-shrink-0 h-14 flex items-center justify-between px-4 lg:px-6 border-b border-white/[0.07] bg-[rgba(10,15,30,0.92)] backdrop-blur-xl">
      {/* Left: brand + desktop nav */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-8 h-8 flex-shrink-0 grid place-items-center rounded-[7px] bg-indigo-500 shadow-lg shadow-indigo-500/30 group-hover:bg-indigo-400 transition-colors">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <rect x="5" y="5" width="2" height="10" rx="0.5" fill="white" opacity=".95"/>
              <rect x="9" y="3" width="2" height="14" rx="0.5" fill="white" opacity=".7"/>
              <rect x="13" y="7" width="2" height="8" rx="0.5" fill="white" opacity=".95"/>
            </svg>
          </div>
          <div className="hidden sm:block">
            <div className="text-[16px] font-semibold tracking-[-0.02em] text-[#e7eaf3] leading-none">Tradewise</div>
            <div className="text-[9px] text-white/30 tracking-[0.18em] uppercase mt-0.5">FinSim Academy</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV.map(({ href, label }) => {
            const active = href === "/" ? path === "/" : path.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-all duration-150",
                  active
                    ? "bg-white/[0.07] text-white ring-1 ring-white/[0.08]"
                    : "text-white/45 hover:text-white/80 hover:bg-white/[0.04]"
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Right: wallet + user + hamburger */}
      <div className="flex items-center gap-2">
        {/* Wallet */}
        {wallet == null ? (
          <div className="animate-pulse bg-white/[0.08] rounded w-24 h-4" />
        ) : (
          <div className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.05] ring-1 ring-white/[0.07]">
            <div className="relative flex items-center gap-1.5">
              <span className="text-[10.5px] font-semibold tracking-[0.12em] text-white/30 uppercase">Wallet</span>
              <span className={clsx("w-1.5 h-1.5 rounded-full flex-shrink-0", walletDotColor)} />
            </div>
            <span className="font-mono text-[12.5px] text-[#e7eaf3] tabular-nums">
              ₹{wallet.balance.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
          </div>
        )}

        {/* User chip */}
        {username && (
          <div className="hidden sm:flex items-center gap-2 h-9 pl-1 pr-3 rounded-lg bg-white/[0.05] ring-1 ring-white/[0.07]">
            <UserAvatar name={username} size={28} />
            <span className="text-[12px] text-[#e7eaf3] font-medium">{username}</span>
          </div>
        )}

        <button
          onClick={signOut}
          className="hidden sm:block text-[12px] text-white/30 hover:text-rose-400 transition px-2 py-1.5"
        >
          Sign out
        </button>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="lg:hidden w-9 h-9 grid place-items-center rounded-lg bg-white/[0.05] ring-1 ring-white/[0.07] text-white/60 hover:text-white transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-14 left-0 right-0 bg-[rgba(10,15,30,0.98)] backdrop-blur-xl border-b border-white/[0.07] shadow-2xl z-50 py-3 px-4 flex flex-col gap-1">
          {/* Mobile wallet row */}
          {wallet != null && (
            <div className="flex items-center gap-2 px-3 py-2 mb-1 rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06]">
              <span className={clsx("w-2 h-2 rounded-full flex-shrink-0", walletDotColor)} />
              <span className="text-[11px] text-white/30 uppercase tracking-widest font-semibold">Wallet</span>
              <span className="font-mono text-[13px] text-white ml-auto">
                ₹{wallet.balance.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
              </span>
            </div>
          )}
          {NAV.map(({ href, label, icon }) => {
            const active = href === "/" ? path === "/" : path.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all",
                  active
                    ? "bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/20"
                    : "text-white/55 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d={icon} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {label}
              </Link>
            )
          })}
          <div className="mt-1 pt-2 border-t border-white/[0.06] flex items-center justify-between">
            {username && (
              <div className="flex items-center gap-2">
                <UserAvatar name={username} size={24} />
                <span className="text-[12px] text-white/60">{username}</span>
              </div>
            )}
            <button onClick={signOut} className="text-[12px] text-white/30 hover:text-rose-400 transition px-2 py-1">
              Sign out
            </button>
          </div>
        </div>
      )}
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
