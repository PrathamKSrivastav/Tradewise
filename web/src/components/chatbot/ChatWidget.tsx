// web/src/components/chatbot/ChatWidget.tsx
"use client"
import { useState, useRef, useEffect } from "react"
import { useUserStore } from "../../store/userStore"
import { buildChartContext, chartContextToPrompt } from "../../lib/chartContext"
import { Message } from "./Message"
import type { ChatMessage } from "./Message"
import type { Candle } from "../../lib/types"
const GATEWAY = process.env.NEXT_PUBLIC_GATEWAY_URL ?? "http://localhost:8000"
interface Props {
  symbol: string
  candles: Candle[]
}
export function ChatWidget({ symbol, candles }: Props) {
  const { token } = useUserStore()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi! I can analyse the chart and suggest whether to buy or sell. Ask me anything about the current candles." },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  const send = async () => {
    const question = input.trim()
    if (!question || loading || !token) return
    setInput("")
    setMessages((m) => [...m, { role: "user", text: question }])
    setMessages((m) => [...m, { role: "bot", text: "", loading: true }])
    setLoading(true)
    try {
      const ctx = buildChartContext(symbol, candles)
      const chart_prompt = ctx ? chartContextToPrompt(ctx) : "No chart data available yet."
      const res = await fetch(`${GATEWAY}/rag/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question, chart_prompt }),
      })
      const data = await res.json()
      const answer = data.answer ?? "Sorry, I could not generate a response."
      setMessages((m) => [...m.slice(0, -1), { role: "bot", text: answer }])
    } catch {
      setMessages((m) => [...m.slice(0, -1), { role: "bot", text: "Connection error — try again." }])
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 h-[440px] flex flex-col rounded-2xl border border-white/12 bg-[#0f0f17] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-white/4">
            <div>
              <p className="text-sm font-semibold text-white">Chart Advisor</p>
              <p className="text-[10px] text-white/30">Sees only what you see</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white/70 text-lg leading-none">×</button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
            {messages.map((m, i) => <Message key={i} msg={m} />)}
            <div ref={bottomRef} />
          </div>
          <div className="px-3 py-3 border-t border-white/8 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Should I buy now?"
              className="flex-1 bg-white/6 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-3 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 disabled:opacity-30 text-white text-sm font-bold transition-all"
            >
              →
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-12 h-12 rounded-full bg-indigo-500 hover:bg-indigo-400 shadow-lg text-white text-xl flex items-center justify-center transition-all"
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  )
}