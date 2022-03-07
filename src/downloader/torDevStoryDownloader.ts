import {torSetup} from '../utils/torAxios';
import {Logger} from '../utils/logger';
import {DevStoryDownloader} from './devStoryDownloader';
import {AxiosError} from 'axios';
import {ProfileNotFoundException} from '../errors/profileNotFoundException';

export class TorDevStoryDownloader implements DevStoryDownloader {
  async download(source: string): Promise<string> {
    let url = `https://stackoverflow.com/story/${source}`;
    if (source.includes('https://')) {
      url = source;
    }

    const tor = torSetup('127.0.0.1', 9050);

    const log = Logger.getInstance();
    log.info(`loading ${url}`);

    try {
      const response = await tor.get(url);

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
