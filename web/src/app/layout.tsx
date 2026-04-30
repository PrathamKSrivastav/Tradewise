// web/src/app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "Tradewise — Indian Market Simulator",
  description: "Learn candlestick trading with zero real money",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#07070d] text-white antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  )
}