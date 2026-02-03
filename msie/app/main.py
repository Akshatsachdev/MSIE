from fastapi import FastAPI

app = FastAPI(
    title="MSIE – Market Signal Intelligence Engine",
    version="1.0.0",
    description="Volatility-first market intelligence system"
)

@app.get("/")
def root():
    return {
        "status": "MSIE running",
        "phase": 6,
        "engine": "volatility-first",
    }
