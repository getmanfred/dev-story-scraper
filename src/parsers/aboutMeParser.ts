import cheerio, {CheerioAPI} from 'cheerio';
import * as _ from 'lodash';

import {Profile} from '../models/profile';
import {AboutMe} from '../models/aboutMe';
import {Image} from '../models/image';
import {Location} from '../models/location';
import {stripString} from '../utils/utils';
import {Geocoder} from '../utils/geocoder';
import {Markdown} from '../utils/markdown';
import {InterestingFact} from '../models/interestingFact';
import {RelevantLink} from '../models/relevantLink';
import {InterestingFactsParser} from './interestingFactsParser';
import {RelevantLinksParser} from './relevantLinksParser';
import {Bookmark} from '../models/bookmark';

export class AboutMeParser {
  constructor(private readonly geocoder: Geocoder) {}

  async parse($: CheerioAPI): Promise<AboutMe> {
    const profile = await this.parseProfile($);
    const relevantLinks = this.parseRelevantLinks($);
    const interestingFacts = this.parseInterestingFacts($);
    const recommendations = $('#form-section-Readings div.readings-item')
      .get()
      .map((e) => $(e).html() || '')
      .map((e) => DevStoryBookmarkParse.parse(e));

    return {
      profile,
      relevantLinks,
      interestingFacts,
      recommendations,
    };
  }

  private async parseProfile($: CheerioAPI): Promise<Profile> {
    const fullName = $('div[class="name"] h4').text().replace(/\s+/g, ' ');
    const name = _.head(fullName.split(' ')) || '';
    const surnames = _.tail(fullName.split(' ')).join(' ') || '';
    const title = stripString($('#form-section-PersonalInfo div.job').text() || '');
    const description = Markdown.fromHTML(
      $('header div.header-edit-section span.description-content-full').html() || '',
    );
    const avatar = this.parseAvatar($);
    const location = await this.parseLocation($);

    return {
      name,
      surnames,
      title,
      description,
      avatar,
      location,
    };
  }

  private parseAvatar($: CheerioAPI): Image {
    const link = $('div#form-section-PersonalInfo img')[0]?.attribs?.src || '';

    return {
      link,
    };
  }

  private async parseLocation($: CheerioAPI): Promise<Location> {
    const location = stripString($('div.d-flex.ai-center').text());

    return this.geocoder.geocode(location);
  }

  private parseInterestingFacts($: CheerioAPI): InterestingFact[] {
    const toolsDefinition = stripString($('div.tools').text());

    return InterestingFactsParser.parse(toolsDefinition);
  }

  private parseRelevantLinks($: CheerioAPI): RelevantLink[] {
    const links = $('div#form-section-PersonalInfo a.d-flex')
      .map((i, e) => {
        return $(e)[0]?.attribs?.href;
      })
      .filter((i, e) => e !== '')
      .get();

    return RelevantLinksParser.parse(links);
  }
}

export class DevStoryBookmarkParse {
  static parse(html: string): Bookmark {
    const $ = cheerio.load(html);

    const author = stripString($('.readings-item-author').text()).replace('by ', '');

    return {
      title: stripString($('.readings-item-title').text()),
      URL: $('.readings-item-title a').attr('href'),
      author: {
        name: _.head(author.split(' ')) || '',
        surnames: _.tail(author.split(' ')).join(' ') || '',
      },
      summary: Markdown.fromHTML($('.readings-item-summary .description-content-full').html() || ''),
    };
  }
}
