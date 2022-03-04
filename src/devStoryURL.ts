export class DevStoryURL {
  static from(input: string): string {
    if (input.startsWith('https://stackoverflow.com/')) {
      return input;
    }

    if (/http(s)?:\/\//.exec(input)) {
      throw 'Not Stack Overflow URL';
    }

    return `https://stackoverflow.com/story/${input}`;
  }
}
