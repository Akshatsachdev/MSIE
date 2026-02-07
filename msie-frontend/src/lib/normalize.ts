import type { MarketConfidence, MarketIntelligence } from "@/lib/types";

export type OverviewVM = {
  symbol: string;
  asOf: string;

  marketState: string;
  confidence: string;

  volPercentile: string;
  volRegime: string;

  trendDirection: string;
  trendStrength: string;

  liquidity: string;

  narrative: unknown;
  llmUsed: boolean;
};

function toStr(v: unknown, fallback = "N/A"): string {
  if (v === null || v === undefined) return fallback;
  if (typeof v === "string") return v.trim() || fallback;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return fallback; // keep non-text out of KPI rows
}

// Some backends use snake_case / others camelCase. Support both safely.
function pick(obj: any, paths: string[]): unknown {
  for (const p of paths) {
    const parts = p.split(".");
    let cur = obj;
    let ok = true;
    for (const k of parts) {
      if (cur && typeof cur === "object" && k in cur) cur = cur[k];
      else {
        ok = false;
        break;
      }
    }
    if (ok) return cur;
  }
  return undefined;
}

export function normalizeOverview(intel: MarketIntelligence, conf: MarketConfidence): OverviewVM {
  const symbol = toStr(pick(intel, ["symbol", "data.symbol"]));
  const asOf = toStr(pick(intel, ["date", "as_of", "asOf", "data.date"]));

  const marketState = toStr(pick(intel, ["market_state", "marketState", "state.market_state"]));
  const confidence = toStr(pick(conf, ["confidence", "level", "confidence_level", "data.confidence"]));

  const volPercentile = toStr(pick(intel, ["volatility.percentile", "vol.percentile", "volatility_percentile"]));
  const volRegime = toStr(pick(intel, ["volatility.regime", "vol.regime", "volatility_regime"]));

  const trendDirection = toStr(pick(intel, ["trend.direction", "trend_direction"]));
  const trendStrength = toStr(pick(intel, ["trend.strength", "trend_strength"]));

  const liquidity = toStr(pick(intel, ["liquidity.status", "liquidity.regime", "liquidity_status"]));

  const narrative = pick(intel, ["narrative", "reasoning", "explanation", "market_narrative"]);
  const llmUsedRaw = pick(intel, ["meta.llm_used", "meta.llmUsed", "llm_used"]);
  const llmUsed = typeof llmUsedRaw === "boolean" ? llmUsedRaw : false;

  return {
    symbol,
    asOf,
    marketState,
    confidence: confidence.toUpperCase(),

    volPercentile,
    volRegime,

    trendDirection,
    trendStrength,

    liquidity,

    narrative,
    llmUsed,
  };
}
