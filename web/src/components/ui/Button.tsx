// web/src/components/ui/Button.tsx
import clsx from "clsx"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "buy" | "sell" | "ghost"
  loading?: boolean
}
const variants = {
  primary: "bg-indigo-500 hover:bg-indigo-400 text-white",
  buy:     "bg-emerald-500 hover:bg-emerald-400 text-white",
  sell:    "bg-red-500 hover:bg-red-400 text-white",
  ghost:   "bg-white/8 hover:bg-white/12 text-white/80",
}
export function Button({ variant = "primary", loading, children, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold",
        "transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed",
        variants[variant],
        className,
      )}
    >
      {loading && (
        <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      )}
      {children}
    </button>
  )
}