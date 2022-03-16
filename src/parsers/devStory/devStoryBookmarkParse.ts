import {Author, Bookmark} from '../../models/bookmark';
import cheerio from 'cheerio';
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
    return authors.map((a) => {
      const [name, surnames] = asNameAndSurnames(a);
      return {
        name,
        surnames,
        title: 'Author',
      };
    });
  }
}
