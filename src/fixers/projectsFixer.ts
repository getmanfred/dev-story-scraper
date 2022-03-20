import * as _ from 'lodash';

import {Project} from '../models/project';
import {Fix} from './fix';
import {today} from '../utils/utils';

export class ProjectsFixer {
  fixes: Fix<Project>[] = [new StartDateFix()];

  fix(projects: Project[] = []): Project[] {
    return projects.map((project) => {
      this.fixes.filter((fix) => fix.isRequired(project)).forEach((fix) => fix.execute(project));
      return project;
    });
  }
}

class StartDateFix implements Fix<Project> {
  private defaultDate: string;

  constructor() {
    this.defaultDate = process.env.SO_DEFAULT_START_DATE || today();
  }

  isRequired(project: Project): boolean {
    return _.isNil(project.roles[0]) || _.isNil(project.roles[0].startDate) || project.roles[0].startDate === '';
  }

  execute(project: Project): Project {
    project.roles[0].startDate = this.defaultDate;

    return project;
  }
}
