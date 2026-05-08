// web/src/app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Tradewise — FinSim Academy",
  description: "Risk-free trading simulation and AI-guided financial education for Indian investors.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-canvas text-ink antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
