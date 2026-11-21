![Screenshot](https://img.shields.io/badge/docker--blue?logo=docker&logoColor=yellow)
![Screenshot](https://img.shields.io/badge/html-v5-blue?logo=html5&logoColor=yellow)
![Screenshot](https://img.shields.io/badge/css-v3-blue?logo=css3&logoColor=yellow)
![Screenshot](https://img.shields.io/badge/javascript--blue?logo=javascript&logoColor=yellow)
![Screenshot](https://img.shields.io/badge/axios--blue?logo=axios&logoColor=yellow)
![Screenshot](https://img.shields.io/badge/fontawesome--blue?logo=fontawesome&logoColor=yellow)

# DUMMY APP FOR LEARNING PURPOSES
This is a dummy client that renders data from a Django REST Framework application. You can find it at: https://github.com/memphis-tools/dummy_django_restframework.

## HOW RUN IT ?

### PREREQUISITES
This dummy client is waiting for a Django REST Framework from the project: https://github.com/memphis-tools/dummy_django_restframework

So be sure you're running this project and services up: docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"

<img src="pictures/dummy_django_restframework.png" width="100%%" height="auto">

Then we clone the repository:
    git clone --recurse-submodules https://github.com/memphis-tools/dummy_drf_movies_frontend.git

    cd dummy_drf_movies_frontend

    git submodule update --remote

Create a dummy self-signed cert with a default dummy self CA:

    # dnf install mkcert nss-tools

    $ mkcert -cert-file ./certs/dummy-imdb-movies.crt -key-file ./certs/dummy-imdb-movies.key dummy-imdb-movies.dev

### RUN APP
Start the dummy nginx client:
    docker compose up -d

So you should have the following: docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"

<img src="pictures/dummy_django_restframework_front_docker.png" width="100%%" height="auto">

Go to: https://localhost:4443/

You should find:

<img src="pictures/dummy_django_restframework_front.png" width="100%%" height="auto">
