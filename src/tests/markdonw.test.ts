import {Markdown} from '../utils/markdown';

describe('The Markdown utils', () => {
  it('should return empty if received empty', () => {
    const result = Markdown.fromHTML('');
    expect(result).toBe('');
  });
});
