// Funktion för att rendera element i en container
export function renderElements(container, elements) {
    if (!container) {
        console.error("Container hittades inte.");
        return;
    }
    container.innerHTML = '';
    elements.forEach(element => container.appendChild(element));
}

// Funktion för att rendera filmdetaljer
export function renderMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movieDetails');
    if (!movieDetailsContainer) {
        console.error("Container för filmdetaljer hittades inte.");
        return;
    }

    movieDetailsContainer.innerHTML = `
        <h2>${movie.Title}</h2>
        <img src="${movie.Poster}" alt="${movie.Title}">
        <p><strong>Handling:</strong> ${movie.Plot}</p>
        <p><strong>År:</strong> ${movie.Year}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Regissör:</strong> ${movie.Director}</p>
        <p><strong>Skådespelare:</strong> ${movie.Actors}</p>
        <p><strong>IMDB Betyg:</strong> ${movie.imdbRating}</p>
    `;
}

// Funktion för att initiera sökformuläret
export function initSearchForm() {
    const searchForm = document.getElementById('searchForm');
    if (!searchForm) {
        console.error("Sökformulär hittades inte.");
        return;
    }

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value.trim()) {
            window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
        }
    });
}