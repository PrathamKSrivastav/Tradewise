// web/src/components/academy/SIPCalculator.tsx
"use client"
import { useState, useMemo } from "react"

export function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000)
  const [returnRate, setReturnRate] = useState(12)
  const [years, setYears] = useState(10)

  const results = useMemo(() => {
    const P = monthlyAmount
    const i = returnRate / 12 / 100
    const n = years * 12
    
    // Formula: M = P * [((1 + i)^n - 1) / i] * (1 + i)
    const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
    const totalInvested = P * n
    const totalReturns = totalValue - totalInvested

    return {
      totalValue: Math.round(totalValue),
      totalInvested: Math.round(totalInvested),
      totalReturns: Math.round(totalReturns),
    }
  }, [monthlyAmount, returnRate, years])

  return (
    <div className="my-10 p-8 rounded-card bg-elev1 ring-1 ring-stroke1 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-btn bg-indigo-500/10 grid place-items-center text-indigo-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.665 1L12 8Zm-2.665 7c.585.593 1.555 1 2.665 1m0-8V7m0 8v1m-5-1h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div>
          <h3 className="text-[18px] font-bold text-ink leading-tight">SIP Calculator</h3>
          <p className="text-[12px] text-ink3 mt-0.5">Visualize the power of Systematic Investment Plans</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-[12px] font-bold text-ink3 uppercase tracking-wider">Monthly Investment</label>
              <span className="mono text-indigo-400 font-bold">₹{monthlyAmount.toLocaleString("en-IN")}</span>
            </div>
            <input 
              type="range" min={500} max={100000} step={500}
              value={monthlyAmount} onChange={e => setMonthlyAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-[12px] font-bold text-ink3 uppercase tracking-wider">Expected Return (p.a.)</label>
              <span className="mono text-indigo-400 font-bold">{returnRate}%</span>
            </div>
            <input 
              type="range" min={1} max={30} step={0.5}
              value={returnRate} onChange={e => setReturnRate(Number(e.target.value))}
              className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-[12px] font-bold text-ink3 uppercase tracking-wider">Time Period</label>
              <span className="mono text-indigo-400 font-bold">{years} Years</span>
            </div>
            <input 
              type="range" min={1} max={40} step={1}
              value={years} onChange={e => setYears(Number(e.target.value))}
              className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <ResultCard label="Invested Amount" value={results.totalInvested} color="text-ink2" />
          <ResultCard label="Estimated Returns" value={results.totalReturns} color="text-emerald-400" />
          <div className="p-5 rounded-btn bg-indigo-500/10 ring-1 ring-indigo-500/30 flex flex-col items-center justify-center text-center">
            <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-[0.2em] mb-1">Total Wealth</div>
            <div className="text-[32px] font-black text-white mono tracking-tighter">₹{results.totalValue.toLocaleString("en-IN")}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 justify-center">
        <LegendItem color="bg-ink2" label="Invested" />
        <LegendItem color="bg-emerald-500" label="Returns" />
      </div>
    </div>
  )
}

function ResultCard({ label, value, color }: { label: string; value: number, color: string }) {
  return (
    <div className="px-5 py-4 rounded-btn bg-white/4 ring-1 ring-white/5">
      <div className="text-[10px] font-bold text-ink3 uppercase tracking-widest mb-1">{label}</div>
      <div className={`text-[20px] font-bold mono ${color}`}>₹{value.toLocaleString("en-IN")}</div>
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold text-ink3 uppercase">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      {label}
    </div>
  )
}
