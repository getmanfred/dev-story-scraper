import * as _ from 'lodash';

import {Fix} from './fix';
import {today} from '../utils/utils';
import {Study} from '../models/study';

export class StudiesFixer {
  fixes: Fix<Study>[] = [new StartDateFix()];

  fix(studies: Study[] = []): Study[] {
    return studies.map((study) => {
      this.fixes.filter((fix) => fix.isRequired(study)).forEach((fix) => fix.execute(study));
      return study;
    });
  }
}

class StartDateFix implements Fix<Study> {
  isRequired(study: Study): boolean {
    return _.isNil(study.startDate) || study.startDate === '';
  }

  execute(study: Study): Study {
    study.startDate = today();

    return study;
  }
}
