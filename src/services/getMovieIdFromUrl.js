function getMovieIdFromUrl (url) {
  const regex = /title\/(tt.*)\//;
  const movieId = url.match(regex);

  if (movieId) return movieId[1];

  return '';
}

export default getMovieIdFromUrl;
