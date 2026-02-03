from app.reasoning.output_schema import MarketNarrative


def generate_market_narrative(market_state: dict) -> MarketNarrative:
    """
    Convert deterministic market state into a human-readable,
    audit-safe market narrative.

    NOTE:
    - No predictions
    - No trading advice
    - No LLM dependency (yet)
    """

    vol = market_state.get("volatility", {})
    trend = market_state.get("trend", {})
    liquidity = market_state.get("liquidity", {})

    # 1. Market Summary
    market_summary = (
        f"The market is currently experiencing a "
        f"{vol.get('regime', 'unknown').lower()} volatility environment "
        f"with a {trend.get('strength', 'unknown').lower()} "
        f"{trend.get('direction', 'unknown').lower()} trend."
    )

    # 2. Risk Context
    if vol.get("regime") == "HIGH":
        risk_context = (
            "Market conditions reflect elevated risk, where price movements "
            "may be sharper and less predictable than usual."
        )
        confidence = "MEDIUM"
    elif vol.get("regime") == "LOW":
        risk_context = (
            "Risk conditions appear subdued, suggesting a more stable "
            "and orderly trading environment."
        )
        confidence = "HIGH"
    else:
        risk_context = (
            "Risk levels appear within normal bounds, indicating structured "
            "market participation rather than panic-driven activity."
        )
        confidence = "HIGH"

    # 3. Participant Behavior
    if trend.get("direction") in ["DOWN", "UP"] and trend.get("strength") == "STRONG":
        participant_behavior = (
            "Institutional participants are likely maintaining directional exposure, "
            "while short-term traders align with prevailing momentum."
        )
    else:
        participant_behavior = (
            "Market participants may be exhibiting caution, with activity driven "
            "primarily by short-term and range-based strategies."
        )

    # 4. Regime Interpretation
    regime_interpretation = (
        "This type of market regime is typically interpreted as one where "
        "existing conditions persist until a clear change in volatility "
        "or trend structure emerges."
    )

    return MarketNarrative(
        market_summary=market_summary,
        risk_context=risk_context,
        participant_behavior=participant_behavior,
        regime_interpretation=regime_interpretation,
        confidence_level=confidence,
    )
