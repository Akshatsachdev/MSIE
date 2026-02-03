from fastapi import FastAPI

from app.api.v1.health import router as health_router
from app.api.v1.market import router as market_router

app = FastAPI(
    title="MSIE — Market Signal Intelligence Engine",
    version="1.0.0"
)

app.include_router(health_router)
app.include_router(market_router)
