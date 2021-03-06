import {CheerioAPI} from 'cheerio';
import * as _ from 'lodash';

import {Experience} from '../models/experience';
import {DevStoryPositionParser} from './devStory/devStoryPositionParser';
import {DevStoryArtifactParser} from './devStory/devStoryArtifactParser';
import {ProjectParser} from './projectParser';
import {JobParser} from './jobParser';
import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import {PublicArtifactParser} from './publicArtifactParser';
import {DevStoryTopsParser} from './devStory/devStoryTopsParser';
import {AchievementParser} from './achievementParser';
import {JobsFixer} from '../fixers/jobsFixer';
import {ProjectsFixer} from '../fixers/projectsFixer';
import {PublicArtifactsFixer} from '../fixers/publicArtifactsFixer';
import {TimelineForFixer} from '../fixers/timelineForFixer';

export class ExperienceParser {
  constructor(private readonly jobParser: JobParser) {}

  async parse($: CheerioAPI): Promise<Experience> {
    const devStoryPositions = $('div[class="timeline-item job"]')
      .map((i, e) => DevStoryPositionParser.parse($(e).html() || ''))
      .get();
    const jobs = await Promise.all(devStoryPositions.map((position) => this.jobParser.parse(position)));

    const timeLineItems = $('.timeline-item')
      .not('.job')
      .map((i, e) => DevStoryArtifactParser.parse($(e).html() || ''))
      .get();
    const projects = timeLineItems.filter(this.isProject).map(ProjectParser.parse);
    const timeLineArtifacts = timeLineItems.filter(this.isPublicArtifact).map(PublicArtifactParser.parse);
    const stackOverflowAchievements = DevStoryTopsParser.parse($);
    const unknownArtifacts = timeLineItems.filter(this.isUnknownArtifact).map(AchievementParser.parse);
    const publicArtifacts = _.concat(timeLineArtifacts, stackOverflowAchievements, unknownArtifacts);

    const timelineForFixer = new TimelineForFixer(timeLineItems);
    const jobsFixer = new JobsFixer(timelineForFixer);
    const projectsFixer = new ProjectsFixer(timelineForFixer);
    const publicArtifactsFixer = new PublicArtifactsFixer(timelineForFixer);
    return {
      jobs: jobsFixer.fix(jobs),
      projects: projectsFixer.fix(projects),
      publicArtifacts: publicArtifactsFixer.fix(publicArtifacts),
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

  private isUnknownArtifact(artifact: DevStoryArtifact): boolean {
    return (
      (artifact.type as string) !== '' &&
      !_.includes(
        [
          'Blogs or videos',
          'Acheivement',
          'Accomplishment',
          'Top post',
          'Assessment',
          'Milestone',
          'Feature or Apps',
          'Open source',
          'Certification',
          'Education',
        ],
        artifact.type,
      )
    );
  }
}
