from pydantic import BaseModel

class GeminiNarrative(BaseModel):
    market_summary: str
    risk_context: str
    participant_behavior: str
    regime_interpretation: str
    confidence_level: str
