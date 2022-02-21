import cheerio, {CheerioAPI} from 'cheerio';

import {Position} from '../models/position';
import {stripString} from '../utils/utils';
import {Markdown} from '../utils/markdown';

export class PositionParser {
  parse(html: string): Position {
    const $ = cheerio.load(html);
    const time = stripString($('span[class="timeline-item-date"]').text());
    const title = stripString($('div[class="timeline-item-title"]').text());
    const description = this.parseDescription($);
    const tags = $('.s-tag')
      .map((i, e) => stripString($(e).text()))
      .get();

    return {time, title, description, tags};
  }

  private parseDescription($: CheerioAPI): string {
    const description = $('.description-content-full').html() || '';
    return Markdown.fromHTML(description);
  }
}
