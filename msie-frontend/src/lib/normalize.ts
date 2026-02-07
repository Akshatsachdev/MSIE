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
  return fallback;
}

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

export function normalizeOverview(intel: any, conf: any): OverviewVM {
  // everything is under intel.state
  const symbol = toStr(pick(intel, ["state.symbol"]));
  const asOf = toStr(pick(intel, ["state.date"]));

  const marketState = toStr(
    pick(intel, ["state.market_state", "market_state", "state.marketState"]),
    "UNKNOWN"
  );

  const confidence = toStr(pick(conf, ["confidence_level", "confidence"])).toUpperCase();

  const volPercentile = toStr(pick(intel, ["state.volatility.percentile"]));
  const volRegime = toStr(pick(intel, ["state.volatility.regime"]));

  const trendDirection = toStr(pick(intel, ["state.trend.direction"]));
  const trendStrength = toStr(pick(intel, ["state.trend.strength"]));

  // your backend likely uses either liquidity.status or liquidity.regime; support both
  const liquidity = toStr(pick(intel, ["state.liquidity.status", "state.liquidity.regime", "state.liquidity"]));

  const narrative = pick(intel, ["narrative", "state.narrative", "state.reasoning"]);
  const llmUsedRaw = pick(intel, ["meta.llm_used", "state.meta.llm_used", "llm_used"]);
  const llmUsed = typeof llmUsedRaw === "boolean" ? llmUsedRaw : false;

  // If backend doesn't provide market_state, we still DO NOT compute it.
  // We only display what backend sends. So keep marketState as UNKNOWN when absent.

  return {
    symbol,
    asOf,
    marketState,
    confidence,
    volPercentile,
    volRegime,
    trendDirection,
    trendStrength,
    liquidity,
    narrative,
    llmUsed,
  };
}
