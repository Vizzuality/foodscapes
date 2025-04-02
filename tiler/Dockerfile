# syntax=docker/dockerfile:1.5-labs
FROM python:3.12-slim-bookworm
LABEL maintainer="hello@vizzuality.com"

ENV NAME foodscapes-tiler
ENV USER $NAME
ENV APP_HOME /opt/$NAME
ENV DATA_HOME ${APP_HOME}/data

ARG TILER_FOODSCAPES_COG_FILENAME
ARG DATA_CORE_COG_SOURCE_URL
ARG DATA_CORE_COG_CHECKSUM

ARG TILER_IRRECOVERABLE_CARBON_COG_FILENAME
ARG DATA_IRRECOVERABLE_CARBON_COG_SOURCE_URL
ARG DATA_IRRECOVERABLE_CARBON_COG_CHECKSUM

ARG TILER_DEPRIVATION_INDEX_COG_FILENAME
ARG DATA_DEPRIVATION_INDEX_COG_SOURCE_URL
ARG DATA_DEPRIVATION_INDEX_COG_CHECKSUM

ENV TILER_FOODSCAPES_COG_FILENAME ${TILER_FOODSCAPES_COG_FILENAME:-foodscapes_stack_cog_lzw.tif}
ENV TILER_IRRECOVERABLE_CARBON_COG_FILENAME ${TILER_IRRECOVERABLE_CARBON_COG_FILENAME:-irrecoverable-carbon.tif}
ENV TILER_DEPRIVATION_INDEX_COG_FILENAME ${TILER_DEPRIVATION_INDEX_COG_FILENAME:-deprivation-index.tif}

# Requirement of fiona and gdal.
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends libexpat1; \
    rm -rf /var/lib/apt/lists/*

# Ref: https://stackoverflow.com/a/59812588
ENV PYTHONUNBUFFERED=1

RUN addgroup $USER && adduser --shell /bin/bash --disabled-password --ingroup $USER $USER

WORKDIR $APP_HOME
RUN chown $USER:$USER $APP_HOME

COPY ./requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY --chown=$USER:$USER app ./app
COPY --chown=$USER:$USER data ./data
ADD --chown=$USER:$USER --checksum=${DATA_CORE_COG_CHECKSUM} ${DATA_CORE_COG_SOURCE_URL} ${DATA_HOME}/${TILER_FOODSCAPES_COG_FILENAME}
ADD --chown=$USER:$USER --checksum=${DATA_IRRECOVERABLE_CARBON_COG_CHECKSUM} ${DATA_IRRECOVERABLE_CARBON_COG_SOURCE_URL} ${DATA_HOME}/${TILER_IRRECOVERABLE_CARBON_COG_FILENAME}
ADD --chown=$USER:$USER --checksum=${DATA_DEPRIVATION_INDEX_COG_CHECKSUM} ${DATA_DEPRIVATION_INDEX_COG_SOURCE_URL} ${DATA_HOME}/${TILER_DEPRIVATION_INDEX_COG_FILENAME}

RUN find ./data -type f -exec chmod ugo-w '{}' \;

EXPOSE 3000
USER $USER

# @todo Consider whether to use a shell script as entrypoint to allow for
# different run modes (e.g. debug, dev, prod, etc.) via Docker commands

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "3000"]
