import { config } from 'dotenv';
import Cinema from './src/models/cinema.models.js';
import getMovieData from './src/services/getMovieData.js';
import getMovieIdFromUrl from './src/services/getMovieIdFromUrl.js';
import searchMovieTitle from './src/services/searchMovieTitle.js';
config();

const { NOTION_KEY, NOTION_DATABASE_ID, IMDB_API_KEY } = process.env;

(async function () {
  const cinema = new Cinema(NOTION_KEY, NOTION_DATABASE_ID);
  const moviesWithoutData = await cinema.getMoviesWithoutData();

  for (const movie of moviesWithoutData) {
    const pageID = movie.id;
    const PropsId = [movie.properties['IMDB Link'].id];
    let imdbId;

    cinema.getPageProperties(pageID, PropsId)
      .then(async (value) => {
        const ImDbLink = value[0].url;
        if (!ImDbLink) {
          const movieTitle = movie.properties.Name.title[0].plain_text;
          const results = await searchMovieTitle(IMDB_API_KEY, movieTitle);
          imdbId = results[0].id;
        } else imdbId = getMovieIdFromUrl(ImDbLink);

        const props = await getMovieData(IMDB_API_KEY, imdbId);
        await cinema.updateMovieData(pageID, props);
      }
      );
  }
})();
