import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables
load_dotenv()

# Flags & config
USE_GEMINI = os.getenv("USE_GEMINI", "false").lower() == "true"
_GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
_GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

if USE_GEMINI and not _GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set but USE_GEMINI=true")

# Initialize client once
_client = genai.Client(api_key=_GEMINI_API_KEY) if USE_GEMINI else None


def call_gemini(
    prompt: str,
    temperature: float = 0.3,
    max_tokens: int | None = 512,
) -> str:
    """
    Calls Gemini (2.0) and returns generated text.
    Gemini is used ONLY for explanation, not decision logic.
    """
    if not USE_GEMINI:
        raise RuntimeError("Gemini usage is disabled via USE_GEMINI flag")

    if not prompt or not prompt.strip():
        raise ValueError("Prompt cannot be empty")

    config = types.GenerateContentConfig(
        temperature=temperature,
        max_output_tokens=max_tokens,
    )

    response = _client.models.generate_content(
        model=_GEMINI_MODEL,
        contents=prompt,
        config=config,
    )

    # Safe extraction
    if getattr(response, "text", None):
        return response.text.strip()

    if response.candidates:
        return response.candidates[0].content.parts[0].text.strip()

    raise RuntimeError("Empty response from Gemini")
