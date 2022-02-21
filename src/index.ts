import {APIGatewayProxyEvent, Handler} from 'aws-lambda';
import {pino} from 'pino';

import {DevStoryDownloader} from './devStoryDownloader';
import {DevStoryScraper} from './devStoryScraper';
import {ProfileData} from './models/profileData';

const successResponse = (profile: ProfileData) => ({
  statusCode: 200,
  body: JSON.stringify(profile),
});

const noUsernameResponse = () => ({
  statusCode: 400,
  body: {
    error: 'A username is required',
  },
});

export const handler: Handler = async (event: APIGatewayProxyEvent) => {
  const log = pino({
    name: 'dev-story-scraper',
    level: 'debug',
  });

  if (event.queryStringParameters && event.queryStringParameters['username']) {
    const username: string = event.queryStringParameters['username'];

    log.info(`scraping information from ${username}`);

    const downloader = new DevStoryDownloader();
    const scraper = new DevStoryScraper(downloader);
    const profile = await scraper.parse(username);

    return successResponse(profile);
  } else {
    return noUsernameResponse();
  }
};
