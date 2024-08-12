const BASE_URL = "https://127.0.0.1";
const displayed_categories_number = 4;
const modal = document.getElementById("movie_modal");
const modal_content = document.getElementById("modal-content");
const carousel_categorie_0 = [];
const carousel_categorie_1 = [];
const carousel_categorie_2 = [];
const carousel_categorie_3 = [];

// on définit cette structure de données dans le but d'éviter des répétitions.
const movies_genre_list = [
  {"carousel_name": "carousel_categorie_0", "carousel_request": "sort_by=-rating", "current_page": 1},
  {"carousel_name": "carousel_categorie_1", "carousel_request": "genre=animation", "current_page": 1},
  {"carousel_name": "carousel_categorie_2", "carousel_request": "genre=drama", "current_page": 1},
  {"carousel_name": "carousel_categorie_3", "carousel_request": "genre=thriller", "current_page": 1},
];

class Movie {
  constructor(id, image, title, description, genres, year, rating, director, writer, actors, countries_of_origin, trailer_url) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.description = description;
    this.genres = genres;
    this.year = year;
    this.rating = rating;
    this.director = director;
    this.writer = writer;
    this.actors = actors;
    this.countries_of_origin = countries_of_origin;
    this.trailer_url = trailer_url;
  }
}

function instantiate_movie(movie) {
  new_movie = new Movie(
    movie["id"],
    movie["image"],
    movie["title"],
    movie["description"],
    movie["genres"],
    movie["year"],
    movie["rating"],
    movie["director"],
    movie["writer"],
    movie["actors"],
    movie["countries_of_origin"],
    movie["trailer_url"],
  )
  return new_movie;
}

function update_modal_content(movie) {
  modal_title = document.getElementById("modal-title");
  modal_image = document.getElementById("modal-image");
  modal_genres = document.getElementById("modal-genres");
  modal_year = document.getElementById("modal-year");
  modal_description = document.getElementById("modal-description");
  modal_rating = document.getElementById("modal-rating");
  modal_director = document.getElementById("modal-director");
  modal_writer = document.getElementById("modal-writer");
  modal_actors = document.getElementById("modal-actors");
  modal_countries_of_origin = document.getElementById("modal-countries_of_origin");
  modal_trailer = document.getElementById("modal-trailer");

  modal_title.textContent = movie.title;
  modal_image.src = movie.image;
  modal_genres.textContent = movie.genres;
  modal_year.textContent = movie.year;
  modal_rating.textContent = movie.rating;
  modal_director.textContent = movie.director;
  modal_writer.textContent = movie.writer;
  modal_actors.textContent = movie.actors;
  modal_countries_of_origin.textContent = movie.countries_of_origin;
  modal_description.textContent = movie.description;
  modal_trailer.href = movie.trailer_url;
}

function get_movie_detail(movie_id) {
  // utilisée pour la modale, on doit requêter un film avec son id pour obtenir tous les détails
  movie_with_full_details = axios.get(`${BASE_URL}/api/v1/movies/${movie_id}`)
  .then(response => update_modal_content(response.data));
}

function create_movie_button(new_movie) {
  // sert aux vignettes films. A chaque click, appel d'une fonction pour créer la modale
  a_movie = document.createElement("button");
  a_movie.type = "button";
  a_movie.id = new_movie['id'];
  a_movie.className = "btn";
  a_movie.setAttribute("data-bs-toggle", "modal");
  a_movie.setAttribute("data-bs-target", "#dummy-modal");
  movie_image = document.createElement("img");
  movie_image.src = new_movie["image"];
  movie_image.alt = "Image du film";
  a_movie.appendChild(movie_image);
  a_movie.addEventListener("click", () => get_movie_detail(new_movie["id"]))
  return a_movie
}

function update_carousel(section_name, data) {
  // appel dans 2 circonstances:
  // lors du chargement de la page (window.onload),
  // et lors de la consultation des précédents/prochains films (axios_get_request)
  document.getElementById(section_name).innerHTML = "";
  for (let movie of data.results) {
    new_movie = instantiate_movie(movie)
    // on met à jour la structure de données correspondant à la catégorie de film en cours de visualisation
    eval(`${section_name}`).push(new_movie);
    // on met à jour la visualisation. Chaque vignette de film déclenchera l'apparition de la modale
    a_movie = create_movie_button(new_movie)
    document.getElementById(`${section_name}`).appendChild(a_movie);
  }
  current_section = document.getElementById(section_name);
  current_section.focus();
  a_movie.addEventListener("click", () => get_movie_detail(new_movie["id"]))
}

function get_carousel_current_page(carousel_name) {
  // parcours de la structure de données "movies_genre_list". On cherche le numéro de page actuel pour une catégorie (un carousel).
    for(carousel of movies_genre_list) {
      if(carousel["carousel_name"] == carousel_name) {
        return carousel["current_page"]
      }
    }
  }

function get_carousel_request(carousel_name) {
  // parcours de la structure de données "movies_genre_list". On cherche le type de requete pour une catégorie (un carousel).
  for(carousel of movies_genre_list) {
    if(carousel["carousel_name"] == carousel_name) {
      return carousel["carousel_request"]
    }
  }
}

function update_carousel_current_page(carousel_name, current_page_number) {
  // parcours de la structure de données "movies_genre_list". On met à jour le numéro de page actuel pour une catégorie (un carousel).
  for(carousel of movies_genre_list) {
    if(carousel["carousel_name"] == carousel_name) {
      carousel["current_page"] = current_page_number;
      return true;
    }
  }
  return false;
}

function axios_get_request(carousel_name) {
  // axios instancie un objet Prommise.
  // une fois la requete GET réussie, on peut déclencher notre evenement, içi la mise à jour du carousel d'une catégorie
  axios.get(`${BASE_URL}/api/v1/movies/?${request}&page=${current_page_number}`)
   .then(response => update_carousel(carousel_name, response.data));
}

function get_next_movies(carousel_name, modal, modal_content) {
  // fonction assignée à un bouton ">" (prochains) pour executer la mise a jour du carousel d'une catégorie
  current_page_number = get_carousel_current_page(carousel_name)
  current_page_number += 1;
  request = get_carousel_request(carousel_name)
  update_carousel_current_page(carousel_name, current_page_number)
  axios_get_request(carousel_name)
}

function get_previous_movies(carousel_name, modal, modal_content) {
  // fonction assignée à un bouton "<" (precedents) pour executer la mise a jour du carousel d'une catégorie
  current_page_number = get_carousel_current_page(carousel_name)
  if (current_page_number > 1){
    current_page_number -= 1;
  }
  else {
    current_page_number = 1;
  }
  request = get_carousel_request(carousel_name)
  update_carousel_current_page(carousel_name, current_page_number)
  axios_get_request(carousel_name)
}

function replace_arrows_when_resize_screen_width_to_min() {
  const arrows_zones = document.getElementsByClassName("arrows-zone");
  if (arrows_zones.length == 0) {
    for (let i=0; i<4; i++) {
      const moviesContainer = document.querySelector(`#section_categorie_${i} .movies_container`);
      const carousel = document.getElementById(`carousel_categorie_${i}`);
      const left_arrow = document.getElementById(`left_arrow_categorie_${i}`);
      const right_arrow = document.getElementById(`right_arrow_categorie_${i}`);

        moviesContainer.removeChild(left_arrow);
        moviesContainer.removeChild(right_arrow);
        moviesContainer.removeChild(carousel);

        // on crée une div pour les boutons à créer
        const new_arrows_zone = document.createElement("div")
        new_arrows_zone.className = "arrows-zone d-flex flex-row justify-content-between";

        // on crée le bouton gauche
        const new_left_arrow = document.createElement("button");
        new_left_arrow.className = "left_arrow btn btn-warning";
        new_left_arrow.id = `left_arrow_categorie_${i}`;
        const leftLink = document.createElement("a");
        leftLink.href = `#carousel_categorie_${i}`;
        leftLink.innerText = "PREVIOUS";
        new_left_arrow.appendChild(leftLink);

        // on crée le bouton droite
        const new_right_arrow = document.createElement("button");
        new_right_arrow.className = "right_arrow btn btn-warning";
        new_right_arrow.id = `right_arrow_categorie_${i}`;
        const rightLink = document.createElement("a");
        rightLink.href = `#carousel_categorie_${i}`;
        rightLink.innerText = "NEXT";
        new_right_arrow.appendChild(rightLink);

        // on actualise la présentation, nos boutons, et le carousel en dessous
        new_arrows_zone.appendChild(new_left_arrow, new_arrows_zone);
        new_arrows_zone.appendChild(new_right_arrow, new_arrows_zone);
        moviesContainer.appendChild(new_arrows_zone, moviesContainer);
        moviesContainer.appendChild(carousel, moviesContainer);
    }
  }
}

function replace_arrows_when_resize_screen_width_to_max() {
  const arrows_zones = document.getElementsByClassName("arrows-zone");
  if (arrows_zones.length > 0) {
    for (let i=0; i<4; i++) {
      const moviesContainer = document.querySelector(`#section_categorie_${i} .movies_container`);
      const carousel = document.getElementById(`carousel_categorie_${i}`);
        while (arrows_zones.length > 0) {
          arrows_zones[0].parentNode.removeChild(arrows_zones[0]);
        }
        moviesContainer.removeChild(carousel);

        // on crée le bouton gauche
        const new_left_arrow = document.createElement("button");
        new_left_arrow.className = "left_arrow fas fa-chevron-left";
        new_left_arrow.id = `left_arrow_categorie_${i}`;
        const leftLink = document.createElement("a");
        leftLink.href = `#carousel_categorie_${i}`;
        new_left_arrow.appendChild(leftLink);

        // on crée le bouton droite
        const new_right_arrow = document.createElement("button");
        new_right_arrow.className = "right_arrow fas fa-chevron-right";
        new_right_arrow.id = `right_arrow_categorie_${i}`;
        const rightLink = document.createElement("a");
        rightLink.href = `#carousel_categorie_${i}`;
        new_right_arrow.appendChild(rightLink);

        // on actualise la présentation, bouton gauche, le carousel et le bouton droite
        moviesContainer.appendChild(new_left_arrow, moviesContainer);
        moviesContainer.appendChild(carousel, moviesContainer);
        moviesContainer.appendChild(new_right_arrow, moviesContainer);
      }
    }
}

function update_caroussel_size() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 576) {
    replace_arrows_when_resize_screen_width_to_min()
  }
  else {
    replace_arrows_when_resize_screen_width_to_max()
  }
  // on assigne dynamiquemment des fonctions en utilisant des patterns existantes
  for (let i = 0; i < displayed_categories_number; i++) {
    document.getElementById("right_arrow_categorie_"+i).onclick = function() {get_next_movies("carousel_categorie_"+i, modal, modal_content)};
    document.getElementById("left_arrow_categorie_"+i).onclick = function() {get_previous_movies("carousel_categorie_"+i, modal, modal_content)};
  }
}

function update_carousel_list(new_genre) {
  const main_block = document.querySelector('main');
  genres_div = document.getElementById("genres_div");
  genres_div.remove();

  movies_genre_list[1].carousel_request = `genre=${new_genre}`;
  temp_genres_list = ["best movies", new_genre, "drama", "thriller"]
  for (let i=0; i<4; i++) {
    new_section = document.createElement("section");
    new_section.id = `section_categorie_${i}`;
    new_section_header = document.createElement("h2");
    new_section_header.className = "section_title";
    new_section_header.textContent = temp_genres_list[i];
    new_section_carousel = document.createElement("div");
    new_section_carousel.className = "movies_container";
    new_section_left_button = document.createElement("button");
    new_section_left_button.className = "left_arrow fas fa-chevron-left";
    new_section_left_button.id = `left_arrow_categorie_${i}`;
    new_section_left_button.href = `#carousel_categorie_${i}`;
    new_section_body = document.createElement("div");
    new_section_body.id = `carousel_categorie_${i}`,
    new_section_right_button = document.createElement("button");
    new_section_right_button.className = "right_arrow fas fa-chevron-right";
    new_section_right_button.id = `right_arrow_categorie_${i}`;
    new_section_right_button.href = `#carousel_categorie_${i}`;

    // on assigne dynamiquemment des fonctions en utilisant des patterns existantes
    new_section_left_button.onclick = function() {get_previous_movies("carousel_categorie_"+i, modal, modal_content)};
    new_section_right_button.onclick = function() {get_next_movies("carousel_categorie_"+i, modal, modal_content)};


    new_section_carousel.appendChild(new_section_left_button);
    new_section_carousel.appendChild(new_section_body);
    new_section_carousel.appendChild(new_section_right_button);
    new_section.appendChild(new_section_header);
    new_section.appendChild(new_section_carousel)

    main_block.appendChild(new_section);

    request = get_carousel_request(`carousel_categorie_${i}`);
    current_page_number = 1


    update_carousel_current_page(`carousel_categorie_${i}`, current_page_number);
    axios_get_request(`carousel_categorie_${i}`);
  }
  update_caroussel_size();
}


function rebuild_webpage_for_genres(genres) {
  const main_block = document.querySelector('main');
  const section_0 = document.getElementById("section_categorie_0");
  const section_1 = document.getElementById("section_categorie_1");
  const section_2 = document.getElementById("section_categorie_2");
  const section_3 = document.getElementById("section_categorie_3");

  section_0.remove();
  section_1.remove();
  section_2.remove();
  section_3.remove();
  const genres_div = document.createElement("div");
  genres_div.className = "genres_div d-flex flex-column align-items-center"
  genres_div.id = "genres_div";
  for (let genre of genres) {
    const new_genre = document.createElement("button");
    new_genre.className = "m-2 genre";
    new_genre.textContent = genre.name;
    new_genre.href = "#";
    new_genre.addEventListener("click", () => update_carousel_list(genre.name))
    genres_div.appendChild(new_genre);
  }
  main_block.appendChild(genres_div);
  const navbarCollapse = document.getElementById("navbarCollapse");
  navbarCollapse.classList.remove('show');
}

function get_all_genres() {
  movie_with_full_details = axios.get(`${BASE_URL}/api/v1/genres/`)
  .then(response => rebuild_webpage_for_genres(response.data));
}

window.onload = function() {
  var footer_date = new Date();
  // la fonction motrice qui charge la logique javascript
  document.getElementById("footer_date").innerHTML = "&copy; DUMMY-MOVIES 2023-" + footer_date.getFullYear();
  // axios est utilsé pour effectuer autant de requetes GET que d'éléments dans la structure de données "movies_genre_list"
  axios.all(movies_genre_list.map((carousel) => axios.get(`${BASE_URL}/api/v1/movies/?${carousel['carousel_request']}&page=1`)
    .then(response => update_carousel(carousel['carousel_name'],response.data))));

  // on assigne dynamiquemment des fonctions en utilisant des patterns existantes
  for (let i = 0; i < displayed_categories_number; i++) {
    document.getElementById("right_arrow_categorie_"+i).onclick = function() {get_next_movies("carousel_categorie_"+i, modal, modal_content)};
    document.getElementById("left_arrow_categorie_"+i).onclick = function() {get_previous_movies("carousel_categorie_"+i, modal, modal_content)};
  }
}
window.addEventListener("resize", update_caroussel_size)
window.addEventListener("DOMContentLoaded", update_caroussel_size)
