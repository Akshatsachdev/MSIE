BANNED_TERMS = [
    "buy", "sell", "hold",
    "target", "price will",
    "expected to reach",
    "profit"
]

def validate_llm_output(text: str):
    lowered = text.lower()
    for term in BANNED_TERMS:
        if term in lowered:
            raise ValueError(f"Unsafe term detected: {term}")
