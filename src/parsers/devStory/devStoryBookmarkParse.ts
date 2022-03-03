import {Bookmark} from '../../models/bookmark';
import cheerio from 'cheerio';
import {stripString} from '../../utils/utils';
import * as _ from 'lodash';
import {Markdown} from '../../utils/markdown';

export class DevStoryBookmarkParse {
  static parse(html: string): Bookmark {
    const $ = cheerio.load(html);

    const authors = stripString($('.readings-item-author').text()).replace('by ', '');
    const firstAuthor = authors.split(/\s*,\s*|\sand\s/)[0];

    return {
      title: stripString($('.readings-item-title').text()),
      URL: $('.readings-item-title a').attr('href'),
      author: {
        name: _.head(firstAuthor.split(' ')) || '',
        surnames: _.tail(firstAuthor.split(' ')).join(' ') || '',
        title: 'Author',
      },
      summary: Markdown.fromHTML($('.readings-item-summary .description-content-full').html() || ''),
    };
  }
}
