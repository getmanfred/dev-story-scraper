import {CheerioAPI} from 'cheerio';

import {Experience} from '../models/experience';
import {DevStoryPositionParser} from './devStory/devStoryPositionParser';
import {DevStoryArtifactParser} from './devStory/devStoryArtifactParser';
import {ProjectParser} from './projectParser';
import {JobParser} from './jobParser';

export class ExperienceParser {
  parse($: CheerioAPI): Experience {
    const jobs = $('div[class="timeline-item job"]')
      .map((i, e) => {
        const position = DevStoryPositionParser.parse($(e).html() || '');
        return JobParser.parse(position);
      })
      .get();
    const projects = $('.timeline-item')
      .not('.job')
      .map((i, e) => DevStoryArtifactParser.parse($(e).html() || ''))
      .get()
      .filter((a) => a.type.toLowerCase() === 'feature or apps')
      .map(ProjectParser.parse);

    return {
      jobs,
      projects,
    };
  }
}
