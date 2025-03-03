console.log("favorites.js är laddad!");

// Funktion för att hämta favoriter från localStorage
function getFavoritesFromStorage() {
    const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    console.log("Hämtade favoriter från localStorage:", favorites);
    return favorites;
}

// Funktion för att spara uppdaterade favoriter till localStorage
function saveFavoritesToStorage(favorites) {
    localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
    console.log("Sparade favoriter till localStorage:", favorites);
}

// Funktion för att spara eller ta bort film från favoriter
export function saveToFavorites(movieData) {
    let favorites = getFavoritesFromStorage();

    const movieToSave = {
        Title: movieData.Title,
        Year: movieData.Year,
        imdbID: movieData.imdbID,
        Poster: movieData.Poster,
        Plot: movieData.Plot
    };

    const movieIndex = favorites.findIndex(fav => fav.imdbID === movieToSave.imdbID);
    const favoriteButton = document.querySelector(`#movie-${movieToSave.imdbID} .favorite-btn`);

    if (movieIndex === -1) {
        favorites.push(movieToSave);
        if (favoriteButton) {
            favoriteButton.classList.add('filled');
        }
        console.log("Lade till film i favoriter:", movieToSave);
    } else {
        favorites.splice(movieIndex, 1);
        if (favoriteButton) {
            favoriteButton.classList.remove('filled');
        }
        console.log("Tog bort film från favoriter:", movieToSave);
    }

    saveFavoritesToStorage(favorites);
}

// Funktion för att rendera favoriter på sidan
export function renderFavorites() {
    const container = document.getElementById('cardContainer');
    if (!container) {
        console.error("Container för favoriter hittades inte.");
        return;
    }

    container.innerHTML = '';  // Rensa tidigare innehåll

    const favorites = getFavoritesFromStorage();
    if (favorites.length === 0) {
        container.innerHTML = "<p>Inga favoritfilmer än.</p>";
        console.log("Inga favoritfilmer att visa.");
        return;
    }

    favorites.forEach(movieData => {
        const card = createFavoriteCard(movieData);
        container.appendChild(card);
    });

    console.log("Renderade favoriter:", favorites);

    container.addEventListener('click', (event) => {
        if (event.target && event.target.closest('.favorite-btn')) {
            const card = event.target.closest('.movie-card');
            const imdbID = card.getAttribute('data-imdbid');
            removeFromFavorites(imdbID);  // Ta bort från favoriter
            card.remove();  // Ta bort kort från DOM
            console.log("Tog bort film från DOM och favoriter:", imdbID);
        }
    });
}

// Funktion för att ta bort film från favoriter
export function removeFromFavorites(imdbID) {
    let favorites = getFavoritesFromStorage();
    favorites = favorites.filter(movie => movie.imdbID !== imdbID);
    saveFavoritesToStorage(favorites);
    console.log("Tog bort film från favoriter:", imdbID);
}

// Funktion för att skapa kort för favoriter
export function createFavoriteCard(movieData) {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.setAttribute('data-imdbid', movieData.imdbID);

    card.innerHTML = `
        <img src="${movieData.Poster}" alt="${movieData.Title}" class="movie-poster">
        <h3>${movieData.Title}</h3>
        <button class="favorite-btn filled" aria-label="Remove ${movieData.Title} from favorites"><i class="fa fa-star"></i></button>
    `;

    // Lägg till klickhändelse för att navigera till movie.html
    card.addEventListener('click', (event) => {
        if (!event.target.closest('.favorite-btn')) {
            window.location.href = `movie.html?id=${movieData.imdbID}`;
        }
    });

    console.log("Skapade favoritkort för film:", movieData);

    return card;
}

// Rendera favoriter om användaren är på favoritsidan
if (window.location.pathname.includes('favorites.html')) {
    window.onload = renderFavorites;
}

// Uppdatera favoritknappens status beroende på om filmen är i favoriter
export function updateFavoriteButtonStatus(movie) {
    const favoriteButton = document.querySelector(`#movie-${movie.imdbID} .favorite-btn`);
    if (favoriteButton) {
        if (isMovieFavorite(movie.imdbID)) {
            favoriteButton.classList.add('filled');
            console.log("Film är favorit, fyllde stjärna:", movie.imdbID);
        } else {
            favoriteButton.classList.remove('filled');
            console.log("Film är inte favorit, tömde stjärna:", movie.imdbID);
        }
    }
}

// Kontrollera om filmen är en favorit
export function isMovieFavorite(imdbID) {
    const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    const isFavorite = favorites.some(movie => movie.imdbID === imdbID);
    console.log("Kontrollerade om film är favorit:", imdbID, isFavorite);
    return isFavorite;
}