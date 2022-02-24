import {DatesParser} from '../parsers/datesParser';

describe('A dates parser', () => {
  describe('for periods', () => {
    it('should return start and end date for periods that are not current', () => {
      const result = DatesParser.parse('Feb 2018 → Feb 2022 (4 years)');
      expect(result).toStrictEqual(['2018-02-01', '2022-02-01']);
    });

    it('should return start but not end date for periods with current activity', () => {
      const result = DatesParser.parse('Feb 2018 → Current (4 years, 1 month)');
      expect(result).toStrictEqual(['2018-02-01', '']);
    });
  });

  describe('for simple dates', () => {
    it('should return start date', () => {
      const result = DatesParser.parse('Feb 2018');
      expect(result).toStrictEqual(['2018-02-01', '']);
    });
  });
});
