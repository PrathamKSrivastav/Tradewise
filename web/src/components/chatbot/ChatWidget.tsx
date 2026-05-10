"use client"
import { useState, useRef, useEffect } from "react"
import { useUserStore } from "../../store/userStore"
import { buildChartContext, chartContextToPrompt, buildLessonSnapshot, lessonSnapshotToPrompt } from "../../lib/snapshotBuilder"
import { Message } from "./Message"
import type { ChatMessage } from "./Message"
import type { Candle } from "../../lib/types"
import type { LessonObject } from "@/types/lesson"
import clsx from "clsx"

const GATEWAY = process.env.NEXT_PUBLIC_GATEWAY_URL ?? "http://localhost:8000"
const MAX_MESSAGES = 20

interface SimulatorProps {
  mode: "simulator"
  symbol: string
  candles: Candle[]
  lesson?: never
  lastQuizScore?: never
  inline?: boolean
}

interface LessonProps {
  mode: "lesson"
  lesson: LessonObject
  lastQuizScore?: number
  symbol?: never
  candles?: never
  inline?: boolean
}

type Props = SimulatorProps | LessonProps

export function ChatWidget(props: Props) {
  const { token } = useUserStore()
  const [open, setOpen] = useState(props.inline ?? false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: props.mode === "lesson"
        ? `Hi! I'm grounded to "${props.lesson.title}". Ask me anything about this lesson.`
        : "Hi! I can analyse the chart and suggest whether to buy or sell. Ask me anything about the current candles.",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [messagesUsed, setMessagesUsed] = useState(0)
  const [grounding, setGrounding] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Force open if inline
  useEffect(() => {
    if (props.inline) setOpen(true)
  }, [props.inline])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = async () => {
    const question = input.trim()
    if (!question || loading || !token || messagesUsed >= MAX_MESSAGES) return
    setInput("")
    setMessages(m => [...m, { role: "user", text: question }])
    setMessages(m => [...m, { role: "bot", text: "", loading: true }])
    setLoading(true)

    try {
      let body: Record<string, unknown>
      if (props.mode === "lesson") {
        const snap = buildLessonSnapshot(props.lesson, "", props.lastQuizScore)
        body = { question, mode: "lesson", lesson_snapshot: lessonSnapshotToPrompt(snap), lesson_title: props.lesson.title, chart_prompt: "" }
      } else {
        const ctx = buildChartContext(props.symbol, props.candles)
        body = { 
          question, 
          mode: "simulator", 
          symbol: props.symbol,
          chart_prompt: ctx ? chartContextToPrompt(ctx) : "No chart data available yet.", 
          lesson_snapshot: "", 
          lesson_title: "" 
        }
      }

      const response = await fetch(`${GATEWAY}/rag/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      })

      if (!response.ok) throw new Error("Stream failed")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ""

      if (!reader) throw new Error("No reader")

      // Remove the loading message and add an empty bot message to start streaming
      setMessages(m => [...m.slice(0, -1), { role: "bot", text: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const rawData = line.slice(6)
            const data = rawData.trim()
            
            if (data === "[DONE]") {
              setLoading(false)
              setMessagesUsed(m => m + 1)
              continue
            }
            if (data === "[RATE_LIMITED]") {
              setMessages(m => [...m.slice(0, -1), { role: "bot", text: "You've reached the session limit." }])
              setLoading(false)
              return
            }
            
            // Unescape newlines from backend, preserve the rest of the chunk (including spaces)
            const text = rawData.replace(/\\n/g, "\n")
            fullText += text
            setMessages(m => {
              const last = m[m.length - 1]
              return [...m.slice(0, -1), { ...last, text: fullText }]
            })
          }
        }
      }
    } catch {
      setMessages(m => [...m.slice(0, -1), { role: "bot", text: "Connection error — try again." }])
    } finally {
      setLoading(false)
    }
  }

  const remaining = MAX_MESSAGES - messagesUsed
  const isLesson = props.mode === "lesson"

  const widgetContent = (
    <div className={clsx(
      "flex flex-col bg-[#0d1120] border-l border-stroke1 shadow-2xl transition-transform duration-300",
      props.inline ? "h-full w-full" : "fixed top-0 right-0 bottom-0 z-50 w-[600px]",
      !props.inline && (open ? "translate-x-0" : "translate-x-full")
    )}>
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-5 border-b border-stroke1 flex-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-btn bg-indigo-500/20 ring-1 ring-indigo-500/30 grid place-items-center">
            <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a8 8 0 1 1 0 16A8 8 0 0 1 10 2Zm0 3a1 1 0 0 0-1 1v4a1 1 0 0 0 .553.894l3 1.5a1 1 0 0 0 .894-1.788L11 9.382V6a1 1 0 0 0-1-1Z" />
            </svg>
          </div>
          <div>
            <div className="text-[13.5px] font-semibold">{isLesson ? "Lesson Tutor" : "FinSim AI"}</div>
            <div className="text-[11px] text-ink3 line-clamp-1">{grounding ?? (isLesson ? `Grounded to: ${props.lesson.title}` : "Chart-aware · sees only what you see")}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-ink3 mono">{remaining}/{MAX_MESSAGES}</span>
          {!props.inline && (
            <button onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-btn bg-white/5 hover:bg-white/8 grid place-items-center text-ink3 hover:text-ink transition">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 scrollbar-none">
        {messages.map((m, i) => <Message key={i} msg={m} />)}
        <div ref={bottomRef} />
      </div>

      {/* Rate limit warning */}
      {remaining <= 3 && remaining > 0 && (
        <div className="px-5 py-2 bg-amber-500/10 border-t border-amber-500/20">
          <p className="text-[11px] text-amber-400">{remaining} message{remaining !== 1 ? "s" : ""} remaining</p>
        </div>
      )}

      {/* Input */}
      <div className="px-5 py-4 border-t border-stroke1 flex gap-2 flex-none">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder={isLesson ? "Ask about this lesson…" : "Should I buy now?"}
          disabled={remaining <= 0}
          className="flex-1 bg-black/30 ring-1 ring-stroke1 hover:ring-stroke2 focus:ring-indigo-500/50 rounded-btn px-3 py-2 text-[13px] text-ink placeholder:text-ink3/70 focus:outline-none transition disabled:opacity-40"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim() || remaining <= 0}
          className="h-10 px-4 rounded-btn bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-medium disabled:opacity-30 transition"
        >
          Send
        </button>
      </div>
    </div>
  )

  if (props.inline) return widgetContent

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
      )}

      {widgetContent}

      {/* FAB pill */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 h-11 rounded-pill bg-indigo-500 hover:bg-indigo-600 text-white text-[13.5px] font-medium shadow-lg shadow-indigo-500/25 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-3 3v-3H4a2 2 0 0 1-2-2V5Z" />
          </svg>
          Ask FinSim AI
        </button>
      )}
    </>
  )
}
