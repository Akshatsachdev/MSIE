def trend_direction(price, ema20, ema50):
    if price > ema20 > ema50:
        return "UP"
    elif price < ema20 < ema50:
        return "DOWN"
    else:
        return "SIDEWAYS"


def trend_strength(ema20, ema50, threshold_pct=0.5):
    distance_pct = abs(ema20 - ema50) / ema50 * 100
    return "WEAK" if distance_pct < threshold_pct else "STRONG"
