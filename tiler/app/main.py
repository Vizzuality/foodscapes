from fastapi import FastAPI
from os import getenv
from titiler.core import TilerFactory
from titiler.core.errors import DEFAULT_STATUS_CODES, add_exception_handlers

from titiler.core.middleware import TotalTimeMiddleware, LoggerMiddleware

root_path = getenv("TILER_ROOT_PATH", "")

app = FastAPI(title="Tiler!", root_path=root_path)
app.add_middleware(TotalTimeMiddleware)
app.add_middleware(LoggerMiddleware)

# single COG tiler. One file can have multiple bands
cog = TilerFactory(router_prefix="/cog")
app.include_router(cog.router, tags=["Cloud Optimized GeoTIFF"], prefix="/cog")

add_exception_handlers(app, DEFAULT_STATUS_CODES)

@app.get("/healthz", description="Health Check", tags=["Health Check"])
def ping():
    """Health check."""
    return {"ping": "pong"}
