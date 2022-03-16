import {DatesParser} from '../parsers/datesParser';

describe('A dates parser', () => {
  describe('for periods', () => {
    it('should return start and end date for periods that are not current for Februrary', () => {
      const result = DatesParser.parse('Feb 2018 → Feb 2022 (4 years)');
      expect(result).toStrictEqual(['2018-02-01', '2022-02-28']);
    });

    it('should return start and end date for periods that are not current for 31 days months', () => {
      const result = DatesParser.parse('Feb 2018 → Jan 2022 (4 years)');
      expect(result).toStrictEqual(['2018-02-01', '2022-01-31']);
    });

    it('should return start and end date for periods that are not current for 30 days months', () => {
      const result = DatesParser.parse('Feb 2018 → Apr 2022 (4 years, 2 month)');
      expect(result).toStrictEqual(['2018-02-01', '2022-04-30']);
    });

    it('should return start but not end date for periods with current activity', () => {
      const result = DatesParser.parse('Feb 2018 → Current (4 years, 1 month)');
      expect(result).toStrictEqual(['2018-02-01', '']);
    });
  });

  describe('for dates with only year', () => {
    it('should return end and start date', () => {
      const result = DatesParser.parse('2018 → 2022 (4 years)');
      expect(result).toStrictEqual(['2018-01-01', '2022-01-01']);
    });

    it('should return end and start date', () => {
      const result = DatesParser.parse('2018 → 2022');
      expect(result).toStrictEqual(['2018-01-01', '2022-01-01']);
    });

    it('should return end and start date', () => {
      const result = DatesParser.parse('2009');
      expect(result).toStrictEqual(['2009-01-01', '']);
    });
  });

  describe('for simple dates', () => {
    it('should return start date', () => {
      const result = DatesParser.parse('Feb 2018');
      expect(result).toStrictEqual(['2018-02-01', '']);
    });
  });
});
