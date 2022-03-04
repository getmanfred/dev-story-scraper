import axios from 'axios';

import {Logger} from './utils/logger';

export class DevStoryDownloader {
  async download(source: string): Promise<string> {
    let url = `https://stackoverflow.com/story/${source}`;
    if (source.includes('https://')) {
      url = source;
    }

    const log = Logger.getInstance();
    log.info(`loading ${url}`);

    const response = await axios.get(url);

    log.debug(`${url} loaded`);

    return response.data;
  }
}
