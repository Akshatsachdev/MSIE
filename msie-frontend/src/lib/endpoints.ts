const BASE = process.env.NEXT_PUBLIC_MSIE_API_BASE || "http://localhost:8080";

export const endpoints = {
  intelligence: () => `${BASE}/api/v1/market/intelligence`,
  confidence: () => `${BASE}/api/v1/market/confidence`,
  chat: () => `${BASE}/api/v1/chat`,
  // future:
  // timeseries: (symbol: string, range: string) => `${BASE}/api/v1/market/timeseries?symbol=${symbol}&range=${range}`,
};
