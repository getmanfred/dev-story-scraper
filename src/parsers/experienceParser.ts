import {CheerioAPI} from 'cheerio';
import * as _ from 'lodash';

import {Experience} from '../models/experience';
import {DevStoryPositionParser} from './devStory/devStoryPositionParser';
import {DevStoryArtifactParser} from './devStory/devStoryArtifactParser';
import {ProjectParser} from './projectParser';
import {JobParser} from './jobParser';
import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import {PublicArtifactParser} from './publicArtifactParser';
import {CareerPreferences} from '../models/careerPreferences';
import {DevStoryTopsParser} from './devStory/devStoryTopsParser';

export class ExperienceParser {
  parse($: CheerioAPI, careerPreferences: CareerPreferences): Experience {
    const jobs = $('div[class="timeline-item job"]')
      .map((i, e) => {
        const position = DevStoryPositionParser.parse($(e).html() || '');
        return JobParser.parse(position);
      })
      .get();

    const timeLineItems = $('.timeline-item')
      .not('.job')
      .map((i, e) => DevStoryArtifactParser.parse($(e).html() || ''))
      .get();

    const projects = timeLineItems.filter(this.isProject).map(ProjectParser.parse);
    const timeLineArtifacts = timeLineItems.filter(this.isPublicArtifact).map(PublicArtifactParser.parse);
    const stackOverflowAchievements = DevStoryTopsParser.parse($, careerPreferences);

    return {
      jobs,
      projects,
      publicArtifacts: _.concat(timeLineArtifacts, stackOverflowAchievements),
    };
  }

  private isProject(artifact: DevStoryArtifact): boolean {
    return _.includes(['Feature or Apps', 'Open source'], artifact.type);
  }

  private isPublicArtifact(artifact: DevStoryArtifact): boolean {
    return _.includes(
      ['Blogs or videos', 'Acheivement', 'Accomplishment', 'Top post', 'Assessment', 'Milestone'],
      artifact.type,
    );
  }
}
