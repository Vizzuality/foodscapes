from os import getenv, environ
from pathlib import Path

from fastapi import FastAPI
from titiler.core import TilerFactory
from titiler.core.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from titiler.core.middleware import TotalTimeMiddleware, LoggerMiddleware

from .factory import SimpleTiler
from .utils.cors_middleware import add_cors_middleware


def url_from_env_var(env_var_name: str) -> str:
    """Return a default URL for a COG from an environment variable."""
    url = Path(environ["DATA_HOME"]) / Path(getenv(env_var_name, ""))
    return url.as_posix() if getenv(env_var_name, "") else ""


ROOT_PATH = getenv("TILER_ROOT_PATH", "")

# If a COG filename is supplied, compose its absolute path as COG_PATH,
# otherwise leave COG_PATH empty. DATA_HOME should always be defined (it's baked
# in the Docker image), so we can let getenv fail if it happens to be not
# defined as that would be an unexpected situation.
COG_PATH = url_from_env_var("TILER_FOODSCAPES_COG_FILENAME")
IRRECOVERABLE_CARBON_COG_PATH = url_from_env_var("TILER_IRRECOVERABLE_CARBON_COG_FILENAME")
DEPRIVATION_INDEX_COG_PATH = url_from_env_var("TILER_DEPRIVATION_INDEX_COG_FILENAME")


def default_foodscapes_cog_url() -> str:
    return COG_PATH


def default_irrecoverable_carbon_cog_url() -> str:
    return IRRECOVERABLE_CARBON_COG_PATH


def default_deprivation_index_cog_url() -> str:
    return DEPRIVATION_INDEX_COG_PATH


app = FastAPI(title="Foodscapes Tiler", root_path=ROOT_PATH)
app.add_middleware(TotalTimeMiddleware)
app.add_middleware(LoggerMiddleware)
app = add_cors_middleware(app)
add_exception_handlers(app, DEFAULT_STATUS_CODES)

# main tiler for foodscapes COG
foodscapes_tiler = TilerFactory(router_prefix="/cog/foodscapes", path_dependency=default_foodscapes_cog_url)
app.include_router(foodscapes_tiler.router, tags=["foodscapes"], prefix="/cog/foodscapes")

# Contextual layers tilers
irrecoverable_carbon_tiler = SimpleTiler(
    router_prefix="/cog/irrecoverable_carbon", path_dependency=default_irrecoverable_carbon_cog_url
)
app.include_router(irrecoverable_carbon_tiler.router, tags=["irrecoverable carbon"], prefix="/cog/irrecoverable_carbon")

deprivation_index_tiler = SimpleTiler(
    router_prefix="/cog/deprivation_index", path_dependency=default_deprivation_index_cog_url
)
app.include_router(deprivation_index_tiler.router, tags=["Relative deprivation index"], prefix="/cog/deprivation_index")


@app.get("/healthz", description="Health Check", tags=["Health Check"])
def ping():
    """Health check."""
    return {"ping": "pong"}
