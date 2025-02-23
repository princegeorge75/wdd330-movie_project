// Function to get the watchlist from localStorage
function getWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    return watchlist;
  }
  
  // Function to save the watchlist to localStorage
  function saveWatchlist(watchlist) {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }
  
  // Function to display the watchlist
  function displayWatchlist() {
    const watchlist = getWatchlist();
    const watchlistContainer = document.getElementById('watchlist-container');
    watchlistContainer.innerHTML = ''; // Clear existing content
  
    if (watchlist.length === 0) {
      watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
      return;
    }
  
    watchlist.forEach(movie => {
      const movieTile = document.createElement('div');
      movieTile.classList.add('movie-tile');
      const moviePoster = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/200x300?text=No+Image';
  
      movieTile.innerHTML = `
        <img src="${moviePoster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
        <button class="remove-from-watchlist" data-id="${movie.id}">Remove from Watchlist</button>
      `;
  
      // Add event listener for removing movie from watchlist
      const removeFromWatchlistBtn = movieTile.querySelector('.remove-from-watchlist');
      removeFromWatchlistBtn.addEventListener('click', () => removeFromWatchlist(movie.id));
  
      watchlistContainer.appendChild(movieTile);
    });
  }
  
  // Function to remove a movie from the watchlist
  function removeFromWatchlist(movieId) {
    let watchlist = getWatchlist();
    watchlist = watchlist.filter(movie => movie.id !== movieId); // Remove movie by ID
    saveWatchlist(watchlist);
    displayWatchlist(); // Re-render watchlist
  }
  
  // Display the watchlist when the page loads
  displayWatchlist();

  // Function to get the watchlist from localStorage
function getWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    return watchlist;
  }
  
  // Function to save the watchlist to localStorage
  function saveWatchlist(watchlist) {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }
  
  // Function to display the watchlist
  function displayWatchlist() {
    const watchlist = getWatchlist();
    const watchlistContainer = document.getElementById('watchlist-container');
    watchlistContainer.innerHTML = ''; // Clear existing content
  
    if (watchlist.length === 0) {
      watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
      return;
    }
  
    watchlist.forEach(movie => {
      const movieTile = document.createElement('div');
      movieTile.classList.add('movie-tile');
      const moviePoster = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/200x300?text=No+Image';
  
      movieTile.innerHTML = `
        <img src="${moviePoster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
        <button class="remove-from-watchlist" data-id="${movie.id}">Remove from Watchlist</button>
      `;
  
      // Add event listener for removing movie from watchlist
      const removeFromWatchlistBtn = movieTile.querySelector('.remove-from-watchlist');
      removeFromWatchlistBtn.addEventListener('click', () => removeFromWatchlist(movie.id));
  
      watchlistContainer.appendChild(movieTile);
    });
  }
  
  // Function to remove a movie from the watchlist
  function removeFromWatchlist(movieId) {
    let watchlist = getWatchlist();
    watchlist = watchlist.filter(movie => movie.id !== movieId); // Remove movie by ID
    saveWatchlist(watchlist);
    displayWatchlist(); // Re-render watchlist
  }
  
  // Handle toggling between grid and list views
  let isGridView = true; // Default to grid view
  const toggleViewBtn = document.getElementById('toggle-view-btn');
  const watchlistContainer = document.getElementById('watchlist-container');
  
  toggleViewBtn.addEventListener('click', () => {
    isGridView = !isGridView;
    
    // Toggle class based on the view mode
    if (isGridView) {
      watchlistContainer.classList.remove('list-view');
      toggleViewBtn.textContent = 'List View';
    } else {
      watchlistContainer.classList.add('list-view');
      toggleViewBtn.textContent = 'Grid View';
    }
  
    // Re-render the watchlist to apply the current view mode
    displayWatchlist();
  });
  
  // Display the watchlist when the page loads
  displayWatchlist();
  
  