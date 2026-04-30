// web/src/store/marketStore.ts
import { create } from "zustand"
import type { Candle } from "@/lib/types"
const MAX_CANDLES = 390
interface MarketState {
  candles: Record<string, Candle[]>
  lastPrice: Record<string, number>
  setHistory: (symbol: string, candles: Candle[]) => void
  pushCandle: (candle: Candle) => void
}
export const useMarketStore = create<MarketState>((set) => ({
  candles: {},
  lastPrice: {},
  setHistory: (symbol, candles) =>
    set((state) => ({
      candles: { ...state.candles, [symbol]: candles },
      lastPrice: {
        ...state.lastPrice,
        [symbol]: candles.length > 0 ? candles[candles.length - 1].close : 0,
      },
    })),
  pushCandle: (candle) =>
    set((state) => {
      const existing = state.candles[candle.symbol] ?? []
      const updated = [...existing, candle].slice(-MAX_CANDLES)
      return {
        candles: { ...state.candles, [candle.symbol]: updated },
        lastPrice: { ...state.lastPrice, [candle.symbol]: candle.close },
      }
    }),
}))