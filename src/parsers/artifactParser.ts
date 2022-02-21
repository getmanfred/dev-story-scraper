import cheerio, {CheerioAPI} from 'cheerio';

import {Artifact} from '../models/artifact';
import {stripString} from '../utils/utils';
import {Markdown} from '../utils/markdown';

export class ArtifactParser {
  parse(html: string): Artifact {
    const $ = cheerio.load(html);
    const type = stripString($('.timeline-item-type').text());
    const time = stripString($('.timeline-item-date').text());
    const title = stripString($('.timeline-item-title').text());
    const link = $('.timeline-item-title a').attr('href') || '';
    const description = this.parseDescription($);
    const tags = $('.s-tag')
      .map((i, e) => stripString($(e).text()))
      .get();

    return {type, time, title, link, description, tags};
  }

  private parseDescription($: CheerioAPI): string {
    const description = $('.description-content-full').html() || '';
    return Markdown.fromHTML(description);
  }
}
