const tmdbKey = '5a10d1c1bda53215721a1101a89f026b';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
        const jsonResponse = await response.json();
        const genres = jsonResponse.genres;
        return genres;
    }
    
  } 
  
  catch (err) {
    console.log(err)
  }
 
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
 
  try {
     const response =  await fetch(urlToFetch);
     if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        const movies = jsonResponse.results;
        return movies;
     }
  }
  catch (err) {
    console.log(err)
  }
};



const getMovieInfo = async (movie) => {
   const movieId = movie.id;
   const movieEndpoint = `/movie/${movieId}`;
   const requestParams = `?api_key=${tmdbKey}`;
   const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

   try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        const movieInfo = jsonResponse;
        console.log(movieInfo);
        return movieInfo;
      }
   }
   catch (err) {
    console.log(err)
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies =  await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;