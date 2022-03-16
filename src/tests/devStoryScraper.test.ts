import {DevStoryScraper} from '../devStoryScraper';
import {MockDevStoryDownloader} from './mockDevStoryDownloader';
import {MockGeocoder} from './mockGeocoder';

describe('A Dev Story scraper', () => {
  const geocoder = new MockGeocoder();
  const downloader = new MockDevStoryDownloader(); // To prevent too many requests to Stack Overflows servers
  const scraper = new DevStoryScraper(downloader, geocoder);

  it('should parse the dev story from Yeray', async () => {
    const result = await scraper.parse('ydarias');
    expect(result).toMatchSnapshot();
  });

  it('should parse the dev story from Joey deVilla', async () => {
    const result = await scraper.parse('joeydevilla');
    expect(result).toMatchSnapshot();
  });

  it('should parse the dev story from Ferran Buireu', async () => {
    const result = await scraper.parse('fbuireu');
    expect(result).toMatchSnapshot();
  });

  it('should parse open source projects from William Sorensen Dev Story', async () => {
    const result = await scraper.parse('truewill');
    expect(result).toMatchSnapshot();
  });
});
