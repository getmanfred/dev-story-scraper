import {DevStoryURL} from '../devStoryURL';

describe('The Dev Story URL tool', () => {
  it('should generate the valid URL given a username', () => {
    const url = DevStoryURL.from('ydarias');
    expect(url).toBe('https://stackoverflow.com/story/ydarias');
  });

  it('should return the input for dev story URLs', () => {
    const url = DevStoryURL.from('https://stackoverflow.com/story/foo');
    expect(url).toBe('https://stackoverflow.com/story/foo');
  });

  it('should return the input for private dev story URLs', () => {
    const url = DevStoryURL.from('https://stackoverflow.com/users/story/5585371');
    expect(url).toBe('https://stackoverflow.com/users/story/5585371');
  });

  it('should throw an error if given a URL different from Stack Overflow domain', () => {
    expect(() => {
      DevStoryURL.from('https://twitter.com/ydarias');
    }).toThrow();
  });
});
