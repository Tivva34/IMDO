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
        <div class="movie-details-wrapper">
            <div class="movie-details-image">
                <img src="${movie.Poster}" alt="${movie.Title}">
            </div>
            <div class="movie-details-info">
                <h2>${movie.Title}</h2>
                <div class="movie-details-meta">
                    <div class="meta-item">
                        <span class="meta-label">År</span>
                        <span class="meta-value">${movie.Year}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">IMDB Betyg</span>
                        <span class="meta-value">${movie.imdbRating}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Genre</span>
                        <span class="meta-value">${movie.Genre}</span>
                    </div>
                </div>
                <div class="movie-details-content-section">
                    <h3>Handling</h3>
                    <p>${movie.Plot}</p>
                </div>
                <div class="movie-details-content-section">
                    <h3>Regissör</h3>
                    <p>${movie.Director}</p>
                </div>
                <div class="movie-details-content-section">
                    <h3>Skådespelare</h3>
                    <p>${movie.Actors}</p>
                </div>
            </div>
        </div>
    `;
}

// Funktion för att initiera sökformuläret
export function initSearchForm() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (!searchForm || !searchInput || !searchBtn) {
        console.error("Sökformulär, input eller knapp hittades inte.");
        return;
    }

    // The same compact, always-visible form is used on every screen size.
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    });

}
