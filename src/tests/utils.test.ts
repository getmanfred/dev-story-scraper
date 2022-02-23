import {stringToInterestingFacts} from '../utils/utils';

describe('An interesting facts translator', () => {
  it('should return empty array if input is empty string', () => {
    const result = stringToInterestingFacts('');
    expect(result).toStrictEqual([]);
  });

  it('should return empty array if input is a simple string', () => {
    const result = stringToInterestingFacts('My simple string');
    expect(result).toStrictEqual([]);
  });

  it('should return empty array if input has no valid interesting fact nodes', () => {
    const result = stringToInterestingFacts('My simple string • My another string');
    expect(result).toStrictEqual([]);
  });

  it('should return the facts with right input', () => {
    const result = stringToInterestingFacts(
      'Favorite editor: Visual Studio Code • First computer: Macintosh Quadra 660AV',
    );
    expect(result).toStrictEqual([
      {
        topic: 'Favorite editor',
        fact: 'Visual Studio Code',
      },
      {
        topic: 'First computer',
        fact: 'Macintosh Quadra 660AV',
      },
    ]);
  });
});
