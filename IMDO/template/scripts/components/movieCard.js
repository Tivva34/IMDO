import { saveToFavorites, removeFromFavorites } from './favorites.js';

const missingImage = './res/icons/missing-poster.jpg';  // Korrigerad sökväg till reservbilden

// Filmklass
export class Movie {
    constructor(data) {
        this.title = data.Title;
        this.year = data.Year;
        this.imdbID = data.imdbID;
        this.posterUrl = data.Poster;
        this.plot = data.Plot;
    }

    // Hämta filmdetaljer
    getTitle() {
        return this.title;
    }

    getYear() {
        return this.year;
    }

    getImdbID() {
        return this.imdbID;
    }

    getPoster() {
        return this.posterUrl;
    }

    getPlot() {
        return this.plot;
    }
}

// Funktion för att skapa filmkort
export function createMovieCard(movieData) {
    console.log("Skapar filmkort med data:", movieData);

    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.setAttribute('data-imdbid', movieData.imdbID);

    const posterUrl = (movieData.Poster && movieData.Poster !== 'N/A') ? movieData.Poster : missingImage;

    card.innerHTML = `
        <img src="${posterUrl}" alt="${movieData.Title}" class="movie-poster">
        <h3>${movieData.Title}</h3>
        <button class="favorite-btn" aria-label="Lägg till ${movieData.Title} i favoriter"><i class="fa fa-star"></i></button>
    `;

    const favoriteButton = card.querySelector(".favorite-btn");

    // Kontrollera om filmen redan finns i lokalt lagringsutrymme
    const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    const isFavorite = favorites.some(fav => fav.imdbID === movieData.imdbID);

    // Om filmen är en favorit, fyll stjärnan
    if (isFavorite) {
        favoriteButton.classList.add("filled");
    }

    // Händelselyssnare för att växla favoritstatus
    favoriteButton.addEventListener("click", (event) => {
        event.stopPropagation();  // Förhindra att kortet klickas när stjärnan klickas

        if (favoriteButton.classList.contains("filled")) {
            removeFromFavorites(movieData.imdbID);
            favoriteButton.classList.remove("filled");
            console.log(`Tog bort ${movieData.Title} från favoriter`);
        } else {
            saveToFavorites(movieData);
            favoriteButton.classList.add("filled");
            console.log(`Lade till ${movieData.Title} i favoriter`);
        }
    });

    // Lägg till klickhändelse för att navigera till movie.html
    card.addEventListener("click", () => {
        window.location.href = `movie.html?id=${movieData.imdbID}`;
    });

    console.log(`Skapade filmkort för ${movieData.Title}`);
    return card;
}

// Funktion för att skapa favoritkort
export function createFavoriteCard(movieData) {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.setAttribute('data-imdbid', movieData.imdbID);

    const posterUrl = (movieData.Poster && movieData.Poster !== 'N/A') ? movieData.Poster : missingImage;

    card.innerHTML = `
        <img src="${posterUrl}" alt="${movieData.Title}" class="movie-poster">
        <h3>${movieData.Title} (${movieData.Year})</h3>
        <button class="remove-btn" aria-label="Ta bort ${movieData.Title} från favoriter">Ta bort från favoriter</button>
    `;

    // Ta bort från favoriter
    card.querySelector('.remove-btn').addEventListener('click', (event) => {
        event.stopPropagation();  // Förhindra att kortet klickas när knappen klickas
        removeFromFavorites(movieData.imdbID);
        renderFavorites();  // Uppdatera sidan efter att filmen tagits bort
        console.log(`Tog bort ${movieData.Title} från favoriter och DOM`);
    });

    // Lägg till klickhändelse för att navigera till movie.html
    card.addEventListener("click", () => {
        window.location.href = `movie.html?id=${movieData.imdbID}`;
    });

    console.log(`Skapade favoritkort för ${movieData.Title}`);
    return card;
}


// Uppdatera favoritknappar
export function updateFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

    favoriteButtons.forEach(button => {
        const movieId = button.closest('.movie-card').getAttribute('data-imdbid');
        const isFavorite = favorites.some(fav => fav.imdbID === movieId);

        if (isFavorite) {
            button.classList.add("filled");
            console.log(`Film ${movieId} är en favorit, fylld stjärna`);
        } else {
            button.classList.remove("filled");
            console.log(`Film ${movieId} är inte en favorit, ofylld stjärna`);
        }
    });
}

// Vänta på att DOM laddas innan favoritknappar uppdateras
document.addEventListener('DOMContentLoaded', function () {
    updateFavoriteButtons();  // Uppdatera alla favoritknappar på sidan
    console.log("Uppdaterade favoritknappar vid DOMContentLoaded");
});