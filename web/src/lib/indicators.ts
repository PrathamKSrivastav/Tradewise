// web/src/lib/indicators.ts

export const calculateSMA = (data: number[], period: number) => {
  const sma = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push(null);
    } else {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      sma.push(sum / period);
    }
  }
  return sma;
};

export const calculateEMA = (data: number[], period: number) => {
  const ema = [];
  const k = 2 / (period + 1);
  let prevEma = data[0];
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      ema.push(prevEma);
    } else {
      prevEma = data[i] * k + prevEma * (1 - k);
      ema.push(prevEma);
    }
  }
  return ema;
};

export const calculateBollingerBands = (data: number[], period: number, stdDevMult: number) => {
  const upper = [];
  const middle = calculateSMA(data, period);
  const lower = [];

  for (let i = 0; i < data.length; i++) {
    if (middle[i] === null) {
      upper.push(null);
      lower.push(null);
    } else {
      const slice = data.slice(i - period + 1, i + 1);
      const avg = middle[i]!;
      const stdDev = Math.sqrt(slice.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / period);
      upper.push(avg + stdDevMult * stdDev);
      lower.push(avg - stdDevMult * stdDev);
    }
  }
  return { upper, middle, lower };
};

export const calculateRSI = (data: number[], period: number) => {
  const rsi = [];
  let gains = 0;
  let losses = 0;

  for (let i = 1; i < data.length; i++) {
    const diff = data[i] - data[i - 1];
    if (i <= period) {
      if (diff > 0) gains += diff;
      else losses -= diff;

      if (i === period) {
        let avgGain = gains / period;
        let avgLoss = losses / period;
        const rs = avgGain / avgLoss;
        rsi.push(100 - 100 / (1 + rs));
      } else {
        rsi.push(null);
      }
    } else {
      const diff = data[i] - data[i - 1];
      const currentGain = diff > 0 ? diff : 0;
      const currentLoss = diff < 0 ? -diff : 0;

      // Smoothed RS
      const prevAvgGain = (gains * (period - 1) + currentGain) / period;
      const prevAvgLoss = (losses * (period - 1) + currentLoss) / period;
      
      gains = prevAvgGain;
      losses = prevAvgLoss;

      const rs = gains / losses;
      rsi.push(100 - 100 / (1 + rs));
    }
  }
  // Align length by adding null at start
  return [null, ...rsi];
};

export const calculateMACD = (data: number[], fast: number, slow: number, signal: number) => {
  const fastEMA = calculateEMA(data, fast);
  const slowEMA = calculateEMA(data, slow);
  const macdLine = fastEMA.map((f, i) => (f !== null && slowEMA[i] !== null ? f - slowEMA[i]! : null));
  
  // Filter out nulls for signal calculation
  const validMacd = macdLine.filter(x => x !== null) as number[];
  const signalLineValid = calculateEMA(validMacd, signal);
  
  // Re-align signal line
  const signalLine = new Array(macdLine.length - validMacd.length).fill(null).concat(signalLineValid);
  const histogram = macdLine.map((m, i) => (m !== null && signalLine[i] !== null ? m - signalLine[i]! : null));

  return { macdLine, signalLine, histogram };
};
