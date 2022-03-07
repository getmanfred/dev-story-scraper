import {APIGatewayProxyEvent, Handler} from 'aws-lambda';

import {DevStoryScraper} from './devStoryScraper';
import {MAC} from './models/mac';
import {Logger} from './utils/logger';
import {GoogleGeocoder} from './utils/geocoder';
import {TorDevStoryDownloader} from './downloader/torDevStoryDownloader';

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

// TODO to be removed once discarded the Lambda code
export const handler: Handler = async (event: APIGatewayProxyEvent) => {
  const log = Logger.getInstance();

  if (event.queryStringParameters && event.queryStringParameters['username']) {
    const username: string = event.queryStringParameters['username'];

    log.info(`scraping information from ${username}`);

    const downloader = new TorDevStoryDownloader();
    const geocoder = new GoogleGeocoder();
    const scraper = new DevStoryScraper(downloader, geocoder);
    const profile = await scraper.parse(username);

    return successResponse(profile);
  } else {
    return noUsernameResponse();
  }
};
