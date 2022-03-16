import {mock} from 'jest-mock-extended';
import {readFileSync} from 'fs';
import cheerio from 'cheerio';
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

export class CompanyUrlParser {
  constructor(private readonly httpClient: HttpClient) {}

  async parseFrom(url: string): Promise<string> {
    if (url.includes('stackoverflow.com')) {
      const html = await this.httpClient.getHTML(url);
      const $ = cheerio.load(html);

      return $('.team-summary .-details a').get()[0]?.attribs?.href || url;
    }

    return url;
  }
}

describe('A company URL parser', () => {
  const httpClient = mock<HttpClient>();
  const urlParser = new CompanyUrlParser(httpClient);

  it('should return the given URL if it is not a Stack Overflow domain', async () => {
    expect(await urlParser.parseFrom('http://google.com')).toBe('http://google.com');
  });

  it('should return the actual URL from the given HTML if it is a Stack Overflow domain', async () => {
    const url = 'https://stackoverflow.com/users/story/lists/348524/fon-technology?storyType=1';
    const html = readFileSync(`${__dirname}/html/fon.html`, 'utf8');

    httpClient.getHTML.calledWith(url).mockResolvedValue(html);

    expect(await urlParser.parseFrom(url)).toBe('http://www.fon.com');
  });
});
