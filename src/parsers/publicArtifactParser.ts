import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import {PublicArtifact} from '../models/publicArtifact';
import {DatesParser} from './datesParser';
import {CompetenceParser} from './competenceParser';
import {PublicArtifactType} from '../models/publicArtifactType';
import * as _ from 'lodash';

export class PublicArtifactParser {
  static parse(artifact: DevStoryArtifact): PublicArtifact {
    if (artifact.type !== 'Assessment') {
      return PublicArtifactParser.parseGenericArtifact(artifact);
    }

    return PublicArtifactParser.parseAssessmentArtifact(artifact);
  }

  private static parseAssessmentArtifact(artifact: DevStoryArtifact) {
    const [startDate] = DatesParser.parse(artifact.time);

    return {
      details: {
        name: artifact.logoAlt.replace(/Title:\s*/, ''),
        description: artifact.description,
        URL: artifact.url,
        image: {
          alt: artifact.logoAlt,
          link: artifact.logo,
        },
      },
      type: PublicArtifactParser.toPublicArtifactType(artifact.type),
      publishingDate: startDate,
      relatedCompetences: CompetenceParser.parse(artifact.tags),
    };
  }

  private static parseGenericArtifact(artifact: DevStoryArtifact) {
    const [name] = artifact.title.split(' at ');
    const [startDate] = DatesParser.parse(artifact.time);

    return {
      details: {
        name,
        description: artifact.description,
        URL: artifact.url,
        image: {
          alt: artifact.logoAlt,
          link: artifact.logo,
        },
      },
      type: PublicArtifactParser.toPublicArtifactType(artifact.type),
      publishingDate: startDate,
      relatedCompetences: CompetenceParser.parse(artifact.tags),
    };
  }

  private static toPublicArtifactType(type: string): PublicArtifactType {
    if (_.includes(['Acheivement', 'Accomplishment', 'Assessment', 'Milestone'], type)) {
      return 'achievement';
    }

    return 'post';
  }
}
