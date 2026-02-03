from fastapi import APIRouter
from app.core.market_state import build_sample_market_state
from app.reasoning.gemini import generate_reasoning

router = APIRouter()

@router.get("/msie/nifty")
def get_nifty_insight():
    market_state = build_sample_market_state()
    reasoning = generate_reasoning(market_state.dict())

    return {
        "market_state": market_state,
        "gemini_reasoning": reasoning
    }
