"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import type { QuizQuestion, SubmitExamResponse, ExamStatusResponse } from "@/lib/types"
import { Button } from "@/components/ui/Button"
import { useUserStore } from "@/store/userStore"
import { fetchExamStatus, startExam, submitExam } from "@/lib/api"
import { getAllLessons } from "@/content/curriculum"

const EXAM_DURATION_SECS = 60 * 60
const PASS_THRESHOLD = 75
const LETTERS = ["A", "B", "C", "D"]

export function ExamEngine() {
  const router = useRouter()
  const token = useUserStore(s => s.token)
  const userId = useUserStore(s => s.user_id)

  const [status, setStatus] = useState<ExamStatusResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [starting, setStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [sessionId, setSessionId] = useState("")
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmitExamResponse | null>(null)

  const [secondsLeft, setSecondsLeft] = useState(EXAM_DURATION_SECS)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    if (!token || !userId) return
    fetchExamStatus(token, userId)
      .then(s => { setStatus(s); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [token, userId])

  const handleAutoSubmit = useCallback(async () => {
    if (!token || !userId || !sessionId) return
    stopTimer()
    setSubmitting(true)
    try {
      const finalAnswers = answers.map(a => a ?? 0)
      const res = await submitExam(token, sessionId, userId, finalAnswers)
      setResult(res)
      setStatus(prev => prev ? { ...prev, attemptsUsed: res.attemptsUsed, cooldownUntil: res.cooldownUntil, bestScore: Math.max(prev.bestScore ?? 0, res.score), passed: res.passed } : null)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Submission failed")
    } finally {
      setSubmitting(false)
    }
  }, [token, userId, sessionId, answers, stopTimer])

  useEffect(() => () => stopTimer(), [stopTimer])

  const handleStart = async () => {
    if (!token || !userId) return
    setStarting(true)
    setError(null)
    try {
      const allSeeds = getAllLessons().flatMap(l => l.quizSeed.map(q => ({ ...q, _level: l.level, _lessonId: l.id })))
      const res = await startExam(token, userId, allSeeds)
      setSessionId(res.sessionId)
      setQuestions(res.questions)
      setAnswers(new Array(res.questions.length).fill(null))
      setCurrent(0)
      setSecondsLeft(EXAM_DURATION_SECS)
      timerRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) { stopTimer(); handleAutoSubmit(); return 0 }
          return s - 1
        })
      }, 1000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to start exam")
    } finally {
      setStarting(false)
    }
  }

  const handleNext = () => {
    if (selected === null) return
    const updated = [...answers]
    updated[current] = selected
    setAnswers(updated)
    setSelected(null)
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
    } else {
      handleFinalSubmit(updated)
    }
  }

  const handleFinalSubmit = async (finalAnswers: (number | null)[]) => {
    if (!token || !userId) return
    stopTimer()
    setSubmitting(true)
    try {
      const res = await submitExam(token, sessionId, userId, finalAnswers.map(a => a ?? 0))
      setResult(res)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Submission failed")
    } finally {
      setSubmitting(false)
    }
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0")
    const s = (secs % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 gap-3 text-ink2">
      <div className="h-6 w-6 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
      Loading…
    </div>
  )

  if (result) return (
    <ExamResult result={result} onRetry={() => {
      setResult(null); setQuestions([]); setSessionId(""); setAnswers([]); setError(null)
      fetchExamStatus(token!, userId!).then(setStatus)
    }} />
  )

  /* ─── In-exam view ─── */
  if (questions.length > 0) {
    const q = questions[current]
    const pct = Math.round((current / questions.length) * 100)
    const timerWarning = secondsLeft < 300

    return (
      <div className="flex flex-col min-h-screen bg-canvas text-ink">
        {/* Sticky header */}
        <header className="sticky top-0 z-10 bg-canvas/95 backdrop-blur-sm border-b border-stroke1">
          <div className="flex items-center justify-between max-w-3xl mx-auto px-6 h-14">
            <div>
              <div className="text-[11px] text-ink3">Final Exam</div>
              <div className="text-[14px] font-semibold">Question {current + 1} of {questions.length}</div>
            </div>
            <div className={clsx(
              "flex items-center gap-1.5 px-3 h-8 rounded-pill ring-1 mono text-[13px] font-semibold",
              timerWarning ? "bg-rose-400/10 ring-rose-400/30 text-rose-400" : "bg-white/5 ring-stroke1 text-ink"
            )}>
              ⏱ {formatTime(secondsLeft)}
            </div>
            <div className="flex items-center gap-1 px-3 h-8 rounded-pill bg-white/5 ring-1 ring-stroke1 mono text-[12.5px]">
              <span className="text-ink">{String(current + 1).padStart(2, "0")}</span>
              <span className="text-ink3">/</span>
              <span className="text-ink3">{String(questions.length).padStart(2, "0")}</span>
            </div>
          </div>
          <div className="h-0.5 bg-white/8 mx-6">
            <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </header>

        <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 flex flex-col justify-center">
          {/* Question */}
          <div className="mb-8">
            {q.difficulty && (
              <div className={clsx(
                "inline-flex items-center gap-1.5 px-3 h-7 rounded-pill ring-1 text-[11.5px] font-semibold mb-4",
                q.difficulty === "easy" ? "bg-emerald-400/10 ring-emerald-400/20 text-emerald-400"
                : q.difficulty === "hard" ? "bg-rose-400/10 ring-rose-400/20 text-rose-400"
                : "bg-amber-400/10 ring-amber-400/20 text-amber-400"
              )}>
                {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
              </div>
            )}
            <h2 className="text-[22px] font-semibold tracking-[-0.01em] leading-snug">{q.question}</h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
            {q.options.map((opt, i) => {
              const isSelected = selected === i
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={clsx(
                    "group flex items-start p-4 rounded-card text-left transition-all",
                    isSelected ? "bg-indigo-500/12 ring-2 ring-indigo-500/50" : "bg-elev1 ring-1 ring-stroke1 hover:bg-elev2 hover:ring-stroke2"
                  )}
                >
                  <div className={clsx(
                    "flex-shrink-0 w-9 h-9 rounded-btn grid place-items-center text-[13px] font-bold mr-3 transition-colors",
                    isSelected ? "bg-indigo-500 text-white" : "bg-white/6 ring-1 ring-stroke1 text-ink3 group-hover:bg-indigo-500/15 group-hover:text-indigo-400"
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

          <div className="flex items-center justify-between pt-5 border-t border-stroke1">
            <span className="text-[12px] text-ink3">
              {answers.filter(a => a !== null).length} answered · {questions.length - current - 1} remaining
            </span>
            <Button
              onClick={handleNext}
              disabled={selected === null || submitting}
              loading={submitting && current === questions.length - 1}
              size="lg"
              variant="primary"
              iconRight={<svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            >
              {current + 1 < questions.length ? "Next Question" : "Submit Exam"}
            </Button>
          </div>
        </main>
      </div>
    )
  }

  /* ─── Pre-exam lobby ─── */
  const onCooldown = status?.cooldownUntil != null
  const attemptsExhausted = (status?.attemptsUsed ?? 0) >= (status?.attemptsAllowed ?? 3) && !onCooldown
  const canStart = !onCooldown && !attemptsExhausted && !status?.passed

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold tracking-[-0.02em]">Final Exam</h1>
        <p className="text-[13px] text-ink2 mt-1">Demonstrate mastery across all 8 levels</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Questions", value: "60" },
          { label: "Pass Mark",  value: "75%" },
          { label: "Time Limit", value: "60 min" },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-card bg-elev1 ring-1 ring-stroke1 p-4 text-center">
            <div className="mono text-[22px] font-bold num text-ink">{value}</div>
            <div className="text-[11px] text-ink3 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Attempt tracker */}
      <div className="rounded-card bg-elev1 ring-1 ring-stroke1 p-4 space-y-3">
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-ink2">Attempts used</span>
          <span className="mono num text-ink font-semibold">{status?.attemptsUsed ?? 0} / {status?.attemptsAllowed ?? 3}</span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: status?.attemptsAllowed ?? 3 }).map((_, i) => (
            <div key={i} className={clsx("flex-1 h-1.5 rounded-full", i < (status?.attemptsUsed ?? 0) ? "bg-rose-400" : "bg-white/8")} />
          ))}
        </div>
        {status?.bestScore != null && (
          <p className="text-[12.5px] text-ink3">Best score: {status.bestScore}%</p>
        )}
        {status?.passed && (
          <div className="flex items-center gap-2 text-[12.5px] text-emerald-400 font-semibold">
            ✓ You have passed this exam
          </div>
        )}
        {onCooldown && (
          <p className="text-[12.5px] text-amber-400">
            On cooldown — next attempt after{" "}
            {new Date(status!.cooldownUntil!).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}
      </div>

      {/* Certificate card */}
      {status?.passed && status.certificateUrl && (
        <div className="rounded-card bg-amber-500/8 ring-1 ring-amber-500/25 p-4 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-amber-400">🏆</span>
              <span className="text-[14px] font-semibold">Certificate of Completion</span>
            </div>
            <p className="text-[12px] text-ink2">Score: {status.bestScore}%</p>
          </div>
          <a
            href={status.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 h-10 rounded-btn bg-amber-500 hover:bg-amber-600 text-[#231703] text-[13px] font-semibold transition"
          >
            Download PDF
          </a>
        </div>
      )}

      {error && <p className="text-[12.5px] text-rose-400">{error}</p>}

      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => router.push("/academy")}>
          ← Back to Academy
        </Button>
        {canStart && (
          <Button variant="primary" onClick={handleStart} loading={starting} size="lg"
            iconRight={<svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}>
            {status?.attemptsUsed ? "Retry Exam" : "Start Exam"}
          </Button>
        )}
      </div>

      <div className="space-y-1.5">
        {[
          "Questions are drawn from all 8 levels · Randomised each attempt",
          "After 3 failed attempts, a 7-day cooldown applies",
          "Passing earns +300 XP and a downloadable PDF certificate",
        ].map(note => (
          <p key={note} className="text-[11.5px] text-ink3 flex items-start gap-2">
            <span className="mt-0.5">·</span>{note}
          </p>
        ))}
      </div>
    </div>
  )
}

function ExamResult({ result, onRetry }: { result: SubmitExamResponse; onRetry: () => void }) {
  const router = useRouter()
  const passed = result.score >= PASS_THRESHOLD

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center">
      {/* Score ring */}
      <div className={clsx(
        "mx-auto w-32 h-32 rounded-full flex flex-col items-center justify-center ring-4",
        passed ? "bg-emerald-400/10 ring-emerald-400/50" : "bg-rose-400/10 ring-rose-400/50"
      )}>
        <span className={clsx("mono text-[36px] font-bold num leading-none", passed ? "text-emerald-400" : "text-rose-400")}>
          {result.score}%
        </span>
        <span className="text-[11px] text-ink3 mt-1">{result.correctCount}/{result.totalQuestions}</span>
      </div>

      <div>
        <h2 className="text-[24px] font-semibold">{passed ? "Congratulations!" : "Not quite there"}</h2>
        <p className="text-[13px] text-ink2 mt-1">
          {passed ? "You have mastered the FinSim curriculum." : `Required: ${PASS_THRESHOLD}% · Your score: ${result.score}%`}
        </p>
      </div>

      {passed && (
        <div className="rounded-card bg-elev1 ring-1 ring-stroke1 p-5 text-left space-y-3">
          <div className="text-[10.5px] text-ink3 font-semibold tracking-[0.14em] uppercase">Rewards earned</div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-lg">⚡</span>
            <span className="mono text-[22px] font-bold text-indigo-400">+{result.xpEarned} XP</span>
          </div>
          {result.newBadges.length > 0 && (
            <div className="text-[13px] text-amber-400">🏅 {result.newBadges.join(", ")}</div>
          )}
          {result.certificateUrl && (
            <a
              href={result.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-11 rounded-btn bg-amber-500 hover:bg-amber-600 text-[#231703] text-[14px] font-bold transition mt-2"
            >
              🏆 Download Certificate of Completion
            </a>
          )}
        </div>
      )}

      {!passed && (
        <div className="rounded-card bg-elev1 ring-1 ring-stroke1 p-4 text-left text-[12.5px] text-ink2">
          {result.attemptsUsed} of {result.attemptsAllowed} attempts used.{" "}
          {result.cooldownUntil
            ? `Next attempt after ${new Date(result.cooldownUntil).toLocaleDateString("en-IN")}.`
            : `${result.attemptsAllowed - result.attemptsUsed} attempt(s) remaining.`}
        </div>
      )}

      <div className="flex items-center justify-center gap-3">
        <Button variant="secondary" onClick={() => router.push("/academy")}>← Academy</Button>
        {!passed && result.attemptsUsed < result.attemptsAllowed && !result.cooldownUntil && (
          <Button variant="primary" onClick={onRetry}>Retry Exam</Button>
        )}
      </div>
    </div>
  )
}
