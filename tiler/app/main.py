from fastapi import FastAPI
from os import getenv
from titiler.core import TilerFactory
from titiler.core.errors import DEFAULT_STATUS_CODES, add_exception_handlers

from titiler.core.middleware import TotalTimeMiddleware, LoggerMiddleware

ROOT_PATH = getenv("TILER_ROOT_PATH", "")
COG_PATH = getenv("TILER_FOODSCAPES_COG_FILENAME", )


def default_cog_url() -> str:
    return COG_PATH


app = FastAPI(title="Tiler!", root_path=ROOT_PATH)
app.add_middleware(TotalTimeMiddleware)
app.add_middleware(LoggerMiddleware)

# single COG tiler. One file can have multiple bands
cog = TilerFactory(router_prefix="/cog", path_dependency=default_cog_url)
app.include_router(cog.router, tags=["Cloud Optimized GeoTIFF"], prefix="/cog")

add_exception_handlers(app, DEFAULT_STATUS_CODES)


@app.get("/healthz", description="Health Check", tags=["Health Check"])
def ping():
    """Health check."""
    return {"ping": "pong"}
