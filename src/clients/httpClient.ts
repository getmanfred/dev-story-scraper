import {Logger} from '../utils/logger';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {ProfileNotFoundException} from '../errors/profileNotFoundException';
import {HttpsProxyAgent} from 'https-proxy-agent';

export class HttpClient {
  async getHTML(url: string): Promise<string> {
    const log = Logger.getInstance();

    log.info(`loading ${url}`);

    try {
      const response = await axios.get(url, this.getAxiosConfiguration());

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

  private getAxiosConfiguration(): AxiosRequestConfig {
    const log = Logger.getInstance();

    const proxy = process.env.SO_PROXY;
    if (proxy) {
      log.debug('Using proxy configured as env var');
      return {
        proxy: false,
        httpsAgent: new HttpsProxyAgent(proxy),
      };
    }

    return {};
  }
}
