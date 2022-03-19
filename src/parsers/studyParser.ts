import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import {DatesParser} from './datesParser';
import {StudyType} from '../models/studyType';
import {Study} from '../models/study';
import {CompetenceParser} from './competenceParser';

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
      institution: {
        name: artifact.title,
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
}
