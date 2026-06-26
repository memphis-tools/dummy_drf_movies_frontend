FROM nginxinc/nginx-unprivileged:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx_client/nginx.conf /etc/nginx/conf.d
COPY static/ /usr/share/nginx/html/

COPY ../certs/dummy-imdb-movies.crt /etc/nginx/certs/dummy-imdb-movies.crt
COPY ../certs/dummy-imdb-movies.key /etc/nginx/certs/dummy-imdb-movies.key

USER root
RUN chown -R nginx: /etc/nginx
RUN chown -R nginx: /usr/share/nginx
USER nginx
