import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import {Project} from '../models/project';
import {DatesParser} from './datesParser';
import {MeanParser} from './meanParser';

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
      type: 'other',
      roles: [
        {
          name: 'Developer',
          startDate,
          finishDate,
          means: MeanParser.parse(artifact.tags),
        },
      ],
    };
  }
}
