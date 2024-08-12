FROM python:3.12.5-alpine3.19

WORKDIR /app
COPY ./server.py /app
COPY ./static /app/static

EXPOSE 443

CMD ["python", "server.py"]
