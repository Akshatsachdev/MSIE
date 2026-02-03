def classify_volatility_regime(vol_percentile: float) -> str:
    if vol_percentile < 30:
        return "Low Volatility"
    elif vol_percentile < 60:
        return "Normal Volatility"
    elif vol_percentile < 80:
        return "High Volatility"
    else:
        return "Stress Regime"
def classify_trend(price, ema_50, ema_200) -> str:
    if price > ema_50 > ema_200:
        return "Strong Uptrend"
    elif price > ema_50:
        return "Weak Uptrend"
    elif price < ema_50 < ema_200:
        return "Strong Downtrend"
    else:
        return "Range / Unclear"
def compute_risk_score(vol_pct, atr_pct, volume_z):
    risk = (
        vol_pct * 0.5 +
        atr_pct * 0.3 +
        volume_z * 0.2
    ) / 10

    return min(max(round(risk, 2), 0), 10)
