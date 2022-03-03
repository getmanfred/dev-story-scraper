import {CheerioAPI} from 'cheerio';

import {Knowledge, Study, StudyType} from '../models/mac';
import {DevStoryArtifactParser} from './devStory/devStoryArtifactParser';
import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import * as _ from 'lodash';
import {DatesParser} from './datesParser';

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

export class StudyParser {
  static parse(artifact: DevStoryArtifact): Study {
    const [startDate, finishDate] = DatesParser.parse(artifact.time);

    return {
      studyType: StudyParser.parseStudyType(artifact.type),
      degreeAchieved: true,
      name: artifact.title,
      startDate,
      finishDate: finishDate || startDate,
      description: artifact.description,
    };
  }

  private static parseStudyType(type: string): StudyType {
    if (type === 'Certification') {
      return 'certification';
    }

    return 'officialDegree';
  }
}
