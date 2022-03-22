export class DevStoryURL {
  static from(input = ''): string {
    const cleanedInput = input.toLowerCase().replace('www.stackoverflow.com', 'stackoverflow.com');

    if (cleanedInput.startsWith('https://stackoverflow.com/')) {
      return cleanedInput;
    }

    if (/http(s)?:\/\//.exec(cleanedInput)) {
      throw 'Not Stack Overflow URL';
    }

    return `https://stackoverflow.com/story/${cleanedInput}`;
  }
}
