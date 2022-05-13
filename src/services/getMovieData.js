import fetch from 'node-fetch';

async function getMovieData (apiKey, movieId) {
  const res = await fetch(`https://imdb-api.com/en/API/Title/${apiKey}/${movieId}`);
  const {
    image,
    genreList,
    year,
    companies
  } = await res.json();

  return { image, genreList, year, companies };
}

export default getMovieData;
