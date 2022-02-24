import cheerio, {CheerioAPI} from 'cheerio';

import {DevStoryArtifact} from '../../models/devStory/devStoryArtifact';
import {stripString} from '../../utils/utils';
import {Markdown} from '../../utils/markdown';

export class DevStoryArtifactParser {
  static parse(html: string): DevStoryArtifact {
    const $ = cheerio.load(html);
    const type = stripString($('.timeline-item-type').text());
    const time = stripString($('.timeline-item-date').text());
    const title = stripString($('.timeline-item-title').text());
    const url = $('.timeline-item-title a').attr('href') || '';
    const description = this.parseDescription($);
    const [logo, logoAlt] = this.parseLogo($);
    const tags = $('.s-tag')
      .map((i, e) => stripString($(e).text()))
      .get();

    return {type, time, title, url: url, description, tags, logo, logoAlt};
  }

  // This method seems duplicated but it could change separately from the Position logo parsing logic
  private static parseLogo($: CheerioAPI): [string, string] {
    const logoNode = $('.timeline-item-content img')[0];
    if (!logoNode) {
      return ['', ''];
    }

    const logoSrc = logoNode.attribs.src;
    const logoAlt = logoNode.attribs.alt;

    return [logoSrc, logoAlt];
  }

  private static parseDescription($: CheerioAPI): string {
    const description = $('.description-content-full').html() || '';
    return Markdown.fromHTML(description);
  }
}
