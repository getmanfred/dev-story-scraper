import {Logger} from '../utils/logger';
import axios, {AxiosError} from 'axios';
import {DevStoryDownloader} from './devStoryDownloader';
import {ProfileNotFoundException} from '../errors/profileNotFoundException';

export class BasicDevStoryDownloader implements DevStoryDownloader {
  async download(source: string): Promise<string> {
    let url = `https://stackoverflow.com/story/${source}`;
    if (source.includes('https://')) {
      url = source;
    }

    const log = Logger.getInstance();
    log.info(`loading ${url}`);

    try {
      const response = await axios.get(url);

      log.debug(`${url} loaded`);

      return response.data;
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 404) {
        throw new ProfileNotFoundException();
      }

      log.error(e as AxiosError);

      throw e;
    }
  }
}
