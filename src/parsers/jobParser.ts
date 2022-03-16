import {DevStoryPosition} from '../models/devStory/devStoryPosition';
import {Job} from '../models/job';
import {DatesParser} from './datesParser';
import {CompetenceParser} from './competenceParser';
import {CompanyUrlParser} from './companyUrlParser';

export class JobParser {
  constructor(private readonly companyUrlParser: CompanyUrlParser) {}

  async parse(position: DevStoryPosition): Promise<Job> {
    const [name, company] = position.title.split(' at ');
    const [startDate, finishDate] = DatesParser.parse(position.time);

    return {
      organization: {
        name: company,
        URL: await this.companyUrlParser.parseFrom(position.url),
        image: {
          alt: position.logoAlt,
          link: position.logo,
        },
      },
      roles: [
        {
          name,
          challenges: [{description: position.description}],
          startDate,
          finishDate,
          competences: CompetenceParser.parse(position.tags),
        },
      ],
    };
  }
}
