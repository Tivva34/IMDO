const Api_Key = "301ede5"; // API-nyckel
const Base_URL = "http://www.omdbapi.com/"; // Bas-URL för OMDB

// Hämta favoritfilmer från Jespers API
export function fetchFavoriteMovies() {
    console.log("Hämtar favoritfilmer från Jespers API...");
    return fetch("https://santosnr6.github.io/Data/favoritemovies.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-fel! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Hämtade favoritfilmer:", data);
            return data;
        })
        .catch(error => {
            console.error("Fel vid hämtning av favoritfilmer:", error);
            return []; // Returnera en tom array om ett fel uppstår
        });
}

// Hämta filmdetaljer från OMDB API
export function fetchMovieDetails(imdbID) {
    console.log(`Hämtar filmdetaljer för ID: ${imdbID}...`);
    return fetch(`${Base_URL}?i=${imdbID}&apikey=${Api_Key}&plot=full`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-fel! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.Response === "False") {
                throw new Error(`Film hittades inte: ${data.Error}`);
            }
            console.log("Hämtade filmdetaljer:", data);
            return data;
        })
        .catch(error => {
            console.error("Fel vid hämtning av filmdetaljer:", error);
            return null; // Returnera null om ett fel uppstår
        });
}

// Sök efter filmer baserat på en sökfråga i OMDB API
export function searchMovies(query) {
    console.log(`Söker efter filmer med sökfråga: "${query}"...`);
    return fetch(`${Base_URL}?apikey=${Api_Key}&s=${encodeURIComponent(query)}&page=1`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-fel! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.Response === "False") {
                console.warn(`Inga resultat hittades för sökfråga: "${query}"`);
                return [];
            }
            console.log("Sökresultat:", data.Search);
            return data.Search || []; // Returnera filmer om tillgängligt
        })
        .catch(error => {
            console.error("Fel vid sökning efter filmer:", error);
            return []; // Returnera en tom array om ett fel uppstår
        });
}

// Hämta topplistan över filmer från Jespers API
export function fetchTopMovies() {
    console.log("Hämtar topplistan över filmer från Jespers API...");
    return fetch("https://santosnr6.github.io/Data/favoritemovies.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-fel! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                console.log("Hämtade topplistan över filmer:", data);
                return data; // Returnera filmlistan om det är en array
            } else {
                console.warn("Inga filmer hittades.");
                return [];
            }
        })
        .catch(error => {
            console.error("Fel vid hämtning av topplistan över filmer:", error);
            return []; // Returnera en tom array om ett fel uppstår
        });
}