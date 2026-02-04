from fastapi import APIRouter

from msie.app.core.market_state import compute_market_state
from msie.app.reasoning.market_reasoner import USE_GEMINI, generate_market_narrative

router = APIRouter(prefix="/api/v1/market", tags=["Market Intelligence"])


@router.get("/state")
def market_state():
    return compute_market_state()


@router.get("/narrative")
def market_narrative():
    state = compute_market_state()
    narrative = generate_market_narrative(state)
    return narrative.model_dump()


@router.get("/intelligence")
def market_intelligence():
    state = compute_market_state()
    narrative = generate_market_narrative(state)

    return {
        "state": state,
        "narrative": narrative,
        "meta": {
            "engine": "MSIE v1",
            "llm_used": USE_GEMINI,   #
            "model": "gemini-3-pro"
            "" if USE_GEMINI else None
        }
    }


@router.get("/confidence")
def market_confidence():
    state = compute_market_state()

    basis = []
    if state["volatility"]["regime"] == "NORMAL":
        basis.append("Volatility within historical range")
    if state["trend"]["strength"] == "STRONG":
        basis.append("Trend strength stable")
    if state["liquidity"]["status"] == "NORMAL":
        basis.append("Liquidity normal")

    return {
        "confidence_level": "HIGH" if len(basis) >= 2 else "MEDIUM",
        "basis": basis
    }
