import pandas as pd
import numpy as np

def log_returns(series: pd.Series) -> pd.Series:
    return np.log(series / series.shift(1))


def rolling_volatility(log_returns: pd.Series, window: int = 20) -> pd.Series:
    return log_returns.rolling(window).std()


def ema(series: pd.Series, span: int) -> pd.Series:
    return series.ewm(span=span, adjust=False).mean()
