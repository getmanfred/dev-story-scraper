import * as _ from 'lodash';

export const stripString = (input = ''): string => {
  return input.replace(/\s+/g, ' ').trim();
};

export const asNameAndSurnames = (input = ''): [string, string] => {
  const trimmedName = stripString(input);
  const lastDot = trimmedName.lastIndexOf('.');
  if (lastDot > 0) {
    return [trimmedName.slice(0, lastDot + 1).trim(), trimmedName.slice(lastDot + 1, trimmedName.length).trim()];
  }

  const inputComponents = input.split(' ');
  if (inputComponents.length > 1) {
    return [_.head(inputComponents) as string, _.tail(inputComponents).join(' ')];
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
