import fetch from 'node-fetch';

async function searchMovieTitle (apiKey, movieTitle, limit = 1) {
  const res = await fetch(`https://imdb-api.com/en/API/SearchTitle/${apiKey}/${movieTitle}`);
  const { results } = await res.json();
  results.length = limit;

  return results;
}

export default searchMovieTitle;
