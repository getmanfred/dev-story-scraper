import {DevStoryScraper} from '../devStoryScraper';
import {MockDevStoryDownloader} from './mockDevStoryDownloader';
import {MockGeocoder} from './mockGeocoder';
import {mock} from 'jest-mock-extended';
import {HttpClient} from '../clients/httpClient';
import {CompanyUrlParser} from '../parsers/companyUrlParser';
import {JobParser} from '../parsers/jobParser';
import {readFileSync} from 'fs';

describe('A Dev Story scraper', () => {
  const httpClient = mock<HttpClient>();
  const companyUrlParser = new CompanyUrlParser(httpClient);
  const jobParser = new JobParser(companyUrlParser);
  const geocoder = new MockGeocoder();
  const downloader = new MockDevStoryDownloader(); // To prevent too many requests to Stack Overflows servers
  const scraper = new DevStoryScraper(downloader, geocoder, jobParser);

  it('should parse the dev story from Yeray', async () => {
    const html = readFileSync(`${__dirname}/html/fon.html`, 'utf8');
    httpClient.getHTML.mockResolvedValue(html);

    const result = await scraper.parse('ydarias');
    expect(result).toMatchSnapshot();
  });

  it('should parse the dev story from Joey deVilla', async () => {
    const html = readFileSync(`${__dirname}/html/fon.html`, 'utf8');
    httpClient.getHTML.mockResolvedValue(html);

    const result = await scraper.parse('joeydevilla');
    expect(result).toMatchSnapshot();
  });

  it('should parse the dev story from Ferran Buireu', async () => {
    const html = readFileSync(`${__dirname}/html/fon.html`, 'utf8');
    httpClient.getHTML.mockResolvedValue(html);

    const result = await scraper.parse('fbuireu');
    expect(result).toMatchSnapshot();
  });

  it('should parse open source projects from William Sorensen Dev Story', async () => {
    const html = readFileSync(`${__dirname}/html/fon.html`, 'utf8');
    httpClient.getHTML.mockResolvedValue(html);

    const result = await scraper.parse('truewill');
    expect(result).toMatchSnapshot();
  });
});
