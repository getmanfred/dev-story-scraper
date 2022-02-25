import {APIGatewayProxyEvent, Handler} from 'aws-lambda';

import {DevStoryDownloader} from './devStoryDownloader';
import {DevStoryScraper} from './devStoryScraper';
import {MAC} from './models/mac';
import {Logger} from './utils/logger';
import {GoogleGeocoder} from './utils/geocoder';

const successResponse = (mac: MAC) => ({
  statusCode: 200,
  body: JSON.stringify(mac),
});

const noUsernameResponse = () => ({
  statusCode: 400,
  body: {
    error: 'A username is required',
  },
});

export const handler: Handler = async (event: APIGatewayProxyEvent) => {
  const log = Logger.getInstance();

  if (event.queryStringParameters && event.queryStringParameters['username']) {
    const username: string = event.queryStringParameters['username'];

    log.info(`scraping information from ${username}`);

    const downloader = new DevStoryDownloader();
    const geocoder = new GoogleGeocoder();
    const scraper = new DevStoryScraper(downloader, geocoder);
    const profile = await scraper.parse(username);

    return successResponse(profile);
  } else {
    return noUsernameResponse();
  }
};
