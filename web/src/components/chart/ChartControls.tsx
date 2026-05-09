// web/src/components/chart/ChartControls.tsx
"use client"
import clsx from "clsx"

export type IndicatorType = 'SMA20' | 'SMA50' | 'EMA9' | 'BB' | 'RSI' | 'MACD';

interface Props {
  activeIndicators: IndicatorType[];
  onToggle: (indicator: IndicatorType) => void;
}

const INDICATORS: { id: IndicatorType; label: string; color: string }[] = [
  { id: 'SMA20', label: 'SMA 20', color: '#3b82f6' },
  { id: 'SMA50', label: 'SMA 50', color: '#f59e0b' },
  { id: 'EMA9',  label: 'EMA 9',  color: '#8b5cf6' },
  { id: 'BB',    label: 'Bollinger', color: 'rgba(255,255,255,0.2)' },
  { id: 'RSI',   label: 'RSI',    color: '#10b981' },
  { id: 'MACD',  label: 'MACD',   color: '#ec4899' },
];

export function ChartControls({ activeIndicators, onToggle }: Props) {
  return (
    <div className="flex items-center gap-1.5 p-1 rounded-btn bg-black/20 ring-1 ring-white/5">
      {INDICATORS.map(({ id, label, color }) => {
        const isActive = activeIndicators.includes(id);
        return (
          <button
            key={id}
            onClick={() => onToggle(id)}
            className={clsx(
              "h-6 px-2 rounded-[4px] text-[10px] font-bold tracking-wider transition flex items-center gap-1.5",
              isActive 
                ? "bg-white/10 text-white ring-1 ring-white/20" 
                : "text-white/40 hover:text-white/60 hover:bg-white/5"
            )}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full" 
              style={{ backgroundColor: color }} 
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}
