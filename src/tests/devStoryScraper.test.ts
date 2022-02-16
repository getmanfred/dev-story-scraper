import {DevStoryDownloader} from '../devStoryDownloader';
import {DevStoryScraper} from '../devStoryScraper';

describe('A Dev Story scraper', () => {
  const downloader = new DevStoryDownloader();
  const scraper = new DevStoryScraper(downloader);

  it('should parse a simple dev story', async () => {
    const result = await scraper.parse('ydarias');
    expect(result).toMatchSnapshot();
  });

  it('should parse a complex dev story', async () => {
    const result = await scraper.parse('joeydevilla');
    expect(result).toMatchSnapshot();
  });
});
