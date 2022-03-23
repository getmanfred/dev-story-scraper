import * as _ from 'lodash';
import moment from 'moment';

export const stripString = (input = ''): string => {
  if (_.isNil(input)) {
    return '';
  }
  return input.replace(/\s+/g, ' ').trim();
};

export const asNameAndSurnames = (input = ''): [string, string] => {
  const trimmedName = stripString(input);
  const lastDot = trimmedName.lastIndexOf('.');
  if (lastDot > 0) {
    return [trimmedName.slice(0, lastDot + 1).trim(), trimmedName.slice(lastDot + 1, trimmedName.length).trim()];
  }

  const inputComponents = trimmedName.split(' ');
  if (inputComponents.length > 1) {
    return [_.head(inputComponents) as string, _.tail(inputComponents).join(' ')];
  }

  if (trimmedName !== '') {
    return [trimmedName, trimmedName];
  }

  return ['', ''];
};

export const today = (): string => {
  return moment().format('YYYY-MM-DD');
};
