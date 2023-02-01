from fastapi import FastAPI, Query
from os import getenv, environ
from titiler.core import TilerFactory
from titiler.core.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from titiler.core.middleware import TotalTimeMiddleware, LoggerMiddleware

from .utils.cors_middleware import add_cors_middleware

ROOT_PATH = getenv("TILER_ROOT_PATH", "")

# If a COG filename is supplied, compose its absolute path as COG_PATH,
# otherwise leave COG_PATH empty. DATA_HOME should always be defined (it's baked
# in the Docker image), so we can let getenv fail if it happens to be not
# defined as that would be an unexpected situation.
COG_PATH = f"{environ['DATA_HOME']}/{getenv('TILER_FOODSCAPES_COG_FILENAME', '')}" if getenv("TILER_FOODSCAPES_COG_FILENAME", "") else ""


def default_cog_url(url: str | None = Query(default=None, description="Optional dataset URL")) -> str:
    """Makes the cog path url parameter optional.
    If no url is provided, default to COG_PATH defined at app startup.
    """
    if url:
        return url
    else:
        return COG_PATH

app = FastAPI(title="Tiler!", root_path=ROOT_PATH)
app.add_middleware(TotalTimeMiddleware)
app.add_middleware(LoggerMiddleware)
app = add_cors_middleware(app)

# single COG tiler. One file can have multiple bands
cog = TilerFactory(router_prefix="/cog", path_dependency=default_cog_url)
app.include_router(cog.router, tags=["Cloud Optimized GeoTIFF"], prefix="/cog")

add_exception_handlers(app, DEFAULT_STATUS_CODES)


@app.get("/healthz", description="Health Check", tags=["Health Check"])
def ping():
    """Health check."""
    return {"ping": "pong"}
