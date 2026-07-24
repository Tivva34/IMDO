function getFavoritesFromStorage() {
    try {
        const favorites = JSON.parse(localStorage.getItem('favoriteMovies'));
        return Array.isArray(favorites) ? favorites : [];
    } catch {
        return [];
    }
}

function saveFavoritesToStorage(favorites) {
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
}

export function isMovieFavorite(imdbID) {
    return getFavoritesFromStorage().some(movie => movie.imdbID === imdbID);
}

export function saveToFavorites(movieData) {
    const favorites = getFavoritesFromStorage();

    if (!isMovieFavorite(movieData.imdbID)) {
        favorites.push({
            Title: movieData.Title,
            Year: movieData.Year,
            imdbID: movieData.imdbID,
            Poster: movieData.Poster,
            Plot: movieData.Plot
        });
        saveFavoritesToStorage(favorites);
    }
}

export function removeFromFavorites(imdbID) {
    const favorites = getFavoritesFromStorage().filter(movie => movie.imdbID !== imdbID);
    saveFavoritesToStorage(favorites);
}

// Returns the favorite state after the click: true means added, false means removed.
export function toggleFavorite(movieData) {
    if (isMovieFavorite(movieData.imdbID)) {
        removeFromFavorites(movieData.imdbID);
        return false;
    }

    saveToFavorites(movieData);
    return true;
}

export function createFavoriteCard(movieData) {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.setAttribute('data-imdbid', movieData.imdbID);

    card.innerHTML = `
        <img src="${movieData.Poster}" alt="${movieData.Title}" class="movie-poster">
        <h3>${movieData.Title}</h3>
        <button type="button" class="favorite-btn filled" aria-label="Remove ${movieData.Title} from favorites" aria-pressed="true"><span aria-hidden="true">★</span></button>
    `;

    card.querySelector('.favorite-btn').addEventListener('click', event => {
        event.stopPropagation();
        removeFromFavorites(movieData.imdbID);
        renderFavorites();
    });

    card.addEventListener('click', () => {
        window.location.href = `movie.html?id=${movieData.imdbID}`;
    });

    return card;
}

export function renderFavorites() {
    const container = document.getElementById('movieContainer');
    if (!container) return;

    const favorites = getFavoritesFromStorage();
    container.innerHTML = '';

    if (favorites.length === 0) {
        container.innerHTML = '<p class="no-favorites">No favorite movies yet.</p>';
        return;
    }

    favorites.forEach(movieData => container.appendChild(createFavoriteCard(movieData)));
}

export function updateFavoriteButtonStatus(movie) {
    const button = document.querySelector(`[data-imdbid="${movie.imdbID}"] .favorite-btn`);
    if (!button) return;

    const isFavorite = isMovieFavorite(movie.imdbID);
    button.classList.toggle('filled', isFavorite);
    button.setAttribute('aria-pressed', String(isFavorite));
}
