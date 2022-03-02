import {PublicArtifactDetails} from './publicArtifactDetails';
import {PublicArtifactType} from './publicArtifactType';
import {Mean} from './mean';

export type PublicArtifact = {
  details: PublicArtifactDetails;
  type?: PublicArtifactType;
  publishingDate?: string;
  means?: Mean[];
};
