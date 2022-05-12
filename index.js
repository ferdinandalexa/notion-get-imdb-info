import { config } from 'dotenv';
import fetch from 'node-fetch';
import Cinema from './src/models/cinema.models.js';
config();

const { NOTION_KEY, NOTION_DATABASE_ID, IMDB_API_KEY } = process.env;

(async function () {
  const cinema = new Cinema(NOTION_KEY, NOTION_DATABASE_ID);
  const moviesWithoutData = await cinema.getMoviesWithoutData();

  for (const movie of moviesWithoutData) {
    const pageID = movie.id;
    const IMDBLink = movie.properties['IMDB Link'].url;

    const regex = /title\/(.*)/;
    const imdbID = IMDBLink.match(regex)[1];

    const response = await fetch(`https://imdb-api.com/en/API/Title/${IMDB_API_KEY}/${imdbID}`);
    const { image, genreList, year, companies } = await response.json();
    const properties = { image, genreList, year, companies };
    await cinema.updateMovieData(pageID, properties);
  }
})();
