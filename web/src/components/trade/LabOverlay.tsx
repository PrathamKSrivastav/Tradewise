// web/src/components/trade/LabOverlay.tsx
"use client"
import { useEffect, useState } from "react"
import { getLessonById } from "../../content/curriculum"
import { useUserStore } from "../../store/userStore"
import { awardXP } from "../../lib/api"
import { calculateReturns, stdDev, mean } from "../../lib/math"
import type { Candle } from "../../lib/types"
import clsx from "clsx"

interface Props {
  lessonId: string;
  candles: Candle[];
  symbol: string;
}

export function LabOverlay({ lessonId, candles, symbol }: Props) {
  const { token, userId } = useUserStore()
  const lesson = getLessonById(lessonId)
  const exercise = lesson?.simulatorExercise
  
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [tickCount, setTickCount] = useState(0)

  useEffect(() => {
    if (!exercise || completed || candles.length < 10) return

    setTickCount(prev => prev + 1)
    
    // Logic for different metrics
    let currentVal = 0
    const prices = candles.slice(-50).map(c => c.close)
    
    if (exercise.metric === 'Sharpe') {
      const returns = calculateReturns(prices)
      const vol = stdDev(returns)
      const avg = mean(returns)
      currentVal = vol > 0 ? (avg / vol) * Math.sqrt(252 * 375) : 0
    } else if (exercise.metric === 'Return') {
      const start = prices[0]
      const end = prices[prices.length - 1]
      currentVal = ((end - start) / start) * 100
    }

    const goal = parseFloat(exercise.goal)
    const p = Math.min(100, (currentVal / goal) * 100)
    setProgress(p)

    if (currentVal >= goal && tickCount >= 20) {
      handleSuccess()
    }
  }, [candles])

  const handleSuccess = async () => {
    if (!token || !userId || completed) return
    setCompleted(true)
    try {
      await awardXP(token, userId, lessonId, lesson?.xpReward ?? 50, 100)
    } catch (e) {
      console.error("Failed to award lab XP", e)
    }
  }

  if (!exercise) return null

  return (
    <div className={clsx(
      "absolute top-4 left-4 z-10 w-64 p-4 rounded-xl border backdrop-blur-md transition-all",
      completed ? "bg-emerald-500/20 border-emerald-500/50" : "bg-black/60 border-white/10"
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-ink3 uppercase tracking-widest">Active Lab</span>
        {completed && <span className="text-[10px] font-bold text-emerald-400 uppercase">COMPLETED</span>}
      </div>
      
      <h4 className="text-[13px] font-bold text-ink mb-1">{lesson?.title}</h4>
      <p className="text-[11px] text-ink2 mb-3 leading-relaxed">{exercise.prompt}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold">
          <span className="text-ink3 uppercase">{exercise.metric} Goal: {exercise.goal}</span>
          <span className="text-ink">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className={clsx("h-full transition-all duration-500", completed ? "bg-emerald-500" : "bg-indigo-500")}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {!completed && (
        <div className="mt-3 text-[9px] text-ink3 uppercase font-medium">
          Ticks tracked: {tickCount} / 20 min
        </div>
      )}
    </div>
  )
}
