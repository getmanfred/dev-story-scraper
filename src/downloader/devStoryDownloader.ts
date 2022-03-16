import {HttpClient} from '../clients/httpClient';

export class DevStoryDownloader {
  constructor(private readonly httpClient: HttpClient) {}

  async download(source: string): Promise<string> {
    let url = `https://stackoverflow.com/story/${source}`;
    if (source.includes('https://')) {
      url = source;
    }

    return this.httpClient.getHTML(url);
  }
}
