// web/src/components/ui/RiskBadge.tsx
import clsx from "clsx"
const config: Record<string, { label: string; cls: string }> = {
  LOW:      { label: "LOW RISK",    cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  MEDIUM:   { label: "MED RISK",   cls: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  HIGH:     { label: "HIGH RISK",   cls: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  EXTREME:  { label: "EXTREME",     cls: "bg-red-500/15 text-red-400 border-red-500/30" },
}
export function RiskBadge({ level }: { level: string }) {
  const c = config[level] ?? config.LOW
  return (
    <span className={clsx("inline-block text-[10px] font-bold tracking-widest px-2 py-0.5 rounded border", c.cls)}>
      {c.label}
    </span>
  )
}