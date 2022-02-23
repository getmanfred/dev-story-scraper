import {CheerioAPI} from 'cheerio';
import * as _ from 'lodash';

import {Profile} from '../models/profile';
import {AboutMe} from '../models/aboutMe';
import {Avatar} from '../models/avatar';
import {Location} from '../models/location';
import {stringToInterestingFacts, stripString} from '../utils/utils';
import {Geocoder} from '../utils/geocoder';
import {Markdown} from '../utils/markdown';
import {InterestingFact} from '../models/interestingFact';

export class AboutMeParser {
  constructor(private readonly geocoder: Geocoder) {}

  async parse($: CheerioAPI): Promise<AboutMe> {
    const profile = await this.parseProfile($);
    const headline = stripString($('#form-section-PersonalInfo div.job').text() || '');
    const introduction = Markdown.fromHTML($('div.description span.description-content-full').html() || '');
    const interestingFacts = this.parseInterestingFacts($);

    return {
      profile,
      headline,
      introduction,
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

  private parseAvatar($: CheerioAPI): Avatar {
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
    return stringToInterestingFacts(toolsDefinition);
  }
}
