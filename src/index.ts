import {DevStoryDownloader} from './devStoryDownloader';
import {DevStoryScraper} from './devStoryScraper';

export const handler = async (): Promise<any> => {
  const downloader = new DevStoryDownloader();
  const scraper = new DevStoryScraper(downloader);
  const output = await scraper.parse('ydarias');

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(output),
  };
};
