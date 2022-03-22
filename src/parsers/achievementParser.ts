import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import {PublicArtifact} from '../models/publicArtifact';
import {DatesParser} from './datesParser';
import {CompetenceParser} from './competenceParser';

export class AchievementParser {
  static parse(artifact: DevStoryArtifact): PublicArtifact {
    const [startDate] = DatesParser.parse(artifact.time);

    return {
      details: {
        name: artifact.title,
        description: artifact.description,
        URL: artifact.url,
        image: {
          alt: artifact.logoAlt,
          link: artifact.logo,
        },
      },
      type: 'achievement',
      publishingDate: startDate,
      relatedCompetences: CompetenceParser.parse(artifact.tags),
      tags: [artifact.type],
    };
  }
}
