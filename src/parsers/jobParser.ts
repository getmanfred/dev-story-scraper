import {DevStoryPosition} from '../models/devStory/devStoryPosition';
import {Job} from '../models/job';
import {DatesParser} from './datesParser';
import {MeanParser} from '../models/meanParser';

export class JobParser {
  static parse(position: DevStoryPosition): Job {
    const [name, company] = position.title.split(' at ');
    const [startDate, finishDate] = DatesParser.parse(position.time);

    return {
      organization: {
        name: company,
        URL: position.url,
        image: {
          alt: position.logoAlt,
          link: position.logo,
        },
      },
      type: 'other',
      roles: [
        {
          name,
          challenges: [{description: position.description}],
          startDate,
          finishDate,
          means: MeanParser.parse(position.tags),
        },
      ],
    };
  }
}
