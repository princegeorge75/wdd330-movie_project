const API_KEY = "b084988e2b186094afcc32885678dcd2"; // Replace with your TMDb API key
const movieContainer = document.getElementById('movie-container');
const searchInput = document.getElementById('search-input');
const movieModal = document.getElementById('movie-modal');
const modalPoster = document.getElementById('modal-poster');
const modalTitle = document.getElementById('modal-title');
const modalReleaseYear = document.getElementById('modal-release-year');
const modalOverview = document.getElementById('modal-overview');
const closeModalBtn = document.querySelector('.close-btn');
const viewToggleBtn = document.getElementById('view-toggle-btn');

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
    const moviePoster = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/200x300?text=No+Image';

    movieTile.innerHTML = `
      <img src="${moviePoster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
      <!-- Add to Watchlist Button -->
      <button class="add-to-watchlist" data-id="${movie.id}">Add to Watchlist</button>
    `;

    // Add event listener for adding the movie to the watchlist
    const addToWatchlistBtn = movieTile.querySelector('.add-to-watchlist');
    addToWatchlistBtn.addEventListener('click', () => addToWatchlist(movie));

    // Add hover effect and event listener for modal
    movieTile.addEventListener('mouseenter', () => {
      movieTile.style.transform = 'scale(1.05)';
      movieTile.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    });

    movieTile.addEventListener('mouseleave', () => {
      movieTile.style.transform = '';
      movieTile.style.boxShadow = '';
    });

    movieTile.addEventListener('click', () => openMovieModal(movie));

    movieContainer.appendChild(movieTile);
  });
}

// Function to open the movie modal
function openMovieModal(movie) {
  modalPoster.src = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';
  modalTitle.textContent = movie.title;
  modalReleaseYear.textContent = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  modalOverview.textContent = movie.overview || 'No overview available.';
  
  movieModal.style.display = 'flex';
}

// Function to close the movie modal
closeModalBtn.addEventListener('click', () => {
  movieModal.style.display = 'none';
});

// Fetch random movies initially
fetchMovies();

// Event listener for search input
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  fetchMovies(query); // Fetch movies based on search input
});

// Function to add a movie to the watchlist
function addToWatchlist(movie) {
  const watchlist = getWatchlist();
  
  // Check if the movie is already in the watchlist
  if (!watchlist.some(m => m.id === movie.id)) {
    watchlist.push(movie); // Add movie if not already in the watchlist
    saveWatchlist(watchlist);
  }
}

// Function to get movies from localStorage (if any)
function getWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  return watchlist;
}

// Function to save watchlist to localStorage
function saveWatchlist(watchlist) {
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

// Function to toggle between grid and list views
viewToggleBtn.addEventListener('click', () => {
  movieContainer.classList.toggle('list-view');
  const isListView = movieContainer.classList.contains('list-view');
  viewToggleBtn.textContent = isListView ? 'Switch to Grid View' : 'Switch to List View';
});
