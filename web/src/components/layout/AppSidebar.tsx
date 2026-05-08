"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const NAV_ITEMS = [
  { href: "/",            icon: "show_chart",     label: "Simulator"    },
  { href: "/academy",     icon: "school",         label: "Academy"      },
  { href: "/leaderboard", icon: "social_leaderboard", label: "Leaderboard" },
]

export function AppSidebar() {
  const path = usePathname()

  return (
    <aside className="app-sidebar flex flex-col py-lg gap-xs">
      {NAV_ITEMS.map(({ href, icon, label }) => {
        const active = href === "/" ? path === "/" : path.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-md px-lg py-sm mx-sm rounded-xl text-label-md font-label-md transition-all duration-150",
              active
                ? "bg-primary/10 text-primary border-l-2 border-primary"
                : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface border-l-2 border-transparent",
            )}
          >
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
            {label}
          </Link>
        )
      })}

      <div className="mt-auto px-lg py-md">
        <Link
          href="/academy/exam"
          className="flex items-center gap-sm px-md py-sm rounded-xl bg-secondary/10 border border-secondary/30 text-secondary text-label-md font-label-md hover:bg-secondary/20 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
          Final Exam
        </Link>
      </div>
    </aside>
  )
}
