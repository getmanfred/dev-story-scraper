import cheerio from 'cheerio';

import {DevStoryDownloader} from './devStoryDownloader';
import {ProfileData} from './models/profileData';
import {PositionParser} from './parsers/positionParser';
import {ArtifactParser} from './parsers/artifactParser';
import {Markdown} from './utils/markdown';
import {stripString} from './utils/utils';
import {Logger} from './utils/logger';

export class DevStoryScraper {
  constructor(private readonly downloader: DevStoryDownloader) {}

  async parse(username: string): Promise<ProfileData> {
    const log = Logger.getInstance();

    const url = `https://stackoverflow.com/story/${username}`;
    const profileAsHTML = await this.downloader.download(url);

    const startTime = new Date().getTime();

    const $ = cheerio.load(profileAsHTML);

    const name = $('div[class="name"] h4').text();
    const headline = stripString($('#form-section-PersonalInfo div.job').text() || '');
    const description = Markdown.fromHTML($('div.description span.description-content-full').html() || '');
    const location = stripString($('div.d-flex.ai-center').text());
    const image = $('div#form-section-PersonalInfo img')[0]?.attribs?.src || '';
    const tools = stripString($('div.tools').text());

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

    return {
      name,
      headline,
      description,
      location,
      image,
      links,
      tools,
      likedTechnologies,
      dislikedTechnologies,
      positions,
      artifacts,
    };
  }
}
