import cheerio, {CheerioAPI} from 'cheerio';
import * as _ from 'lodash';
import moment from 'moment';

import {Experience} from '../models/experience';
import {DevStoryPositionParser} from './devStory/devStoryPositionParser';
import {DevStoryArtifactParser} from './devStory/devStoryArtifactParser';
import {ProjectParser} from './projectParser';
import {JobParser} from './jobParser';
import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import {PublicArtifactParser} from './publicArtifactParser';
import {PublicArtifact} from '../models/publicArtifact';
import {CompetenceParser} from './competenceParser';
import {stripString} from '../utils/utils';

export class ExperienceParser {
  parse($: CheerioAPI): Experience {
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
    const stackOverflowAchievements = DevStoryTopsParser.parse($);

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

export class DevStoryTopsParser {
  static parse($: CheerioAPI): PublicArtifact[] {
    return $('.user-technologies .top')
      .get()
      .map((e) => {
        const topElement = cheerio.load($(e).html() || '');

        const topTags = topElement('.post-tag')
          .get()
          .map((e) => stripString($(e).text() || ''));

        return {
          details: {
            name: DevStoryTopsParser.parseName(topElement),
            description: stripString(topElement('.informative-tooltip').text()),
          },
          type: 'achievement',
          publishingDate: moment().format('YYYY-MM-DD'),
          relatedCompetences: CompetenceParser.parse(topTags),
        };
      });
  }

  private static parseName($: CheerioAPI): string {
    const quantity = stripString($('.number').text());

    return `Top ${quantity} at Stack Overflow answers`;
  }
}
