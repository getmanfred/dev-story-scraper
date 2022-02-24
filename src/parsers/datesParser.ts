import * as _ from 'lodash';

export class DatesParser {
  /**
   * Given a Dev Story date like 'Feb 2018 → Current (4 years, 1 month)' it returns the
   * start date and end date.
   *
   * If one of the values is Current, returns empty string for that field.
   */
  static parse(input: string): [string, string] {
    const cleanedInput = input.replace(/\s+/, ' ').trim();
    const match = /(.*) → (.*?) (\(.*?\))/.exec(cleanedInput);
    if (match) {
      const startDate = this.toDate(match[1]);
      const endDate = this.toDate(match[2]);

      return [startDate, endDate];
    } else {
      const startDate = this.toDate(input);
      if (/\d{4}-\d{2}-\d{2}/.exec(startDate)) {
        return [startDate, ''];
      }
    }

    return ['', ''];
  }

  private static toDate(input: string): string {
    if (!input.includes(' ')) {
      return '';
    }

    const [month, year] = input.split(' ');
    return `${year}-${this.toMonth(month)}-01`;
  }

  private static toMonth(input: string): string {
    const months: {[month: string]: string} = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };

    if (!_.has(months, input)) {
      return '';
    }

    return months[input];
  }
}
