import {DevStoryArtifact, DevStoryArtifactType} from '../models/devStory/devStoryArtifact';
import {Project} from '../models/project';
import {DatesParser} from './datesParser';
import {CompetenceParser} from './competenceParser';
import {ProjectType} from '../models/projectType';

export class ProjectParser {
  static parse(artifact: DevStoryArtifact): Project {
    const [name] = artifact.title.split(' at ');
    const [startDate, finishDate] = DatesParser.parse(artifact.time);

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
      type: ProjectParser.parseType(artifact.type),
      roles: [
        {
          name: 'Developer',
          startDate,
          finishDate,
          competences: CompetenceParser.parse(artifact.tags),
        },
      ],
    };
  }

  private static parseType(devStoryType: DevStoryArtifactType): ProjectType {
    if (devStoryType === 'Open source') {
      return 'openSource';
    }

    return 'other';
  }
}
