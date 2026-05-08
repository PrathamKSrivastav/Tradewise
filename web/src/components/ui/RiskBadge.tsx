// web/src/components/ui/RiskBadge.tsx
import clsx from "clsx"
const config: Record<string, { label: string; dot: string; cls: string }> = {
  LOW:     { label: "Low",     dot: "bg-emerald-400", cls: "bg-emerald-400/10 text-emerald-400 ring-emerald-400/25" },
  MEDIUM:  { label: "Medium",  dot: "bg-amber-400",   cls: "bg-amber-400/10 text-amber-400 ring-amber-400/25" },
  HIGH:    { label: "High",    dot: "bg-orange-400",  cls: "bg-orange-400/10 text-orange-400 ring-orange-400/25" },
  EXTREME: { label: "Extreme", dot: "bg-rose-400",    cls: "bg-rose-400/10 text-rose-400 ring-rose-400/25" },
}
export function RiskBadge({ level }: { level: string }) {
  const c = config[level] ?? config.LOW
  return (
    <span className={clsx("inline-flex items-center gap-1 text-[10.5px] font-semibold tracking-[0.12em] uppercase px-2 py-0.5 rounded-pill ring-1", c.cls)}>
      <span className={clsx("w-1.5 h-1.5 rounded-full flex-none", c.dot)} />
      {c.label}
    </span>
  )
}