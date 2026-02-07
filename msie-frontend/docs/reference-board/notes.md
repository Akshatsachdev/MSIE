# MSIE Phase 12 — Dribbble Reference Board Notes

This document records the visual and structural design references used for
Phase 12 (Frontend) of MSIE — Market Signal Intelligence Engine.

These references are used strictly for:

- layout structure
- spacing and hierarchy
- component framing
- UX patterns that reinforce safe, institutional usage

They are NOT used for:

- trading semantics
- retail finance metaphors
- profit / loss signaling
- action-oriented CTAs

This document acts as a **design intent contract** for Phase 12.

---

## 1. Layout (Sidebar + Topbar)

### Reference

- `layout/layout_sidebar_topbar_01.png`

### What works

- Clear left sidebar with restrained width
- Strong hierarchy: Sidebar → Topbar → Main content
- Calm, dark institutional background
- Minimal icon usage, text-first navigation
- Topbar suitable for system status + metadata

### What to copy

- Sidebar proportions and spacing
- Active nav item highlight style (subtle, not glowing)
- Topbar placement and density
- Page title prominence

### What to avoid

- Personal greetings (e.g. “Welcome, User”)
- Product / sales-oriented navigation labels
- Overuse of accent colors

### MSIE usage

- Primary shell for all pages:
  - Overview
  - Market State
  - Confidence
  - Chat

---

## 2. Cards & KPI Panels

### Reference

- `cards-kpis/cards_metrics_02.png`

### What works

- Metric cards with clear label → value → subtext
- Consistent padding and rounded corners
- Metrics feel informational, not celebratory
- Charts embedded inside cards without visual noise

### What to copy

- Card padding and spacing
- Typography hierarchy inside cards
- Subtle divider usage
- Balanced density (not too sparse, not cramped)

### What to avoid

- Green/red success/failure semantics
- Percentage deltas implying performance
- Gamified animations or highlights

### MSIE usage

- Market snapshot cards:
  - Volatility percentile
  - Trend direction & strength
  - Liquidity regime
- Confidence pill containers
- Metadata cards

---

## 3. Charts Framing

### Reference

- `charts/charts_framing_01.png`

### What works

- Charts framed inside neutral cards
- Clear axis labeling
- Tooltip design that prioritizes readability
- No visual bleed or unnecessary gradients

### What to copy

- Chart container framing
- Tooltip positioning and style
- Chart header layout (title + small controls)

### What to avoid

- Indicator overlays
- Buy/sell markers
- Heatmaps or aggressive color encoding
- Profit-oriented annotations

### MSIE usage

- Market context chart (demo or backend-driven)
- Historical regime visualization (future)
- Charts must clearly label:
  - DATA: DEMO or DATA: BACKEND

---

## 4. Tables & JSON Presentation

### Reference

- `tables-json/table-json.png`

### What works

- High-density but readable table layout
- Clear column separation
- Neutral row styling
- Sectioned key/value presentation

### What to copy

- Key-value table formatting
- Section headers inside tables
- Monospaced or code-friendly styling for JSON

### What to avoid

- Editable table cells
- Inline action buttons implying execution
- Conditional coloring tied to performance

### MSIE usage

- Market state detail page
- Confidence basis list
- Raw JSON viewer (read-only)
- Snapshot export preview

---

## 5. Chat Layout & Prompt Guidance

### Reference

- `chat/chat_structure_prompt_chips_01.png`

### What works

- Central input focus
- Prompt chips that guide user intent
- Clear scope framing above input
- Minimal conversational clutter

### What to copy

- Prompt chip pattern
- Scope banner placement
- Input-first layout

### What to avoid

- Friendly assistant tone (“Welcome 👋”)
- Decision-oriented suggestions
- Task/action metaphors
- Chatty or conversational bubbles

### MSIE usage

- Clarification-only chat
- Scope banner text:
  “Ask about structure, regimes, volatility, trend. No predictions or advice.”
- Allowed prompt chips:
  - “Why is the market in this regime?”
  - “How is volatility classified?”
  - “Why is trend classified as STRONG?”

---

## Final Design Rules for Phase 12

- Dark, institutional, terminal-grade UI
- Calm, neutral color palette
- No retail finance language
- No trading metaphors
- No decision encouragement
- Frontend visualizes intelligence, never creates it

All Phase 12 components must align with the intent documented here.
