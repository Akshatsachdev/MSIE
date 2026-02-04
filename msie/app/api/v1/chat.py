from fastapi import APIRouter
from pydantic import BaseModel

from msie.app.reasoning.chat_prompt import build_chat_prompt
from msie.app.llm.gemini_client import call_gemini
from msie.app.core.market_state import compute_market_state


router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    question: str
    context: str | None = None  # optional (market, stock, etc)


@router.post("/")
def chat_with_ai(payload: ChatRequest):
    # Get full market state
    market_state = compute_market_state()

    prompt = build_chat_prompt(
        question=payload.question,
        market_state=market_state,
        context=payload.context
    )

    response = call_gemini(prompt)

    return {
        "question": payload.question,
        "market_state": market_state,
        "answer": response
    }
