import {CheerioAPI} from 'cheerio';

import {Experience} from '../models/experience';
import {DevStoryPositionParser} from './devStory/devStoryPositionParser';
import {DevStoryPosition} from '../models/devStory/devStoryPosition';
import {Job} from '../models/job';
import {DatesParser} from './datesParser';
import {Mean} from '../models/mean';
import {DevStoryArtifactParser} from './devStory/devStoryArtifactParser';
import {DevStoryArtifact} from '../models/devStory/devStoryArtifact';
import {Project} from '../models/project';
import {Organization} from '../models/organization';
import {Role} from '../models/role';

export class ExperienceParser {
  parse($: CheerioAPI): Experience {
    const jobs = $('div[class="timeline-item job"]')
      .map((i, e) => {
        const position = DevStoryPositionParser.parse($(e).html() || '');
        return this.toJob(position);
      })
      .get();
    const artifacts = $('.timeline-item')
      .not('.job')
      .map((i, e) => DevStoryArtifactParser.parse($(e).html() || ''))
      .get();
    const projects = artifacts.filter((a) => this.isProject(a)).map((a) => this.toProject(a));

    return {
      jobs,
      projects,
    };
  }

  private toJob(position: DevStoryPosition): Job {
    const organization = this.toOrganization(position);
    const roles = this.toRoles(position);

    return {
      organization,
      roles,
    };
  }

  private toOrganization(position: DevStoryPosition): Organization {
    const name = position.title.split(' at ')[1] || '';

    return {
      name,
      URL: position.url,
      image: {
        alt: position.logoAlt,
        link: position.logo,
      },
    };
  }

  private toRoles(position: DevStoryPosition): Role[] {
    const [name] = position.title.split(' at ');
    const [startDate, finishDate] = DatesParser.parse(position.time);

    return [
      {
        name,
        challenges: [{description: position.description}],
        startDate,
        finishDate,
        means: this.toMeans(position.tags),
      },
    ];
  }

  private isProject(artifact: DevStoryArtifact): boolean {
    return artifact.type.toLowerCase() === 'feature or apps';
  }

  private toProject(artifact: DevStoryArtifact): Project {
    const [startDate] = DatesParser.parse(artifact.time);
    return {
      name: artifact.title,
      type: 'other',
      description: artifact.description,
      URL: artifact.url,
      logo: {
        alt: artifact.logoAlt,
        link: artifact.logo,
      },
      roles: [
        {
          name: 'Developer',
          challenges: [{description: artifact.description}],
          startDate,
          finishDate: startDate,
          means: this.toProjectMeans(artifact),
        },
      ],
    };
  }

  /**
   * @deprecated
   */
  private toProjectMeans(artifact: DevStoryArtifact): Mean[] {
    return artifact.tags.map((t) => ({
      name: t,
      type: 'tool',
    }));
  }

  private toMeans(tags: string[]): Mean[] {
    return tags.map((t) => ({
      name: t,
      type: 'technology',
    }));
  }
}
