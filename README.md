# IMDO – My Movie Database

IMDO is a school assignment where I built a movie browsing web app inspired by IMDb. The app lets users browse recommended movies, search for movies, view detailed movie information, watch trailer sections, and save favorite movies locally in the browser.

## Features

- Browse recommended movies on the start page
- Search for movies by title
- View movie details on a separate movie page
- Save and remove favorite movies
- Favorites are stored with `localStorage`
- Dynamic movie cards created with JavaScript
- Modular JavaScript structure
- Responsive layout with HTML and CSS

## Tech Stack

- HTML
- CSS
- JavaScript ES Modules
- OMDb API
- localStorage
- Live Server

## Installation

Clone the repository:

git clone https://github.com/Tivva34/IMDO.git

Go into the project folder:

cd IMDO

Install dependencies:

npm install

Start the project:

npm run dev

The app will open with Live Server.


## How It Works

The app uses JavaScript modules to separate functionality into smaller files. API functions handle movie data, components create reusable movie cards, and utility files help render content to the page.

Movie data is fetched from OMDb and a provided movie JSON source. Favorite movies are saved in the browser using localStorage, so they remain available after refreshing the page.

---

Pages
index.html – start page with movie recommendations
search.html – displays search results
movie.html – shows detailed information about a selected movie
favorites.html – shows saved favorite movies
What I Learned

---

During this project I practiced:

Fetching data from an external API
Working with asynchronous JavaScript
Structuring code with ES modules
Creating reusable components
Updating the DOM dynamically
Saving data in localStorage
Building a multi-page frontend project

Author Tim Verlage as a school assignment.
