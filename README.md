# 🧠 MSIE — Market Signal Intelligence Engine

**Deterministic Market Intelligence + LLM Reasoning (Gemini-Ready)**

MSIE is a **production-grade market intelligence system** that converts raw market data into **explainable, decision-grade market context**.

> **Rules decide. Language explains.**
> No predictions. No buy/sell signals. Fully auditable.

---

## 🎯 Problem Statement

Most AI-driven market tools suffer from:

- Black-box predictions
- Non-compliant buy/sell advice
- Unexplainable outputs
- Poor trust with institutional users

**MSIE solves this by design.**

It separates:

- **Deterministic market logic (rules + math)**
- **Probabilistic language reasoning (LLM — Gemini-ready)**

This makes MSIE:

- Trustworthy
- Explainable
- Enterprise-ready

---

## 🧠 Core Design Philosophy

| Layer               | Responsibility                           |
| ------------------- | ---------------------------------------- |
| Rules Engine        | Determines market state                  |
| Market State Object | Single source of truth                   |
| Reasoning Layer     | Explains (LLM or deterministic fallback) |
| API Layer           | Read-only intelligence delivery          |

If the LLM is removed → **MSIE still works fully**.

---

## 🏗 System Architecture (v1)

```
Historical Market Data (CSV / NSE / Yahoo)
        ↓
Indicator Engine (Math & Statistics)
        ↓
Regime Classification Engine (Rules)
        ↓
Market State Object (Deterministic JSON)
        ↓
┌─────────────────────────────────────┐
│   Market Reasoning Engine (MRE)     │
│                                     │
│  ┌───────────────┐                  │
│  │ LLM (Narrator)│  ← Explanation   │
│  │ (Gemini)      │     Only         │
│  └───────────────┘                  │
└─────────────────────────────────────┘
        ↓
Production-Grade Intelligence API (v1)
        ↓
Dashboards / Research Desks / Risk Systems / Fintech SaaS
```

---

## 🧩 Gemini Integration (Explanation Layer)

### Role of Gemini

Gemini is used **only** for:

- Translating structured market states into:
  - Market summaries
  - Regime explanations
  - Risk context
  - Historical-style interpretation

- Maintaining professional, institutional tone

- Answering **user clarification questions** using system-provided state

### What Gemini NEVER Does

- ❌ No price prediction
- ❌ No buy/sell/hold
- ❌ No indicator computation
- ❌ No regime classification
- ❌ No inference beyond provided state

---

## 🔒 API Design Principles (Non-Negotiable)

1. Deterministic core
2. LLM only consumes JSON
3. Every endpoint is explainable
4. Stateless & cacheable
5. Future multi-market ready
6. Bloomberg / Risk Desk style — **not** a trading bot

---

## ⚙️ Current Capabilities (v1)

### 🧮 Market State Engine

- Rolling log-return volatility calculation
- Volatility percentile analysis (2-year lookback)
- EMA-based trend detection (direction + strength)
- Deterministic regime synthesis
- Single authoritative market state object (JSON)

---

### 🧠 Market Reasoning Engine

- Schema-validated explanatory narratives
- LLM-optional design with deterministic fallback
- Institutional-grade, neutral language
- Strict separation between computation and explanation
- Zero advisory or predictive output by design

---

### 🔌 Production-Grade Intelligence API

- Clean, stateless FastAPI architecture
- Health check and confidence endpoints
- Combined intelligence endpoint (state + narrative + meta)
- No calculations performed in the API layer
- LLM usage controlled via environment flags
- Built for explainability, auditability, and trust

---

### 💬 Interactive Market Chat (Explainability Layer)

- Dedicated chat API for user clarification and exploration
- Gemini-powered explanations **strictly bound to system-computed market state**
- Full market state injected as authoritative context
- Historical-style regime comparison without forecasting
- Explicit rule enforcement:
  - No predictions
  - No buy/sell/hold signals
  - No contradiction of computed state

- Professional analyst-style responses
- Fully auditable and deterministic prompt design

This enables users to ask:

- “Why is the market classified this way?”
- “How does this compare to past regimes?”
- “What does this regime usually imply in structure?”

All without violating compliance or introducing decision-making logic.

---

## 🔌 API Endpoints (v1)

Base: `/api/v1`

| Method | Endpoint               | Purpose                                   |
| ------ | ---------------------- | ----------------------------------------- |
| GET    | `/health`              | Deployment & judge sanity check           |
| GET    | `/market/state`        | Deterministic market snapshot             |
| GET    | `/market/narrative`    | Structured reasoning output               |
| GET    | `/market/intelligence` | Combined state + narrative + meta         |
| GET    | `/market/confidence`   | Confidence level with transparent basis   |
| POST   | `/chat`                | Interactive market explanation (Phase 11) |

All endpoints are **stateless**, **read-only**, and return **JSON only**.

---

## 📊 Example Chat Interaction (Phase 11)

**User Question**

```json
{
  "question": "How does the current market regime compare to typical conditions seen over the past year?"
}
```

**System Context (Injected)**

```json
{
  "market_state": "NORMAL_VOL_DOWN",
  "volatility": { "percentile": 32, "regime": "NORMAL" },
  "trend": { "direction": "DOWN", "strength": "STRONG" }
}
```

**Gemini Response**

```json
{
  "answer": "Similar regimes observed over the past year have generally reflected sustained directional phases rather than abrupt reversals, particularly when volatility remained within a normal range."
}
```

---

## 🗂 Repository Structure (Updated)

```
msie/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── health.py
│   │   │   ├── market.py
│   │   │   └── chat.py          # Phase 11
│   ├── core/                    # Market state orchestration
│   ├── regimes/                 # Deterministic rule engines
│   ├── reasoning/
│   │   └── chat_prompt.py       # Strict Gemini prompt contract
│   ├── llm/
│   │   └── gemini_client.py     # LLM client (flag-controlled)
│   └── utils/
├── data/
├── configs/
├── requirements.txt
└── README.md
```

---

## 🚀 Roadmap

- **Phase 12**: Market dashboard (Next.js)
- **Phase 13**: Multi-index & global markets
- **Phase 14**: B2B SaaS hardening (auth, rate limits, caching)
- **Phase 15**: Institutional audit & replay mode

---

## 👤 Author

**Akshat Sachdeva**
AI Engineer & Entrepreneur

---

## ⚠️ Disclaimer

MSIE provides **market intelligence**, not financial advice.
All outputs are informational and **non-actionable** by design.

---
