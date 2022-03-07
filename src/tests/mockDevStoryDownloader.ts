import {readFileSync} from 'fs';

import {DevStoryDownloader} from '../downloader/devStoryDownloader';

export class MockDevStoryDownloader implements DevStoryDownloader {
  async download(url: string): Promise<string> {
    const user = url.split('/').reverse().shift();
    const path = `${__dirname}/html/${user}.html`;

    return readFileSync(path, 'utf8');
  }
}
