from typing import List, Dict, Optional

def calculate_sma(prices: List[float], period: int) -> Optional[float]:
    if len(prices) < period:
        return None
    return sum(prices[-period:]) / period

def calculate_ema(prices: List[float], period: int) -> Optional[float]:
    if len(prices) < period:
        return None
    
    k = 2 / (period + 1)
    ema = prices[0]
    for price in prices[1:]:
        ema = (price * k) + (ema * (1 - k))
    return ema

def calculate_rsi(prices: List[float], period: int = 14) -> Optional[float]:
    if len(prices) <= period:
        return None
    
    gains = []
    losses = []
    
    for i in range(1, len(prices)):
        change = prices[i] - prices[i-1]
        if change > 0:
            gains.append(change)
            losses.append(0)
        else:
            gains.append(0)
            losses.append(abs(change))
            
    avg_gain = sum(gains[:period]) / period
    avg_loss = sum(losses[:period]) / period
    
    if avg_loss == 0:
        return 100.0
        
    for i in range(period, len(gains)):
        avg_gain = (avg_gain * (period - 1) + gains[i]) / period
        avg_loss = (avg_loss * (period - 1) + losses[i]) / period
        
    if avg_loss == 0:
        return 100.0
        
    rs = avg_gain / avg_loss
    return 100 - (100 / (1 + rs))

def calculate_macd(prices: List[float]) -> Dict[str, Optional[float]]:
    # MACD (12, 26, 9)
    if len(prices) < 26:
        return {"macd": None, "signal": None, "histogram": None}
    
    ema_12 = calculate_ema(prices, 12)
    ema_26 = calculate_ema(prices, 26)
    
    if ema_12 is None or ema_26 is None:
        return {"macd": None, "signal": None, "histogram": None}
        
    macd_line = ema_12 - ema_26
    
    # Simple signal approximation for current tick
    # In a real app we'd maintain the full EMA of the MACD line
    # For a snapshot, we'll return the MACD line itself
    return {
        "macd": round(macd_line, 4),
        "ema_12": round(ema_12, 2),
        "ema_26": round(ema_26, 2)
    }

def get_technical_summary(candles: List[Dict]) -> str:
    if not candles:
        return "No market data available."
        
    closes = [c['close'] for c in candles]
    latest = candles[-1]
    
    sma_20 = calculate_sma(closes, 20)
    sma_50 = calculate_sma(closes, 50)
    rsi = calculate_rsi(closes, 14)
    macd_data = calculate_macd(closes)
    
    trend = "Neutral"
    if sma_20 and latest['close'] > sma_20:
        trend = "Bullish (above SMA 20)"
    elif sma_20 and latest['close'] < sma_20:
        trend = "Bearish (below SMA 20)"
        
    rsi_desc = ""
    if rsi:
        if rsi > 70:
            rsi_desc = f"{rsi:.1f} (Overbought)"
        elif rsi < 30:
            rsi_desc = f"{rsi:.1f} (Oversold)"
        else:
            rsi_desc = f"{rsi:.1f} (Neutral)"
            
    macd_desc = "N/A"
    if macd_data["macd"] is not None:
        macd_desc = f"Line: {macd_data['macd']} (EMA12: {macd_data['ema_12']}, EMA26: {macd_data['ema_26']})"

    summary = (
        f"--- MARKET SNAPSHOT ---\n"
        f"Symbol: {latest['symbol']}\n"
        f"Price: ₹{latest['close']:.2f}\n"
        f"Trend: {trend}\n"
        f"RSI (14): {rsi_desc}\n"
        f"MACD (12,26): {macd_desc}\n"
        f"Moving Averages: SMA(20): {f'₹{sma_20:.2f}' if sma_20 else 'N/A'} | "
        f"SMA(50): {f'₹{sma_50:.2f}' if sma_50 else 'N/A'}\n"
        f"Volume: {latest['volume']}"
    )
    
    return summary
