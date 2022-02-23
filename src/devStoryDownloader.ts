import axios from 'axios';

import {Logger} from './utils/logger';

export class DevStoryDownloader {
  async download(url: string): Promise<string> {
    const log = Logger.getInstance();
    log.info(`loading ${url}`);

    const response = await axios.get(url);

    log.debug(`${url} loaded`);

    return response.data;
  }
}
