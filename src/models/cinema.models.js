import { Client } from '@notionhq/client';

class Cinema {
  constructor (NOTION_KEY, DATABASE_ID) {
    this.notion = new Client({ auth: NOTION_KEY });
    this.DATABASE_ID = DATABASE_ID;
  }

  async getMoviesWithoutData () {
    const response = await this.notion.databases.query({
      database_id: this.DATABASE_ID,
      filter: {
        property: 'isFilled',
        checkbox: {
          equals: false
        }
      }
    }
    );
    return response.results;
  }

  async updateMovieData (pageID, { ...properties }) {
    const { image, genreList, year, companies } = properties;
    await this.notion.pages.update({
      page_id: pageID,
      cover: {
        type: 'external',
        external: {
          url: image
        }
      },
      properties: {
        Premiere: {
          number: parseInt(year)
        },
        By: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: `${companies}`
              }
            }
          ]
        },
        Genre: {
          multi_select: [
            ...genreList.map(({ value }) => { return { name: value }; })
          ]
        },
        isFilled: {
          checkbox: true
        }
      }
    });
  }
}

export default Cinema;
