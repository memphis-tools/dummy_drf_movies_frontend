FROM python:3.15-rc-alpine3.22

WORKDIR /app
COPY ./server.py /app
COPY ./static /app/static

EXPOSE 443

CMD ["python", "server.py"]
