import * as _ from 'lodash';

import {Project} from '../models/project';
import {Fix} from './fix';
import {today} from '../utils/utils';
import {TimelineForFixer} from './timelineForFixer';

export class ProjectsFixer {
  private readonly fixes: Fix<Project>[];

  constructor(timelineForFixer: TimelineForFixer) {
    this.fixes = [new StartDateFix(timelineForFixer)];
  }

  fix(projects: Project[] = []): Project[] {
    return projects.map((project) => {
      this.fixes.filter((fix) => fix.isRequired(project)).forEach((fix) => fix.execute(project));
      return project;
    });
  }
}

class StartDateFix implements Fix<Project> {
  private defaultDate: string;

  constructor(private readonly timelineForFixer: TimelineForFixer) {
    this.defaultDate = process.env.SO_DEFAULT_START_DATE || today();
  }

  isRequired(project: Project): boolean {
    return _.isNil(project.roles[0]) || _.isNil(project.roles[0].startDate) || project.roles[0].startDate === '';
  }

  execute(project: Project): Project {
    project.roles[0].startDate = this.timelineForFixer.timeFor(project.roles[0].name) || this.defaultDate;

    return project;
  }
}
