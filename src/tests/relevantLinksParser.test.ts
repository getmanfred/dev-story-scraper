import {RelevantLinksParser} from '../parsers/relevantLinksParser';

describe('A relevants link parser', () => {
  it('should detect special links', () => {
    const links = [
      'https://www.linkedin.com/in/ydarias/',
      'https://twitter.com/ydarias',
      'https://github.com/ydarias',
      'http://myblog.com/foo',
    ];
    const result = RelevantLinksParser.parse(links);

    expect(result).toStrictEqual([
      {
        type: 'linkedin',
        URL: 'https://www.linkedin.com/in/ydarias/',
      },
      {
        type: 'twitter',
        URL: 'https://twitter.com/ydarias',
      },
      {
        type: 'github',
        URL: 'https://github.com/ydarias',
      },
      {
        type: 'other',
        URL: 'http://myblog.com/foo',
      },
    ]);
  });
});
