import fetch from 'node-fetch';

async function searchMovieTitle (apiKey, movieTitle, limit = 1) {
  const API_URL = `https://imdb-api.com/en/API/SearchTitle/${apiKey}/${movieTitle}`;
  console.log(API_URL);
  const res = await fetch(API_URL);
  console.log(res);
  const { results } = await res.json();
  results.length = limit;

  return results;
}

export default searchMovieTitle;
