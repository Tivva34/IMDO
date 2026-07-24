import { isMovieFavorite, toggleFavorite } from './favorites.js';

const missingImage = './res/icons/missing-poster.jpg';

export class Movie {
    constructor(data) {
        this.title = data.Title;
        this.year = data.Year;
        this.imdbID = data.imdbID;
        this.posterUrl = data.Poster;
        this.plot = data.Plot;
    }

    getTitle() { return this.title; }
    getYear() { return this.year; }
    getImdbID() { return this.imdbID; }
    getPoster() { return this.posterUrl; }
    getPlot() { return this.plot; }
}

function setFavoriteButtonState(button, movieData, isFavorite) {
    button.classList.toggle('filled', isFavorite);
    button.setAttribute('aria-pressed', String(isFavorite));
    button.setAttribute(
        'aria-label',
        `${isFavorite ? 'Remove' : 'Add'} ${movieData.Title} ${isFavorite ? 'from' : 'to'} favorites`
    );
}

export function createMovieCard(movieData) {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.setAttribute('data-imdbid', movieData.imdbID);

    const posterUrl = movieData.Poster && movieData.Poster !== 'N/A'
        ? movieData.Poster
        : missingImage;

    card.innerHTML = `
        <img src="${posterUrl}" alt="${movieData.Title}" class="movie-poster">
        <h3>${movieData.Title}</h3>
        <button type="button" class="favorite-btn" aria-pressed="false"><span aria-hidden="true">★</span></button>
    `;

    const favoriteButton = card.querySelector('.favorite-btn');
    setFavoriteButtonState(favoriteButton, movieData, isMovieFavorite(movieData.imdbID));

    favoriteButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        setFavoriteButtonState(favoriteButton, movieData, toggleFavorite(movieData));
    });

    card.addEventListener('click', () => {
        window.location.href = `movie.html?id=${movieData.imdbID}`;
    });

    return card;
}

export function updateFavoriteButtons() {
    document.querySelectorAll('.movie-card[data-imdbid]').forEach(card => {
        const button = card.querySelector('.favorite-btn');
        if (!button) return;

        const isFavorite = isMovieFavorite(card.getAttribute('data-imdbid'));
        button.classList.toggle('filled', isFavorite);
        button.setAttribute('aria-pressed', String(isFavorite));
    });
}
