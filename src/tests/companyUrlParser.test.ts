import {mock} from 'jest-mock-extended';
import {readFileSync} from 'fs';

import {HttpClient} from '../clients/httpClient';
import {CompanyUrlParser} from '../parsers/companyUrlParser';

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
