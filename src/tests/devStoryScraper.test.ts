import {DevStoryScraper} from '../devStoryScraper';
import {MockDevStoryDownloader} from './mockDevStoryDownloader';
import {MockGeocoder} from './mockGeocoder';

describe('A Dev Story scraper', () => {
  const geocoder = new MockGeocoder();
  const downloader = new MockDevStoryDownloader(); // To prevent too many requests to Stack Overflows servers
  const scraper = new DevStoryScraper(downloader, geocoder);

  it('should parse a simple dev story', async () => {
    const result = await scraper.parse('ydarias');
    expect(result).toMatchSnapshot();
  });

  it('should parse a complex dev story', async () => {
    const result = await scraper.parse('joeydevilla');
    expect(result).toMatchSnapshot();
  });
});
