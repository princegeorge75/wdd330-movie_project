const API_KEY = "YOUR_API_KEY"; // Replace with your TMDb API key
const movieContainer = document.getElementById('movie-container');
const searchInput = document.getElementById('search-input');

// Function to fetch random movies
async function fetchMovies(query = '') {
  let url;
  if (query) {
    // If the user is searching for a movie
    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`;
  } else {
    // If no search term, show random movies
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}

// Function to display movies in tiles
function displayMovies(movies) {
  movieContainer.innerHTML = ''; // Clear existing movies
  if (movies.length === 0) {
    movieContainer.innerHTML = '<p>No movies found.</p>';
    return;
  }
  movies.forEach(movie => {
    const movieTile = document.createElement('div');
    movieTile.classList.add('movie-tile');
    const moviePoster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';

    movieTile.innerHTML = `
      <img src="${moviePoster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
    `;
    movieContainer.appendChild(movieTile);
  });
}

// Fetch random movies initially
fetchMovies();

// Event listener for search input
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  fetchMovies(query); // Fetch movies based on search input
});
