# syntax=docker/dockerfile:1.5-labs
FROM python:3.11
LABEL maintainer="hello@vizzuality.com"

ENV NAME foodscapes-tiler
ENV USER $NAME
ENV APP_HOME /opt/$NAME
ENV DATA_HOME ${APP_HOME}/data

ARG TILER_FOODSCAPES_COG_FILENAME
ARG DATA_CORE_COG_SOURCE_URL
ARG DATA_CORE_COG_CHECKSUM

RUN addgroup $USER && adduser --shell /bin/bash --disabled-password --ingroup $USER $USER

WORKDIR $APP_HOME
RUN chown $USER:$USER $APP_HOME

COPY ./requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY --chown=$USER:$USER app ./app
COPY --chown=$USER:$USER data ./data
ADD --chown=$USER:$USER --checksum=${DATA_CORE_COG_CHECKSUM} ${DATA_CORE_COG_SOURCE_URL} ${DATA_HOME}/${TILER_FOODSCAPES_COG_FILENAME}
RUN find ./data -type f -exec chmod ugo-w '{}' \;

EXPOSE 3000
USER $USER

# @todo Consider whether to use a shell script as entrypoint to allow for
# different run modes (e.g. debug, dev, prod, etc.) via Docker commands

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "3000"]
