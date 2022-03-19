import * as _ from 'lodash';

import {Fix} from './fix';
import {PublicArtifact} from '../models/publicArtifact';
import {today} from '../utils/utils';

export class PublicArtifactsFixer {
  fixes: Fix<PublicArtifact>[] = [new StartDateFix()];

  fix(publicArtifacts: PublicArtifact[] = []): PublicArtifact[] {
    return publicArtifacts.map((publicArtifact) => {
      this.fixes.filter((fix) => fix.isRequired(publicArtifact)).forEach((fix) => fix.execute(publicArtifact));
      return publicArtifact;
    });
  }
}

class StartDateFix implements Fix<PublicArtifact> {
  isRequired(publicArtifact: PublicArtifact): boolean {
    return _.isNil(publicArtifact.publishingDate) || publicArtifact.publishingDate === '';
  }

  execute(publicArtifact: PublicArtifact): PublicArtifact {
    publicArtifact.publishingDate = today();

    return publicArtifact;
  }
}
