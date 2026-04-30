// web/src/components/ui/Card.tsx
import clsx from "clsx"
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-xl border border-white/8 bg-white/4 backdrop-blur-sm", className)}>
      {children}
    </div>
  )
}