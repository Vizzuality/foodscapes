FROM python:3.11
LABEL maintainer="hello@vizzuality.com"

ENV NAME foodscapes-tiler
ENV USER $NAME
ENV APP_HOME /opt/$NAME

RUN addgroup $USER && adduser --shell /bin/bash --disabled-password --ingroup $USER $USER

WORKDIR $APP_HOME
RUN chown $USER:$USER $APP_HOME

COPY ./requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY --chown=$USER:$USER app ./app
COPY --chown=$USER:$USER data ./data
RUN chmod ugo-w ./data/*

EXPOSE 3000
USER $USER

# @todo Consider whether to use a shell script as entrypoint to allow for
# different run modes (e.g. debug, dev, prod, etc.) via Docker commands

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "3000"]
