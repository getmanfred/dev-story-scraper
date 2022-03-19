import {DevStoryScraper} from '../devStoryScraper';
import {MockGeocoder} from './mockGeocoder';
import {mock} from 'jest-mock-extended';
import {HttpClient} from '../clients/httpClient';
import {CompanyUrlParser} from '../parsers/companyUrlParser';
import {JobParser} from '../parsers/jobParser';
import {readFileSync} from 'fs';
import {DevStoryDownloader} from '../downloader/devStoryDownloader';
import {MAC} from '../models/mac';

describe('A Dev Story scraper', () => {
  const companyHttpClient = mock<HttpClient>();
  const companyUrlParser = new CompanyUrlParser(companyHttpClient);
  const jobParser = new JobParser(companyUrlParser);
  const geocoder = new MockGeocoder();
  const devStoryHttpClient = mock<HttpClient>();
  const devStoryDownloader = new DevStoryDownloader(devStoryHttpClient);
  const scraper = new DevStoryScraper(devStoryDownloader, geocoder, jobParser);

  beforeEach(() => {
    devStoryHttpClient.getHTML.mockReset();

    const html = readFileSync(`${__dirname}/html/fon.html`, 'utf8');
    companyHttpClient.getHTML.mockResolvedValue(html);
  });

  const parseFor = async (username: string): Promise<MAC> => {
    const html = readFileSync(`${__dirname}/html/${username}.html`, 'utf8');
    devStoryHttpClient.getHTML.calledWith(`https://stackoverflow.com/story/${username}`).mockResolvedValue(html);

    return scraper.parse(username);
  };

  it('should parse the dev story from Yeray', async () => {
    const result = await parseFor('ydarias');
    expect(result).toMatchSnapshot();
  });

  it('should parse the dev story from Joey deVilla', async () => {
    const result = await parseFor('joeydevilla');
    expect(result).toMatchSnapshot();
  });

  it('should parse the dev story from Ferran Buireu', async () => {
    const result = await parseFor('fbuireu');
    expect(result).toMatchSnapshot();
  });

  it('should parse open source projects from William Sorensen Dev Story', async () => {
    const result = await parseFor('truewill');
    expect(result).toMatchSnapshot();
  });

  it('should parse the dev story from Joey deVilla when embedded', async () => {
    const result = await parseFor('joeydevilla-inner');
    expect(result).toMatchSnapshot();
  });

  // Stack Overflow achievements with competences
  it('should parse the dev story from Martin Peck embedded', async () => {
    const result = await parseFor('martin-peck');
    expect(result).toMatchSnapshot();
  });

  // Timeline items without a publishing date
  it('should parse the dev story from Blanca embedded', async () => {
    const result = await parseFor('blanca');
    expect(result).toMatchSnapshot();
  });

  // Self employment positions
  it('should parse the dev story from Makoto', async () => {
    const result = await parseFor('makoto');
    expect(result).toMatchSnapshot();
  });

  // Public entity name separated by commas instead of At
  it('should parset the dev story from Jaydles', async () => {
    const result = await parseFor('jaydles');
    expect(result).toMatchSnapshot();
  });
});
