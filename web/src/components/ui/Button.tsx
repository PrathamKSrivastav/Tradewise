// web/src/components/ui/Button.tsx
import clsx from "clsx"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "amber" | "secondary" | "ghost" | "danger" | "buy" | "sell"
  size?: "sm" | "md" | "lg" | "xl"
  loading?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  as?: "button" | "a"
}

const variants = {
  primary:   "bg-indigo-500 hover:bg-indigo-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]",
  amber:     "bg-amber-500 hover:bg-amber-600 text-[#231703] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]",
  secondary: "bg-white/5 hover:bg-white/8 text-ink ring-1 ring-stroke1 hover:ring-stroke2",
  ghost:     "text-ink2 hover:text-ink hover:bg-white/5",
  danger:    "bg-rose-500/15 text-rose-400 ring-1 ring-rose-400/30 hover:bg-rose-500/20",
  buy:       "bg-emerald-500 hover:bg-emerald-500/90 text-[#062a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]",
  sell:      "bg-rose-500 hover:bg-rose-500/90 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]",
}

const sizes = {
  sm: "h-8  px-3   text-[12.5px]",
  md: "h-10 px-4   text-[13.5px]",
  lg: "h-11 px-5   text-[14px]",
  xl: "h-12 px-6   text-[15px]",
}

export function Button({
  variant = "primary",
  size = "md",
  loading,
  icon,
  iconRight,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-medium rounded-btn transition select-none whitespace-nowrap",
        "disabled:opacity-40 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {loading && <span className="h-3.5 w-3.5 rounded-full border-2 border-current/30 border-t-current animate-spin" />}
      {!loading && icon}
      {children}
      {iconRight}
    </button>
  )
}
