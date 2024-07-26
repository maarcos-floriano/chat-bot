FROM mysql:latest

WORKDIR /app

COPY ./banco_mock.sql /app/docker-entrypoint-initdb.d/

RUN chmod 755 /docker-entrypoint-initdb.d/

EXPOSE 3306