import cheerio from 'cheerio';
import * as _ from 'lodash';

import {DevStoryDownloader} from './devStoryDownloader';
import {MAC} from './models/mac';
import {Logger} from './utils/logger';
import {Settings} from './models/settings';
import {AboutMeParser} from './parsers/aboutMeParser';
import {Geocoder} from './utils/geocoder';
import {ExperienceParser} from './parsers/experienceParser';

export class DevStoryScraper {
  aboutMeParser: AboutMeParser;
  experienceParser: ExperienceParser;

  constructor(private readonly downloader: DevStoryDownloader, geocoder: Geocoder) {
    this.aboutMeParser = new AboutMeParser(geocoder);
    // These parsers could be static, but declared here to keep code coherence
    this.experienceParser = new ExperienceParser();
  }

  async parse(username: string): Promise<MAC> {
    const log = Logger.getInstance();

    const url = `https://stackoverflow.com/story/${username}`;
    const profileAsHTML = await this.downloader.download(url);

    const startTime = new Date().getTime();

    const $ = cheerio.load(profileAsHTML);

    const settings = this.defaultSettings();
    const aboutMe = await this.aboutMeParser.parse($);
    const experience = this.experienceParser.parse($);

    const likedTechnologies = $('div[class="user-technologies"] .timeline-item-tags .post-tag')
      .not('.disliked-tag')
      .map((i, e) => $(e).text())
      .get();

    const dislikedTechnologies = $('div[class="user-technologies"] .timeline-item-tags .disliked-tag')
      .map((i, e) => $(e).text())
      .get();

    const elapsed = new Date().getTime() - startTime;
    log.debug(`${username} profile parsed in ${elapsed}ms`);

    return _.omitBy(
      {
        settings,
        aboutMe,
        experience,
        //---
        likedTechnologies,
        dislikedTechnologies,
      },
      (e) => _.isNil(e) || _.isEmpty(e),
    ) as MAC;
  }

  private defaultSettings(): Settings {
    return {
      language: 'EN',
      MACversion: '0.2',
    };
  }
}
