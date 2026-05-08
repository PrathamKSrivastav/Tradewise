// web/src/components/ui/Card.tsx
import clsx from "clsx"

interface CardProps {
  children: React.ReactNode
  className?: string
  tone?: "1" | "2"
}

export function Card({ children, className, tone = "1" }: CardProps) {
  return (
    <div className={clsx(
      "rounded-card ring-1 ring-stroke1",
      tone === "2" ? "bg-elev2" : "bg-elev1",
      className,
    )}>
      {children}
    </div>
  )
}
