FROM nginx:1.30.0-alpine3.23-slim

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx_client/nginx.conf /etc/nginx/conf.d
COPY static/ /usr/share/nginx/html/

COPY ../certs/dummy-imdb-movies.crt /etc/nginx/certs/dummy-imdb-movies.crt
COPY ../certs/dummy-imdb-movies.key /etc/nginx/certs/dummy-imdb-movies.key

RUN chown -R nginx: /etc/nginx
RUN chown -R nginx: /usr/share/nginx

