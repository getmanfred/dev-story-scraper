import {HttpClient} from '../clients/httpClient';
import cheerio from 'cheerio';

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
