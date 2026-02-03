import pandas as pd
from datetime import date
import logging

from app.utils.indicators import log_returns, rolling_volatility, ema
from app.regimes.volatility import volatility_percentile, volatility_regime
from app.regimes.trend import trend_direction, trend_strength
from app.regimes.liquidity import liquidity_status


DATA_PATH = "data/nifty50.csv"

# Configure logging (more visible timestamp + level)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger(__name__)


class MarketStateError(Exception):
    """Custom exception for market state computation errors"""
    pass


def compute_market_state():
    """
    Compute current market state based on volatility, trend, and liquidity regimes.

    Returns:
        dict: Market state dictionary with volatility, trend, and liquidity metrics

    Raises:
        MarketStateError: If insufficient data or computation fails
    """
    try:
        # ── Load broken CSV: skip junk lines + force correct column names ──
        df = pd.read_csv(
            DATA_PATH,
            skiprows=1,                           # skip partial "Date" line or junk
            names=['Date', 'Close', 'High', 'Low',
                   'Open', 'Volume'],  # force names
            header=None,                          # no real header row
            on_bad_lines='skip',                  # ignore malformed lines
            encoding='utf-8',                     # change to 'latin1' if Unicode error
        )

        if df.empty:
            raise MarketStateError(f"No usable data loaded from {DATA_PATH}")

        logger.info(f"Loaded {len(df)} rows after skipping junk rows")

        # Normalize column names (just in case)
        df.columns = df.columns.str.lower().str.strip()

        # Debug: show what we actually got
        logger.info(f"Columns: {list(df.columns)}")
        if len(df) >= 2:
            logger.info(
                f"First two rows:\n{df.head(2).to_string(index=False)}")

        # Required columns validation
        required = {"date", "close"}
        if not required.issubset(df.columns):
            raise MarketStateError(
                f"Missing required columns after loading.\n"
                f"Got columns: {list(df.columns)}\n"
                f"First rows:\n{df.head(3).to_string(index=False)}"
            )

        # Convert numeric columns safely
        numeric_columns = ["open", "high", "low", "close", "volume"]
        for col in numeric_columns:
            if col in df.columns:
                df[col] = pd.to_numeric(
                    df[col].astype(str).str.replace(
                        ',', '', regex=False).str.strip(),
                    errors='coerce'
                )

        # ── Parse dates – your file uses DD-MM-YYYY ──
        df["date"] = pd.to_datetime(
            df["date"],
            format="%d-%m-%Y",
            errors="coerce"
        )

        null_dates = df["date"].isna().sum()
        if null_dates > 0:
            logger.warning(
                f"{null_dates} rows have invalid dates – dropping them")
            df = df.dropna(subset=["date"])

        # Remove future rows (safety)
        today = pd.Timestamp.today().normalize()
        future_count = (df["date"] > today).sum()
        if future_count > 0:
            logger.warning(f"Removing {future_count} future-dated rows")
            df = df[df["date"] <= today]

        # Drop missing/invalid close prices
        initial_len = len(df)
        df = df.dropna(subset=["close"])
        dropped = initial_len - len(df)
        if dropped > 0:
            logger.warning(f"Dropped {dropped} rows missing/invalid close")

        if df.empty:
            raise MarketStateError(
                "No valid rows left after date & close cleaning. "
                "Check CSV structure – likely header/junk rows issue."
            )

        # Sort by date + remove duplicates
        df = df.sort_values("date").drop_duplicates(
            subset=["date"], keep="last").reset_index(drop=True)
        logger.info(
            f"Processing {len(df)} clean rows from {df['date'].min().date()} "
            f"to {df['date'].max().date()}"
        )

        # ── Volatility ──
        logger.info(
            "Volatility config: rolling_window=20 trading days, "
            "percentile_lookback=504 days (~2 years)"
        )

        df["log_return"] = log_returns(df["close"])
        df["volatility"] = rolling_volatility(df["log_return"], 20)

        valid_vol_df = df.dropna(subset=["volatility"])
        if valid_vol_df.empty:
            raise MarketStateError(
                "No valid volatility values (need ≥20 rows)")

        current_vol = valid_vol_df["volatility"].iloc[-1]
        historical_vols = valid_vol_df["volatility"].tail(504)

        vol_pct = volatility_percentile(current_vol, historical_vols)
        vol_regime = volatility_regime(vol_pct)

        # ── Trend ──
        df["ema20"] = ema(df["close"], 20)
        df["ema50"] = ema(df["close"], 50)

        valid_ema_df = df.dropna(subset=["ema20", "ema50"])
        if valid_ema_df.empty:
            raise MarketStateError("No valid EMA values (need ≥50 rows)")

        latest = valid_ema_df.iloc[-1]
        price = latest["close"]
        ema20 = latest["ema20"]
        ema50 = latest["ema50"]
        latest_date = latest["date"]

        direction = trend_direction(price, ema20, ema50)
        strength = trend_strength(ema20, ema50)

        # ── Market State ──
        market_state = f"{vol_regime}_VOL_{direction}"

        logger.info(f"Computed market state: {market_state}")

        return {
            "symbol": "NIFTY50",
            "date": str(latest_date.date()),
            "data_points": len(df),
            "volatility": {
                "value": round(float(current_vol), 4),
                "percentile": round(vol_pct, 2) if pd.notna(vol_pct) else None,
                "regime": vol_regime
            },
            "trend": {
                "direction": direction,
                "strength": strength,
                "price": round(float(price), 2),
                "ema20": round(float(ema20), 2),
                "ema50": round(float(ema50), 2)
            },
            "liquidity": {
                "status": liquidity_status()
            },
            "market_state": market_state
        }

    except FileNotFoundError:
        raise MarketStateError(f"Data file not found: {DATA_PATH}")
    except pd.errors.EmptyDataError:
        raise MarketStateError(f"Data file is empty or malformed: {DATA_PATH}")
    except Exception as e:
        logger.error(f"Failed to compute market state: {e}", exc_info=True)
        raise MarketStateError(f"Computation failed: {str(e)}")


if __name__ == "__main__":
    try:
        result = compute_market_state()
        import json
        print(json.dumps(result, indent=2))
    except MarketStateError as e:
        print(f"ERROR: {e}")
