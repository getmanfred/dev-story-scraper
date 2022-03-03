import {CheerioAPI} from 'cheerio';

import {DevStoryArtifactParser} from './devStory/devStoryArtifactParser';
import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import * as _ from 'lodash';
import {StudyParser} from './studyParser';
import {Knowledge} from '../models/knowledge';

export class KnowledgeParser {
  parse($: CheerioAPI): Knowledge {
    const timeLineItems = $('.timeline-item')
      .not('.job')
      .map((i, e) => DevStoryArtifactParser.parse($(e).html() || ''))
      .get();

    const studies = timeLineItems.filter(this.isStudy).map(StudyParser.parse);

    return {
      studies,
    };
  }

  private isStudy(artifact: DevStoryArtifact): boolean {
    return _.includes(['Certification', 'Education'], artifact.type);
  }
}
