// web/src/lib/math.ts

export const mean = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

export const stdDev = (arr: number[]) => {
  if (arr.length < 2) return 0;
  const avg = mean(arr);
  return Math.sqrt(arr.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / (arr.length - 1));
};

export const percentile = (arr: number[], p: number) => {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * p;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
};

export const calculateReturns = (prices: number[]) => {
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
  }
  return returns;
};

export const maxDrawdown = (prices: number[]) => {
  if (!prices.length) return 0;
  let peak = -Infinity;
  let maxD = 0;
  for (const p of prices) {
    if (p > peak) peak = p;
    const dd = (peak - p) / peak;
    if (dd > maxD) maxD = dd;
  }
  return maxD;
};

import type { Candle } from "./types";

export function aggregateCandles(candles: Candle[], intervalMinutes: number): Candle[] {
  if (intervalMinutes <= 1 || candles.length === 0) return candles;

  const result: Candle[] = [];
  // Ensure candles are sorted by time
  const sorted = [...candles].sort((a, b) => a.timestamp - b.timestamp);

  // Group by interval buckets (e.g. 5 min buckets starting from a round time)
  // We'll group them such that candles within [bucketStart, bucketStart + interval) belong together
  let currentBucket: Candle[] = [];
  let bucketStartTime: number | null = null;

  const intervalMs = intervalMinutes * 60 * 1000;

  for (const c of sorted) {
    const bucketStart = Math.floor(c.timestamp / intervalMs) * intervalMs;

    if (bucketStartTime === null || bucketStart !== bucketStartTime) {
      // Flush previous bucket
      if (currentBucket.length > 0) {
        result.push(mergeCandles(currentBucket, bucketStartTime!));
      }
      // Start new bucket
      currentBucket = [c];
      bucketStartTime = bucketStart;
    } else {
      currentBucket.push(c);
    }
  }

  // Final flush
  if (currentBucket.length > 0) {
    result.push(mergeCandles(currentBucket, bucketStartTime!));
  }

  return result;
}

function mergeCandles(group: Candle[], timestamp: number): Candle {
  const first = group[0];
  const last = group[group.length - 1];
  return {
    symbol: first.symbol,
    timestamp: timestamp,
    open: first.open,
    high: Math.max(...group.map(c => c.high)),
    low: Math.min(...group.map(c => c.low)),
    close: last.close,
    volume: group.reduce((sum, c) => sum + c.volume, 0),
  };
}
