import { config } from 'dotenv';
import Cinema from './src/models/cinema.models.js';
import getMovieData from './src/services/getMovieData.js';
import getMovieIdFromUrl from './src/services/getMovieIdFromUrl.js';
config();

const { NOTION_KEY, NOTION_DATABASE_ID, IMDB_API_KEY } = process.env;

(async function () {
  const cinema = new Cinema(NOTION_KEY, NOTION_DATABASE_ID);
  const moviesWithoutData = await cinema.getMoviesWithoutData();

  for (const movie of moviesWithoutData) {
    const pageID = movie.id;
    const ImDbLink = movie.properties['IMDB Link'].url;

    const imdbID = getMovieIdFromUrl(ImDbLink);

    const props = await getMovieData(IMDB_API_KEY, imdbID);
    await cinema.updateMovieData(pageID, props);
  }
})();
