export const stripString = (input = ''): string => {
  return input.replace(/\s+/g, ' ').trim();
};
