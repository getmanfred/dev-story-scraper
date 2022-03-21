import * as _ from 'lodash';

import {Fix} from './fix';
import {PublicArtifact} from '../models/publicArtifact';
import {today} from '../utils/utils';
import {TimelineForFixer} from './timelineForFixer';

export class PublicArtifactsFixer {
  private readonly fixes: Fix<PublicArtifact>[];

  constructor(timelineForFixer: TimelineForFixer) {
    this.fixes = [new StartDateFix(timelineForFixer)];
  }

  fix(publicArtifacts: PublicArtifact[] = []): PublicArtifact[] {
    return publicArtifacts.map((publicArtifact) => {
      this.fixes.filter((fix) => fix.isRequired(publicArtifact)).forEach((fix) => fix.execute(publicArtifact));
      return publicArtifact;
    });
  }
}

class StartDateFix implements Fix<PublicArtifact> {
  private defaultDate: string;

  constructor(private readonly timelineForFixer: TimelineForFixer) {
    this.defaultDate = process.env.SO_DEFAULT_START_DATE || today();
  }

  isRequired(publicArtifact: PublicArtifact): boolean {
    return _.isNil(publicArtifact.publishingDate) || publicArtifact.publishingDate === '';
  }

  execute(publicArtifact: PublicArtifact): PublicArtifact {
    publicArtifact.publishingDate = this.timelineForFixer.timeFor(publicArtifact.details.name) || this.defaultDate;

    return publicArtifact;
  }
}
