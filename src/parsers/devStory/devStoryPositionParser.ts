import cheerio, {CheerioAPI} from 'cheerio';

import {DevStoryPosition} from '../../models/devStory/devStoryPosition';
import {stripString} from '../../utils/utils';
import {Markdown} from '../../utils/markdown';

export class DevStoryPositionParser {
  parse(html: string): DevStoryPosition {
    const $ = cheerio.load(html);
    const time = stripString($('span[class="timeline-item-date"]').text());
    const title = stripString($('div[class="timeline-item-title"]').text());
    const url = this.parseURL($);
    const description = this.parseDescription($);
    const [logo, logoAlt] = this.parseLogo($);
    const tags = $('.s-tag')
      .map((i, e) => stripString($(e).text()))
      .get();

    return {time, title, url, description, tags, logo, logoAlt};
  }

  private parseURL($: CheerioAPI): string {
    const urlNode = $('.timeline-item-title a')[0];
    if (!urlNode) {
      return '';
    }

    return urlNode.attribs.href;
  }

  private parseLogo($: CheerioAPI): [string, string] {
    const logoNode = $('.timeline-item-content img.js-list-img')[0];
    if (!logoNode) {
      return ['', ''];
    }

    const logoSrc = logoNode.attribs.src;
    const logoAlt = logoNode.attribs.alt;

    return [logoSrc, logoAlt];
  }

  private parseDescription($: CheerioAPI): string {
    const description = $('.description-content-full').html() || '';
    return Markdown.fromHTML(description);
  }
}
