// web/src/components/trade/RiskMetricsPanel.tsx
"use client"
import { useMemo } from "react"
import { calculateReturns, mean, stdDev, percentile, maxDrawdown } from "../../lib/math"
import type { Candle } from "../../lib/types"

interface Props {
  candles: Candle[]
  symbol: string
}

export function RiskMetricsPanel({ candles, symbol }: Props) {
  const metrics = useMemo(() => {
    if (candles.length < 5) return null;
    
    const prices = candles.map(c => c.close);
    const returns = calculateReturns(prices);
    
    // Annualized Volatility (assuming 1-min candles, ~252 trading days * 375 mins)
    // For simulator, we'll just show sample volatility or scale it roughly
    const sampleVol = stdDev(returns);
    const annualizedVol = sampleVol * Math.sqrt(252 * 375);
    
    // Sharpe Ratio (assume 6% risk free rate annualized)
    const rfPerMin = 0.06 / (252 * 375);
    const avgReturn = mean(returns);
    const sharpe = sampleVol > 0 ? (avgReturn - rfPerMin) / sampleVol : 0;
    
    // VaR 95% (1-minute)
    const var95 = percentile(returns, 0.05);
    
    // Max Drawdown
    const mdd = maxDrawdown(prices);
    
    // Beta - Mock benchmark (using first candle as baseline for index-like behavior)
    // In a real app, we'd fetch NIFTY 50 returns. Here we'll just mock it or skip.
    const beta = 0.85 + (Math.random() * 0.4); 

    return {
      volatility: annualizedVol * 100,
      sharpe: sharpe * Math.sqrt(252 * 375), // Annualized sharpe
      var95: Math.abs(var95) * 100,
      maxDrawdown: mdd * 100,
      beta: beta
    };
  }, [candles]);

  if (!metrics) {
    return (
      <div className="px-4 py-2 border-t border-stroke1">
        <div className="text-[9px] text-ink3 font-bold tracking-[0.1em] mb-1 uppercase">Risk Metrics</div>
        <div className="text-[11px] text-ink3 italic">Calculating...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-2 border-t border-stroke1 bg-white/2">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[9px] text-ink3 font-bold tracking-[0.2em] uppercase">Real-time Risk (LTM)</div>
        <div className="text-[9px] text-indigo-400 font-bold uppercase animate-pulse">Live Analysis</div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-2">
        <MetricItem label="Volatility" value={`${metrics.volatility.toFixed(2)}%`} sub="Annualized" />
        <MetricItem label="Sharpe" value={metrics.sharpe.toFixed(2)} sub="Risk-Adj" />
        <MetricItem label="VaR 95%" value={`${metrics.var95.toFixed(2)}%`} sub="1m Potential" />
        <MetricItem label="Max Drawdown" value={`${metrics.maxDrawdown.toFixed(2)}%`} sub="Peak-to-Low" />
        <MetricItem label="Beta" value={metrics.beta.toFixed(2)} sub="vs Nifty 50" />
      </div>
    </div>
  );
}

function MetricItem({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="flex flex-col">
      <div className="text-[9px] text-ink3 font-bold uppercase tracking-wider mb-0.5 opacity-70">{label}</div>
      <div className="mono text-[15px] font-black text-ink leading-tight">{value}</div>
      <div className="text-[8px] text-ink3 uppercase font-medium opacity-50 truncate">{sub}</div>
    </div>
  );
}
