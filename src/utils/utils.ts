const stripString = (input = ''): string => {
  return (
    input
      // .replace(/[\r\n]+/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );
};

export {stripString};
