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
