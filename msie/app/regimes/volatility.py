import numpy as np

def volatility_percentile(current_vol: float, historical_vols):
    return int(
        (historical_vols < current_vol).mean() * 100
    )


def volatility_regime(percentile: int) -> str:
    if percentile < 30:
        return "LOW"
    elif percentile <= 70:
        return "NORMAL"
    else:
        return "HIGH"
