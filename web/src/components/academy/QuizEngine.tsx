"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import type { LessonObject } from "@/types/lesson"
import type { QuizQuestion, SubmitQuizResponse } from "@/lib/types"
import { Button } from "@/components/ui/Button"
import { useUserStore } from "@/store/userStore"
import { generateQuiz, submitQuiz } from "@/lib/api"

const LETTERS = ["A", "B", "C", "D"]

export function QuizEngine({ lesson }: { lesson: LessonObject }) {
  const router = useRouter()
  const { token, user_id: userId } = useUserStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState("")
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmitQuizResponse | null>(null)

  useEffect(() => {
    if (!token) return
    generateQuiz(token, userId!, lesson.id, lesson.quizSeed)
      .then(res => { setSessionId(res.sessionId); setQuestions(res.questions); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [token, userId, lesson.id])

  const handleNext = () => {
    if (selected === null) return
    const next = [...answers, selected]
    setAnswers(next)
    setSelected(null)
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
    } else {
      handleSubmit(next)
    }
  }

  const handleSubmit = async (finalAnswers: number[]) => {
    if (!token) return
    setSubmitting(true)
    try {
      const res = await submitQuiz(token, userId!, sessionId, finalAnswers, lesson.id)
      setResult(res)
      if (typeof window !== "undefined") localStorage.setItem(`quiz_score_${lesson.id}`, String(res.score))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "submission failed")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-ink2">
      <div className="h-6 w-6 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
      Generating quiz…
    </div>
  )

  if (error) return (
    <div className="text-center space-y-4 py-12">
      <p className="text-rose-400">{error}</p>
      <Button variant="ghost" onClick={() => router.back()}>← Back to lesson</Button>
    </div>
  )

  if (result) return (
    <QuizResult result={result} lesson={lesson} onRetry={() => {
      setResult(null); setAnswers([]); setCurrent(0); setSelected(null); setLoading(true)
      if (token) generateQuiz(token, userId!, lesson.id, lesson.quizSeed)
        .then(res => { setSessionId(res.sessionId); setQuestions(res.questions); setLoading(false) })
        .catch(e => { setError(e.message); setLoading(false) })
    }} />
  )

  const q = questions[current]
  const progress = (current / questions.length) * 100

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-ink">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-canvas/95 backdrop-blur-sm border-b border-stroke1">
        <div className="flex items-center justify-between max-w-3xl mx-auto px-6 h-14">
          <button onClick={() => router.back()}
            className="w-8 h-8 rounded-btn bg-white/5 hover:bg-white/8 ring-1 ring-stroke1 grid place-items-center text-ink2 hover:text-ink transition">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className="text-center">
            <div className="text-[11px] text-ink3">{lesson.title}</div>
            <div className="text-[14px] font-semibold">Lesson Quiz</div>
          </div>
          <div className="flex items-center gap-1 px-3 h-8 rounded-pill bg-white/5 ring-1 ring-stroke1 mono text-[12.5px]">
            <span className="text-ink">{String(current + 1).padStart(2, "0")}</span>
            <span className="text-ink3">/</span>
            <span className="text-ink3">{String(questions.length).padStart(2, "0")}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-white/8 mx-6">
          <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* Quiz canvas */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 flex flex-col justify-center">
        {/* Question */}
        <div className="mb-8">
          {q.difficulty && (
            <div className="inline-flex items-center gap-1.5 px-3 h-7 rounded-pill bg-indigo-500/10 ring-1 ring-indigo-500/20 text-[11.5px] text-indigo-400 font-semibold mb-4">
              {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
            </div>
          )}
          <h2 className="text-[22px] font-semibold tracking-[-0.01em] leading-snug">{q.question}</h2>
        </div>

        {/* Options 2×2 bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
          {q.options.map((opt, i) => {
            const isSelected = selected === i
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={clsx(
                  "group flex items-start p-4 rounded-card text-left relative overflow-hidden transition-all",
                  isSelected
                    ? "bg-indigo-500/12 ring-2 ring-indigo-500/50"
                    : "bg-elev1 ring-1 ring-stroke1 hover:bg-elev2 hover:ring-stroke2"
                )}
              >
                {/* Letter badge */}
                <div className={clsx(
                  "flex-shrink-0 w-9 h-9 rounded-btn grid place-items-center text-[13px] font-bold mr-3 transition-colors",
                  isSelected
                    ? "bg-indigo-500 text-white"
                    : "bg-white/6 ring-1 ring-stroke1 text-ink3 group-hover:bg-indigo-500/15 group-hover:text-indigo-400"
                )}>
                  {LETTERS[i]}
                </div>
                <p className={clsx("pt-1.5 text-[13.5px] leading-snug flex-1", isSelected ? "text-ink" : "text-ink2 group-hover:text-ink")}>
                  {opt}
                </p>
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-stroke1">
          <button className="flex items-center gap-1.5 px-3 h-9 rounded-btn text-[12.5px] text-ink3 hover:text-ink2 hover:bg-white/5 transition">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Review Later
          </button>
          <Button
            onClick={handleNext}
            disabled={selected === null || submitting}
            loading={submitting && current === questions.length - 1}
            size="lg"
            variant="primary"
            iconRight={<svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          >
            {current + 1 < questions.length ? "Next Question" : "Submit Quiz"}
          </Button>
        </div>
      </main>
    </div>
  )
}

function QuizResult({ result, lesson, onRetry }: { result: SubmitQuizResponse; lesson: LessonObject; onRetry: () => void }) {
  const router = useRouter()
  const passed = result.passed

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full rounded-card bg-elev1 ring-1 ring-stroke1 p-8 relative overflow-hidden text-center space-y-6">
        <div className="absolute top-0 inset-x-0 h-px bg-white/12" />

        {/* Score ring */}
        <div className={clsx(
          "mx-auto w-24 h-24 rounded-full flex flex-col items-center justify-center ring-4",
          passed ? "bg-emerald-400/10 ring-emerald-400/50" : "bg-rose-400/10 ring-rose-400/50"
        )}>
          <span className={clsx("mono text-[28px] font-bold num", passed ? "text-emerald-400" : "text-rose-400")}>
            {result.score}%
          </span>
        </div>

        <div>
          <h2 className="text-[22px] font-semibold">{passed ? "Well done!" : "Keep studying!"}</h2>
          <p className="text-[13px] text-ink2 mt-1">{result.correctAnswers.length} correct answers</p>
        </div>

        {passed && (
          <div className="rounded-card bg-white/4 ring-1 ring-stroke1 p-4 text-left space-y-2">
            <div className="text-[10.5px] text-ink3 font-semibold tracking-[0.14em] uppercase">Rewards</div>
            <div className="flex items-center gap-2 text-[13px]">
              <span className="text-amber-400">⚡</span>
              <span className="mono text-indigo-400 font-semibold">+{result.xpEarned} XP earned</span>
            </div>
            {result.newBadges.length > 0 && (
              <div className="text-[12.5px] text-amber-400">🏅 New badges: {result.newBadges.join(", ")}</div>
            )}
          </div>
        )}

        {!passed && (
          <div className="rounded-card bg-white/4 ring-1 ring-stroke1 p-4 text-left">
            <div className="text-[10.5px] text-ink3 font-semibold tracking-[0.14em] uppercase mb-3">Review these concepts</div>
            <ul className="space-y-2">
              {lesson.keyTerms.slice(0, 4).map(kt => (
                <li key={kt.term} className="text-[12.5px] text-ink2">
                  <span className="text-ink font-semibold">{kt.term}</span> — {kt.definition}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button variant="secondary" onClick={() => router.push(`/academy/${lesson.level}`)}>
            Back to Level
          </Button>
          {passed ? (
            <Button variant="primary" onClick={() => router.push(`/academy/${lesson.level}`)}>
              Next Lesson
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={() => router.push(`/academy/${lesson.level}/${lesson.id}`)}>
                Review Lesson
              </Button>
              <Button variant="primary" onClick={onRetry}>Retry Quiz</Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
