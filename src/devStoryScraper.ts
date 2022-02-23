import cheerio from 'cheerio';
import * as _ from 'lodash';

import {DevStoryDownloader} from './devStoryDownloader';
import {MAC} from './models/mac';
import {PositionParser} from './parsers/positionParser';
import {ArtifactParser} from './parsers/artifactParser';
// import {stripString} from './utils/utils';
import {Logger} from './utils/logger';
import {Settings} from './models/settings';
import {AboutMeParser} from './parsers/aboutMeParser';
import {Geocoder} from './utils/geocoder';

export class DevStoryScraper {
  aboutMeParser: AboutMeParser;

  constructor(private readonly downloader: DevStoryDownloader, geocoder: Geocoder) {
    this.aboutMeParser = new AboutMeParser(geocoder);
  }

  async parse(username: string): Promise<MAC> {
    const log = Logger.getInstance();

    const url = `https://stackoverflow.com/story/${username}`;
    const profileAsHTML = await this.downloader.download(url);

    const startTime = new Date().getTime();

    const $ = cheerio.load(profileAsHTML);

    const settings = this.defaultEnglishSettings();
    const aboutMe = await this.aboutMeParser.parse($);

    const links = $('div#form-section-PersonalInfo a.d-flex')
      .map((i, e) => {
        return $(e)[0]?.attribs?.href;
      })
      .filter((i, e) => e !== '')
      .get();

    const likedTechnologies = $('div[class="user-technologies"] .timeline-item-tags .post-tag')
      .not('.disliked-tag')
      .map((i, e) => $(e).text())
      .get();

    const dislikedTechnologies = $('div[class="user-technologies"] .timeline-item-tags .disliked-tag')
      .map((i, e) => $(e).text())
      .get();

    const positions = $('div[class="timeline-item job"]')
      .map((i, e) => {
        const positionParser = new PositionParser();
        return positionParser.parse($(e).html() || '');
      })
      .get();

    const artifacts = $('.timeline-item')
      .not('.job')
      .map((i, e) => {
        const artifactParser = new ArtifactParser();
        return artifactParser.parse($(e).html() || '');
      })
      .get();

    const elapsed = new Date().getTime() - startTime;
    log.debug(`${username} profile parsed in ${elapsed}ms`);

    return _.omitBy(
      {
        settings,
        aboutMe,
        links,
        likedTechnologies,
        dislikedTechnologies,
        positions,
        artifacts,
      },
      _.isNil,
    ) as MAC;
  }

  private defaultEnglishSettings(): Settings {
    return {
      language: 'EN',
    };
  }
}
