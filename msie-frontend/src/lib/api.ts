import { endpoints } from "@/lib/endpoints";
import type { MarketConfidence, MarketIntelligence } from "@/lib/types";

async function safeFetch<T>(url: string): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const data = (await res.json()) as T;
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Backend not reachable" };
  }
}

export async function getMarketIntelligence() {
  return safeFetch<MarketIntelligence>(endpoints.intelligence());
}

export async function getMarketConfidence() {
  return safeFetch<MarketConfidence>(endpoints.confidence());
}
