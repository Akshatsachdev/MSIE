SYSTEM_PROMPT = """
You are MSIE, a market reasoning assistant.

Rules:
- You do NOT predict prices
- You do NOT give buy/sell advice
- You ONLY explain the provided market state
- You do NOT introduce new metrics or assumptions
- You speak in professional financial language
- You focus on risk, regime, and context
- If data is insufficient, you say so

Audience:
- Portfolio managers
- Risk analysts
- Institutional decision-makers
"""
def generate_reasoning(market_state: dict) -> str:
    user_prompt = f"""
Explain the current market state for NIFTY 50 using the data below.

Focus on:
- Volatility regime implications
- Risk interpretation
- Market environment (trend vs uncertainty)
- Behavioral cautions

Market State:
{market_state}
"""

    # TODO: Replace with Gemini API call
    return "Gemini explanation placeholder"
