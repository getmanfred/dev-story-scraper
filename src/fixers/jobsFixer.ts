import * as _ from 'lodash';

import {Job} from '../models/job';
import {Fix} from './fix';
import {today} from '../utils/utils';

export class JobsFixer {
  fixes: Fix<Job>[] = [new StartDateFix()];

  fix(jobs: Job[] = []): Job[] {
    return jobs.map((job) => {
      this.fixes.filter((fix) => fix.isRequired(job)).forEach((fix) => fix.execute(job));
      return job;
    });
  }
}

class StartDateFix implements Fix<Job> {
  isRequired(job: Job): boolean {
    return _.isNil(job.roles[0]) || _.isNil(job.roles[0].startDate) || job.roles[0].startDate === '';
  }

  execute(job: Job): Job {
    job.roles[0].startDate = today();

    return job;
  }
}
