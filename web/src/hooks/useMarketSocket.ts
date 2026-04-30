// web/src/hooks/useMarketSocket.ts
"use client"
import { useEffect, useRef } from "react"
import { useMarketStore } from "../store/marketStore"
import { useUserStore } from "../store/userStore"
import { fetchCandles } from "../lib/api"
import type { Candle } from "../lib/types"
const WS_BASE = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000"
const RECONNECT_DELAY_MS = 3000
export function useMarketSocket(symbol: string) {
  const { pushCandle, setHistory, candles, lastPrice } = useMarketStore()
  const { token, updatePositionPrice } = useUserStore()
  const wsRef = useRef<WebSocket | null>(null)
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeRef = useRef(true)
  // load historical candles once on mount
  useEffect(() => {
    if (!token || !symbol) return
    fetchCandles(symbol, token).then((data) => setHistory(symbol, data)).catch(() => {})
  }, [symbol, token])
  // websocket connection with auto-reconnect
  useEffect(() => {
    if (!symbol) return
    activeRef.current = true
    const connect = () => {
      if (!activeRef.current) return
      const ws = new WebSocket(`${WS_BASE}/ws/${symbol}`)
      wsRef.current = ws
      ws.onmessage = (evt) => {
        try {
          const candle: Candle = JSON.parse(evt.data)
          pushCandle(candle)
          updatePositionPrice(candle.symbol, candle.close)
        } catch {}
      }
      ws.onclose = () => {
        if (!activeRef.current) return
        retryRef.current = setTimeout(connect, RECONNECT_DELAY_MS)
      }
      ws.onerror = () => ws.close()
      // send heartbeat every 30s to keep connection alive
      const heartbeat = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) ws.send("ping")
      }, 30_000)
      ws.addEventListener("close", () => clearInterval(heartbeat))
    }
    connect()
    return () => {
      activeRef.current = false
      if (retryRef.current) clearTimeout(retryRef.current)
      wsRef.current?.close()
    }
  }, [symbol])
  return {
    candles: candles[symbol] ?? [],
    lastPrice: lastPrice[symbol] ?? 0,
  }
}