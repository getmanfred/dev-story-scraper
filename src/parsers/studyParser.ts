import * as _ from 'lodash';

import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import {DatesParser} from './datesParser';
import {StudyType} from '../models/studyType';
import {Study} from '../models/study';
import {CompetenceParser} from './competenceParser';

export class StudyParser {
  static parse(artifact: DevStoryArtifact): Study {
    const [startDate, finishDate] = DatesParser.parse(artifact.time);
    const [studyName, institutionName] = StudyParser.parseTitle(artifact.title);

    return {
      studyType: StudyParser.parseStudyType(artifact.type),
      degreeAchieved: true,
      name: studyName,
      startDate,
      finishDate: finishDate || startDate,
      description: artifact.description,
      institution: {
        name: institutionName,
        URL: artifact.url,
        image: {
          alt: artifact.logoAlt,
          link: artifact.logo,
        },
      },
      linkedCompetences: CompetenceParser.parse(artifact.tags),
    };
  }

  private static parseStudyType(type: string): StudyType {
    if (type === 'Certification') {
      return 'certification';
    }

    return 'officialDegree';
  }

  private static parseTitle(title: string): [string, string] {
    const titleComponents = title.split(/\s*,\s*/);
    if (titleComponents.length < 2) {
      return [title, title];
    }

    return [_.head(titleComponents) || '', _.tail(titleComponents).join(', ')];
  }
}
