// web/tailwind.config.ts
import type { Config } from "tailwindcss"
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Design-system canvas / elevation / stroke
        canvas: "#0a0f1e",
        elev1:  "rgba(255,255,255,0.04)",
        elev2:  "rgba(255,255,255,0.06)",
        elev3:  "rgba(255,255,255,0.08)",
        stroke1:"rgba(255,255,255,0.08)",
        stroke2:"rgba(255,255,255,0.12)",
        stroke3:"rgba(255,255,255,0.18)",
        // Text
        ink:  "#e7eaf3",
        ink2: "#aab1c4",
        ink3: "#6b7393",
        // Semantic palette (MD3 kept for backward compat)
        "background":                "#0a0f1e",
        "surface":                   "#0a0f1e",
        "surface-container-lowest":  "#0d0d15",
        "surface-container-low":     "#1b1b23",
        "surface-container":         "#1f1f27",
        "surface-container-high":    "#292932",
        "surface-container-highest": "#34343d",
        "on-surface":                "#e7eaf3",
        "on-surface-variant":        "#aab1c4",
        "outline":                   "#908fa0",
        "outline-variant":           "rgba(255,255,255,0.08)",
        "primary":                   "#c0c1ff",
        "inverse-primary":           "#6366f1",
        "on-primary":                "#ffffff",
        "secondary":                 "#f59e0b",
        "tertiary":                  "#ffb783",
        "error":                     "#f87171",
        "on-error":                  "#ffffff",
        // Explicit brand overrides
        indigo: { 400:"#818cf8", 500:"#6366f1", 600:"#4f46e5" },
        amber:  { 400:"#fbbf24", 500:"#f59e0b", 600:"#d97706" },
        emerald:{ 400:"#34d399", 500:"#10b981" },
        rose:   { 400:"#f87171", 500:"#ef4444" },
        orange: { 300:"#fda06a", 400:"#fb923c" },
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        card:    "12px",
        btn:     "8px",
        pill:    "9999px",
        lg:      "0.5rem",
        xl:      "0.75rem",
        "2xl":   "1rem",
        full:    "9999px",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
export default config
