"use client"
import { AppNav } from "./AppNav"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: "#0a0f1e",
      color: "#e7eaf3",
      overflow: "hidden",
    }}>
      <AppNav />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
        {children}
      </main>
    </div>
  )
}
