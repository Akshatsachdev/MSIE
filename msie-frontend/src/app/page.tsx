import SidebarNav from "@/components/layout/SidebarNav";
import TopBar from "@/components/layout/TopBar";
import Disclaimer from "@/components/Disclaimer";

import { getMarketConfidence, getMarketIntelligence } from "@/lib/api";
import { normalizeOverview } from "@/lib/normalize";

import MetricCard from "@/components/market/MetricCard";
import RegimeBadge from "@/components/market/RegimeBadge";
import NarrativeBox from "@/components/market/NarrativeBox";
import { Card } from "@/components/primitives/Card";
import { Pill } from "@/components/primitives/Pill";

export default async function Home() {
  const [intel, conf] = await Promise.all([getMarketIntelligence(), getMarketConfidence()]);
  const offline = !intel.ok || !conf.ok;

  // Build the view-model BEFORE JSX
  const vm = !offline ? normalizeOverview(intel.data, conf.data) : null;

  return (
    <div className="flex min-h-screen">
      <SidebarNav />

      <div className="flex flex-1 flex-col">
        <TopBar />

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-6xl space-y-4">
            {offline || !vm ? (
              <Card title="Backend not reachable" subtitle="Live intelligence requires MSIE API">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Ensure backend is running and NEXT_PUBLIC_MSIE_API_BASE is correct.
                </p>
                <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                  {intel.ok ? "" : `Intelligence: ${intel.error} `}
                  {conf.ok ? "" : `Confidence: ${conf.error}`}
                </div>
              </Card>
            ) : (
              <>
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Symbol</div>
                    <div className="text-lg font-semibold">{vm.symbol}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <RegimeBadge marketState={vm.marketState} />
                    <Pill variant="neutral">{vm.confidence || "UNKNOWN"}</Pill>
                  </div>
                </div>

                {/* KPI grid */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                  <MetricCard
                    label="Volatility Percentile"
                    value={vm.volPercentile}
                    sublabel={vm.volRegime !== "N/A" ? `Regime: ${vm.volRegime}` : undefined}
                  />

                  <MetricCard
                    label="Trend Direction"
                    value={vm.trendDirection}
                    sublabel={vm.trendStrength !== "N/A" ? `Strength: ${vm.trendStrength}` : undefined}
                  />

                  <MetricCard label="Liquidity" value={vm.liquidity} />
                  <MetricCard label="As of" value={vm.asOf} />
                </div>

                {/* Chart container (DEMO placeholder for now) */}
                <Card
                  title="Market Context Chart"
                  subtitle="DATA: DEMO (timeseries wiring comes in Phase 13)"
                >
                  <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-black/20 text-sm text-zinc-500 dark:border-white/15 dark:text-zinc-400">
                    Chart placeholder (demo-labeled)
                  </div>
                </Card>

                {/* Narrative */}
                <NarrativeBox narrative={vm.narrative} llmUsed={vm.llmUsed} />
              </>
            )}
          </div>
        </main>

        <Disclaimer />
      </div>
    </div>
  );
}
