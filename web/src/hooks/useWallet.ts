// web/src/hooks/useWallet.ts
"use client"
import { useEffect, useCallback } from "react"
import { useUserStore } from "../store/userStore"
import { fetchWallet, fetchPositions } from "../lib/api"
export function useWallet() {
  const { token, wallet, positions, setWallet, setPositions } = useUserStore()
  const refresh = useCallback(async () => {
    if (!token) return
    try {
      const [w, p] = await Promise.all([fetchWallet(token), fetchPositions(token)])
      setWallet(w)
      setPositions(p)
    } catch {
      // silently ignore — stale data is acceptable between refreshes
    }
  }, [token])
  // initial fetch + poll every 30s
  useEffect(() => {
    refresh()
    const id = setInterval(refresh, 30_000)
    return () => clearInterval(id)
  }, [refresh])
  return { wallet, positions, refresh }
}