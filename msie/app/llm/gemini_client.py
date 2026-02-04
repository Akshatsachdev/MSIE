import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load .env once at import time
load_dotenv()


def call_gemini(prompt: str) -> str:
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise RuntimeError("GEMINI_API_KEY not set in .env")

    # Configure Gemini
    genai.configure(api_key=api_key)

    # NOTE:
    # As of now, Gemini 3 is not exposed via google-generativeai SDK.
    # This is the highest officially supported Flash model.
    model = genai.GenerativeModel("gemini-1.5-flash")

    response = model.generate_content(prompt)

    if not response or not response.text:
        raise RuntimeError("Empty response from Gemini")

    return response.text.strip()
