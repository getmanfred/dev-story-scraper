export const stripString = (input = ''): string => {
  return input.replace(/\s+/g, ' ').trim();
};

export const asNameAndSurnames = (input = ''): [string, string] => {
  const trimmedName = stripString(input);
  const match = /^(\w*(\s*\w{1}\.)*)\s+(.*?)$/g.exec(trimmedName);
  if (match) {
    return [match[1], match[3]];
  }

  if (input !== '') {
    return [input, input];
  }

  return ['', ''];
};

export const today = (): string => {
  const pad = (input: number): string => {
    if (input < 10) {
      return `0${input}`;
    }

    return `${input}`;
  };

  const d = new Date();

  return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
};
