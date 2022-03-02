import {CheerioAPI} from 'cheerio';
import * as _ from 'lodash';

import {Experience} from '../models/experience';
import {DevStoryPositionParser} from './devStory/devStoryPositionParser';
import {DevStoryArtifactParser} from './devStory/devStoryArtifactParser';
import {ProjectParser} from './projectParser';
import {JobParser} from './jobParser';
import {Mean} from '../models/mean';
import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import {DatesParser} from './datesParser';
import {MeanParser} from './meanParser';
import {Image} from '../models/image';

export class ExperienceParser {
  parse($: CheerioAPI): Experience {
    const jobs = $('div[class="timeline-item job"]')
      .map((i, e) => {
        const position = DevStoryPositionParser.parse($(e).html() || '');
        return JobParser.parse(position);
      })
      .get();

    const timeLineItems = $('.timeline-item')
      .not('.job')
      .map((i, e) => DevStoryArtifactParser.parse($(e).html() || ''))
      .get();

    const projects = timeLineItems.filter(this.isProject).map(ProjectParser.parse);
    const publicArtifacts = timeLineItems.filter(this.isPublicArtifact).map(PublicArtifactParser.parse);

    return {
      jobs,
      projects,
      publicArtifacts,
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
}

export type PublicArtifact = {
  details: PublicArtifactDetails;
  type?: PublicArtifactType;
  publishingDate?: string;
  means?: Mean[];
};

export type PublicArtifactDetails = {
  name: string;
  description?: string;
  URL?: string;
  image?: Image;
};

export type PublicArtifactType = 'post' | 'talk' | 'sideProject' | 'achievement' | 'launch' | 'video';

export class PublicArtifactParser {
  static parse(artifact: DevStoryArtifact): PublicArtifact {
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
      means: MeanParser.parse(artifact.tags),
    };
  }

  private static toPublicArtifactType(type: string): PublicArtifactType {
    if (_.includes(['Acheivement', 'Accomplishment', 'Assessment', 'Milestone'], type)) {
      return 'achievement';
    }

    return 'post';
  }
}
