import {CheerioAPI} from 'cheerio';
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

export class AboutMeParser {
  constructor(private readonly geocoder: Geocoder) {}

  async parse($: CheerioAPI): Promise<AboutMe> {
    const profile = await this.parseProfile($);
    const headline = stripString($('#form-section-PersonalInfo div.job').text() || '');
    const introduction = Markdown.fromHTML($('div.description span.description-content-full').html() || '');
    const relevantLinks = this.parseRelevantLinks($);
    const interestingFacts = this.parseInterestingFacts($);

    return {
      profile,
      headline,
      introduction,
      relevantLinks,
      interestingFacts,
    };
  }

  private async parseProfile($: CheerioAPI): Promise<Profile> {
    const fullName = $('div[class="name"] h4').text().replace(/\s+/g, ' ');
    const name = _.head(fullName.split(' ')) || '';
    const surnames = _.tail(fullName.split(' ')).join(' ') || '';
    const avatar = this.parseAvatar($);
    const whereILive = await this.parseLocation($);

    return {
      name,
      surnames,
      avatar,
      whereILive,
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
