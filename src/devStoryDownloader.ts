import axios from 'axios';
import {pino} from 'pino';

export class DevStoryDownloader {
  async download(url: string): Promise<string> {
    const log = pino({
      name: 'dev-story-scraper',
      level: 'debug',
    });

    log.info(`loading ${url}`);

    const response = await axios.get(url, {
      timeout: 6000,
    });

    log.debug(`${url} loaded`);

    return response.data;
  }
}
