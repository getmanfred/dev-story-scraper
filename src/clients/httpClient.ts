import {Logger} from '../utils/logger';
import axios, {AxiosError} from 'axios';
import {ProfileNotFoundException} from '../errors/profileNotFoundException';

export class HttpClient {
  async getHTML(url: string): Promise<string> {
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
