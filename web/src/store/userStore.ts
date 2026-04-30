// web/src/store/userStore.ts
import { create } from "zustand"
import type { Position, Wallet } from "@/lib/types"
interface UserState {
  user_id: number | null
  username: string | null
  token: string | null
  wallet: Wallet | null
  positions: Position[]
  setAuth: (user_id: number, username: string, token: string) => void
  setWallet: (wallet: Wallet) => void
  setPositions: (positions: Position[]) => void
  updatePositionPrice: (symbol: string, price: number) => void
  logout: () => void
}
export const useUserStore = create<UserState>((set, get) => ({
  user_id: null,
  username: null,
  token: null,
  wallet: null,
  positions: [],
  setAuth: (user_id, username, token) => {
    if (typeof window !== "undefined") localStorage.setItem("tw_token", token)
    set({ user_id, username, token })
  },
  setWallet: (wallet) => set({ wallet }),
  setPositions: (positions) => set({ positions }),
  updatePositionPrice: (symbol, price) =>
    set((state) => ({
      positions: state.positions.map((p) =>
        p.symbol === symbol
          ? {
              ...p,
              current_price: price,
              unrealised_pnl: Number(((price - p.avg_buy_price) * p.quantity).toFixed(2)),
            }
          : p
      ),
    })),
  logout: () => {
    if (typeof window !== "undefined") localStorage.removeItem("tw_token")
    set({ user_id: null, username: null, token: null, wallet: null, positions: [] })
  },
}))