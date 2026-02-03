from pydantic import BaseModel
from typing import Literal


class MarketNarrative(BaseModel):
    market_summary: str
    risk_context: str
    participant_behavior: str
    regime_interpretation: str
    confidence_level: Literal["LOW", "MEDIUM", "HIGH"]
