function getMovieIdFromUrl (url) {
  const regex = /title\/(.*)\/?/;
  const movieId = url.match(regex)[1];
  return movieId;
}

export default getMovieIdFromUrl;
