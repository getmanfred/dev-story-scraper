import {CheerioAPI} from 'cheerio';

import {DevStoryArtifactParser} from './devStory/devStoryArtifactParser';
import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import * as _ from 'lodash';
import {StudyParser} from './studyParser';
import {Knowledge} from '../models/knowledge';
import {StudiesFixer} from '../fixers/studiesFixer';

export class KnowledgeParser {
  studiesFixer = new StudiesFixer();

  parse($: CheerioAPI): Knowledge {
    const timeLineItems = $('.timeline-item')
      .not('.job')
      .map((i, e) => DevStoryArtifactParser.parse($(e).html() || ''))
      .get();

    const studies = timeLineItems.filter(this.isStudy).map(StudyParser.parse);

    return {
      studies: this.studiesFixer.fix(studies),
    };
  }

  private isStudy(artifact: DevStoryArtifact): boolean {
    return _.includes(['Certification', 'Education'], artifact.type);
  }
}
