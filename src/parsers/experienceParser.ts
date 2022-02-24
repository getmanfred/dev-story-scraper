import {CheerioAPI} from 'cheerio';
import * as _ from 'lodash';

import {Experience} from '../models/experience';
import {DevStoryPositionParser} from './devStory/devStoryPositionParser';
import {DevStoryPosition} from '../models/devStory/devStoryPosition';
import {Job} from '../models/job';
import {DatesParser} from './datesParser';
import {JobRoleMean} from '../models/jobRoleMean';

export class ExperienceParser {
  parse($: CheerioAPI): Experience {
    const jobs = $('div[class="timeline-item job"]')
      .map((i, e) => {
        const positionParser = new DevStoryPositionParser();
        const position = positionParser.parse($(e).html() || '');

        return this.toJob(position);
      })
      .get();

    return _.omitBy(
      {
        jobs,
      },
      (e) => _.isNil(e) || _.isEmpty(e),
    ) as Experience;
  }

  private toJob(position: DevStoryPosition): Job {
    const [roleName, name] = position.title.split(' at ');
    const [startDate, finishDate] = DatesParser.parse(position.time);
    return {
      name,
      description: position.description,
      roles: [
        {
          name: roleName,
          startDate,
          finishDate,
          means: this.toMeans(position),
        },
      ],
    };
  }

  private toMeans(position: DevStoryPosition): JobRoleMean[] {
    return position.tags.map((t) => {
      return {
        name: t,
      };
    });
  }
}
