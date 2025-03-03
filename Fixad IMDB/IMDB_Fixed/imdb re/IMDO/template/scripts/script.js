import { createMovieCard } from './components/movieCard.js';
import { searchMovies, fetchFavoriteMovies, fetchMovieDetails } from './modules/api.js';
import { renderTrailers } from './modules/caroussel.js';
import { renderElements, renderMovieDetails, initSearchForm } from './utils/domUtils.js';
import { shuffleArray } from './utils/utils.js';
import { renderFavorites } from './components/favorites.js';

const missingImage = './res/icons/missing-poster.jpg';

// Identifiera och initialisera rätt sida
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM-innehåll laddat");
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        console.log("Initierar startsidan");
        initializeHomePage();
    } else if (window.location.pathname.endsWith('favorites.html')) {
        console.log("Initierar favoritsidan");
        initializeFavoritesPage();
    } else if (window.location.pathname.endsWith('movie.html')) {
        console.log("Initierar filmsidan");
        initializeMoviePage();
    } else if (window.location.pathname.endsWith('search.html')) {
        console.log("Initierar söksidan");
        initializeSearchPage();
    }
    initSearchForm(); // Initiera sökformuläret
    console.log("Sökformulär initierat");
});

// Initiera startsidan
async function initializeHomePage() {
    try {
        const favoriteMovies = await fetchFavoriteMovies();
        console.log("Hämtade favoritfilmer:", favoriteMovies);

        if (!favoriteMovies || favoriteMovies.length === 0) {
            console.warn("Inga filmer hittades i favoritfilmer.");
            return;
        }

        const movieContainer = document.getElementById("movieContainer");
        if (!movieContainer) {
            console.error("Filmcontainer hittades inte.");
            return;
        }

        const movieCards = favoriteMovies.map(movie => {
            const card = createMovieCard({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Poster: movie.Poster || missingImage
            });
            movieContainer.appendChild(card);
        });

        // Anropa renderTrailers med lämpliga parametrar
        favoriteMovies.forEach((movie, index) => {
            renderTrailers(movie, index + 1);
        });

    } catch (error) {
        console.error("Fel vid initiering av startsidan:", error);
    }
}

// Initiera favoritsidan
async function initializeFavoritesPage() {
    // Liknande logik som initializeHomePage
}

// Initiera filmsidan
async function initializeMoviePage() {
    // Hämtar IMDb ID från URL:en
    const imdbID = new URLSearchParams(window.location.search).get('id');
    if (!imdbID) {
        console.error("Ingen IMDb ID angiven.");
        return;
    }

    try {
        // Hämtar filmdetaljer från API:et
        const movieDetails = await fetchMovieDetails(imdbID);
        console.log("Hämtade filmdetaljer:", movieDetails);
        // Renderar filmdetaljer på sidan
        renderMovieDetails(movieDetails);
    } catch (error) {
        console.error("Fel vid hämtning av film:", error);
    }
}

// Initiera söksidan
async function initializeSearchPage() {
    const query = new URLSearchParams(window.location.search).get('q');
    if (!query) {
        console.error("Ingen sökfråga angiven.");
        return;
    }

    try {
        const searchResults = await searchMovies(query);
        console.log("Hämtade sökresultat:", searchResults);

        const cardContainer = document.getElementById("cardContainer");
        if (!cardContainer) {
            console.error("Kortcontainer hittades inte.");
            return;
        }

        cardContainer.innerHTML = ''; // Rensa tidigare sökresultat

        searchResults.forEach(movie => {
            const card = createMovieCard({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Poster: movie.Poster || missingImage
            });
            cardContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Fel vid initiering av söksidan:", error);
    }
}