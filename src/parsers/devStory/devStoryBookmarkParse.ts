import * as _ from 'lodash';
import cheerio from 'cheerio';
import {Author, Bookmark} from '../../models/bookmark';
import {asNameAndSurnames, stripString} from '../../utils/utils';
import {Markdown} from '../../utils/markdown';

export class DevStoryBookmarkParse {
  static parse(html: string): Bookmark {
    const $ = cheerio.load(html);

    const authors = stripString($('.readings-item-author').text())
      .replace('by ', '')
      .split(/\s*,\s*|\sand\s/);

    return {
      title: stripString($('.readings-item-title').text()),
      type: 'reading',
      URL: $('.readings-item-title a').attr('href'),
      authors: this.toBookmarkAuthors(authors),
      summary: Markdown.fromHTML($('.readings-item-summary .description-content-full').html() || ''),
    };
  }

  private static toBookmarkAuthors(authors: string[]): Author[] {
    return authors.filter(DevStoryBookmarkParse.isNotEtAl).map((a) => {
      const [name, surnames] = asNameAndSurnames(a);
      return {
        name,
        surnames,
        title: 'Author',
      };
    });
  }

  private static isNotEtAl(name = ''): boolean {
    const etAlDictionary = ['et al', 'et al.', 'et ál', 'et ál.'];
    const trimmedName = name.trim().toLowerCase();
    return !_.includes(etAlDictionary, trimmedName);
  }
}
