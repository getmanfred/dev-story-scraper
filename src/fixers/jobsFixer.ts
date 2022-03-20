import * as _ from 'lodash';

import {Job} from '../models/job';
import {Fix} from './fix';
import {today} from '../utils/utils';

export class JobsFixer {
  fixes: Fix<Job>[] = [new StartDateFix(), new SelfEmploymentFix()];

  fix(jobs: Job[] = []): Job[] {
    return jobs.map((job) => {
      this.fixes.filter((fix) => fix.isRequired(job)).forEach((fix) => fix.execute(job));
      return job;
    });
  }
}

class StartDateFix implements Fix<Job> {
  private defaultDate: string;

  constructor() {
    this.defaultDate = process.env.SO_DEFAULT_START_DATE || today();
  }

  isRequired(job: Job): boolean {
    return _.isNil(job.roles[0]) || _.isNil(job.roles[0].startDate) || job.roles[0].startDate === '';
  }

  execute(job: Job): Job {
    job.roles[0].startDate = this.defaultDate;

    return job;
  }
}

class SelfEmploymentFix implements Fix<Job> {
  execute(job: Job): Job {
    job.organization.name = 'Self employed';
    job.type = 'freelance';

    return job;
  }

  isRequired(job: Job): boolean {
    return _.isNil(job.organization?.name) || job.organization.name === '';
  }
}
