# 🧠 MSIE — Market Signal Intelligence Engine

**Deterministic Market Intelligence + LLM Reasoning (Gemini-3-pro)**

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

It enforces a hard separation between:

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

If the LLM is removed → **MSIE continues to function fully**.

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
│  │ (Gemini-3-pro)│     Only         │
│  └───────────────┘                  │
└─────────────────────────────────────┘
        ↓
Production-Grade Intelligence API (v1)
        ↓
Dashboards / Research Desks / Risk Systems
```

---

## 🧩 Gemini Integration (Explanation Layer)

### Role of Gemini

Gemini is used **only** for:

- Translating structured market states into:
  - Market summaries
  - Regime explanations
  - Risk context

- Maintaining professional, institutional tone

- Answering **clarification-only** user questions

### What Gemini NEVER Does

- ❌ No price prediction
- ❌ No buy/sell/hold advice
- ❌ No indicator computation
- ❌ No regime classification
- ❌ No inference beyond provided state

---

## 🔒 API Design Principles (Non-Negotiable)

1. Deterministic core
2. LLM consumes **JSON only**
3. Every output is explainable
4. Stateless & cacheable
5. LLM optional via flags
6. Bloomberg / Risk-Desk style — **not** a trading bot

---

## ⚙️ Current Capabilities (v1)

### 🧮 Market State Engine

- Rolling log-return volatility
- Volatility percentile analysis
- EMA-based trend detection
- Deterministic regime synthesis
- Single authoritative market state object

### 🧠 Market Reasoning Engine

- Schema-validated narratives
- LLM-optional with safe fallback
- Institutional, neutral language
- Zero advisory output by design

### 🔌 Production-Grade Intelligence API

- FastAPI-based
- Stateless JSON responses
- Confidence & metadata endpoints
- LLM usage controlled via environment flags
- Audit-safe and compliance-friendly

### 💬 Interactive Market Chat

- Clarification-only chat interface
- Gemini bound strictly to computed state
- No speculation, no forecasting
- Deterministic fallback always available

---

## 🔌 API Endpoints (v1)

Base: `/api/v1`

| Method | Endpoint               | Purpose                           |
| ------ | ---------------------- | --------------------------------- |
| GET    | `/health`              | Deployment sanity check           |
| GET    | `/market/state`        | Deterministic market snapshot     |
| GET    | `/market/narrative`    | Structured explanation            |
| GET    | `/market/intelligence` | State + narrative + metadata      |
| GET    | `/market/confidence`   | Confidence with transparent basis |
| POST   | `/chat`                | Clarification-only market chat    |

All endpoints are **read-only**, **stateless**, and return **JSON only**.

---

## 🗂 Repository Structure (Current)

```
MSIE v1/
├── Dockerfile
├── requirements.txt
├── README.md
├── tests/
│   └── test_smoke.py        # CI smoke test
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI
├── msie/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── core/
│   │   ├── regimes/
│   │   ├── reasoning/
│   │   ├── llm/
│   │   ├── utils/
│   │   └── data/
│   ├── .env                 # Local only (ignored)
└── .gitignore
```

---

## 🧪 Testing & CI (Phase 11.9)

MSIE includes a **CI safety net** to guarantee deploy readiness.

### Smoke Test

A minimal test ensures:

- Backend imports cleanly
- Dependencies are correct
- No runtime import regressions

```bash
pytest -q
```

### GitHub Actions CI

On every push / PR:

- Python dependencies are installed
- Smoke tests are executed
- Docker image is built (no push)

This ensures:

> **If CI is green → MSIE is deployable**

---

## 🐳 Running Locally (Docker)

```bash
docker build -t msie-api .
docker run -p 8080:8080 --env-file msie/.env msie-api
```

Health check:

```
http://localhost:8080/health
```

---

## 🚀 Deployment Status

- Dockerized and Cloud-Run compatible
- CI-validated
- CD intentionally deferred (billing-independent development)

---

## 🧩 MSIE Frontend (Phase 12)

MSIE frontend is a **read-only market intelligence dashboard** designed for
institutional-style market context analysis.

### Key Principles

- No trading, no signals, no execution
- Frontend performs **zero financial computation**
- All intelligence is sourced from backend APIs
- UI is deterministic and audit-friendly

---

### Architecture

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Theme:** Light / Dark / System (global, persistent)
- **Charts:** Placeholder only (live timeseries in Phase 13)

---

### Backend Integration

The frontend consumes two APIs:

1. **Market Intelligence**
   GET /market/state

Returns structured market state:

- Symbol
- Volatility percentile & regime
- Trend direction & strength
- Liquidity
- Date

2. **Market Confidence**
   GET /market/confidence

Returns:

- confidence_level (HIGH / MEDIUM / LOW)
- basis (explanatory reasons)

---

### Data Normalization (Phase 12.1.11)

All backend responses are normalized via:
`src/lib/normalize.ts`

Responsibilities:

- Adapt backend schemas to frontend view models
- Handle missing / optional fields safely
- Prevent frontend assumptions or calculations
- Preserve backend authority over market interpretation

> ⚠️ Frontend never infers regimes, confidence, or trends.

---

### Current Pages

- **Overview** – Market snapshot & narrative
- **Market State** – Regime & structure (UI scaffold)
- **Confidence** – Confidence level & rationale
- **Explainability Chat** – Read-only clarification interface

---

### Disclaimer

> Informational only. No financial advice.

---

## 🛣 Roadmap

- **Phase 12** — Market Intelligence Dashboard (Next.js)
- **Phase 13** — Multi-index & global markets
- **Phase 14** — SaaS hardening (auth, rate limits, caching)
- **Phase 15** — Institutional audit & replay mode

---

## 👤 Author

**Akshat Sachdeva**
AI Engineer & Entrepreneur

---

## ⚠️ Disclaimer

MSIE provides **market intelligence**, not financial advice.
All outputs are informational and **non-actionable by design**.

---
