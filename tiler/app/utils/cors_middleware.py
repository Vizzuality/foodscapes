from fastapi.middleware.cors import CORSMiddleware
from os import getenv

def add_cors_middleware(app):
  cors_origins_regex = getenv("TILER_CORS_ORIGINS_REGEX", "")
  # If we have a plain `*` (as a regexp: `\*`), use `allow_origins=["*"]` to
  # allow any origin, otherwise treat `TILER_CORS_ORIGINS_REGEX` as a regex
  # for `allow_origin_regex`.
  if cors_origins_regex == "\*":
    app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"],
      allow_credentials=False,
      allow_methods=["*"],
      allow_headers=["*"],
    )
  else:
    app.add_middleware(
      CORSMiddleware,
      allow_origin_regex=cors_origins_regex,
      allow_credentials=False,
      allow_methods=["*"],
      allow_headers=["*"],
    )

  return app
