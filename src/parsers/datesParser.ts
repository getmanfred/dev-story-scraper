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
    const match = /^([a-zA-Z]*\s*\d{4})( → )?([a-zA-Z]*\s*\d{4}|Current)?( \(.*?\))?$/.exec(cleanedInput);
    if (match) {
      const startDate = this.toDate(match[1]);
      const endDate = this.toFinishDate(match[3] || '');

      return [startDate, endDate];
    }

    return ['', ''];
  }

  private static toDate(input: string): string {
    if (input === 'Current' || input === '') {
      return '';
    }

    if (/^\d{4}$/.exec(input)) {
      return `${input}-01-01`;
    }

    const [month, year] = input.split(' ');
    return `${year}-${this.toMonth(month)}-01`;
  }

  private static toFinishDate(input: string): string {
    if (input === 'Current' || input === '') {
      return '';
    }

    if (/^\d{4}$/.exec(input)) {
      return `${input}-01-01`;
    }

    const [month, year] = input.split(' ');
    return `${year}-${this.toMonth(month)}-${this.toFinishDay(month)}`;
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

  private static toFinishDay(input: string): string {
    const months: {[month: string]: string} = {
      Jan: '31',
      Feb: '28',
      Mar: '31',
      Apr: '30',
      May: '31',
      Jun: '30',
      Jul: '31',
      Aug: '31',
      Sep: '30',
      Oct: '31',
      Nov: '30',
      Dec: '31',
    };

    if (!_.has(months, input)) {
      return '';
    }

    return months[input];
  }
}
