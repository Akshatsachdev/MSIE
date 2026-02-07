export type MarketIntelligence = {
  symbol: string;
  date: string;

  volatility?: {
    percentile?: number;
    regime?: string;
  };

  trend?: {
    direction?: string;
    strength?: string;
  };

  liquidity?: {
    status?: string;
  };

  market_state?: string;

  narrative?: unknown;

  meta?: {
    deterministic?: boolean;
    llm_used?: boolean;
    engine_version?: string;
  };
};

export type MarketConfidence = {
  confidence?: string; // HIGH/MEDIUM/LOW (as backend provides)
  basis?: string[];
  meta?: {
    deterministic?: boolean;
    llm_used?: boolean;
    engine_version?: string;
  };
};
