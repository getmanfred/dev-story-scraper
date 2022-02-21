import cheerio from 'cheerio';

import {DevStoryDownloader} from './devStoryDownloader';
import {ProfileData} from './models/profileData';
import {PositionParser} from './parsers/positionParser';
import {ArtifactParser} from './parsers/artifactParser';
import {Markdown} from './utils/markdown';

export class DevStoryScraper {
  constructor(private readonly downloader: DevStoryDownloader) {}

  async parse(username: string): Promise<ProfileData> {
    const url = `https://stackoverflow.com/story/${username}`;
    const profileAsHTML = await this.downloader.download(url);

    const $ = cheerio.load(profileAsHTML);

    const name = $('div[class="name"] h4').text();

    const description = Markdown.fromHTML($('div.description span.description-content-full').html() || '');

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

    return {
      name,
      description,
      likedTechnologies,
      dislikedTechnologies,
      positions,
      artifacts,
    };
  }
}
