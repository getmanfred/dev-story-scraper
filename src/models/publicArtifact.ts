import {PublicArtifactDetails} from './publicArtifactDetails';
import {PublicArtifactType} from './publicArtifactType';
import {Competence} from './competence';

export type PublicArtifact = {
  details: PublicArtifactDetails;
  type?: PublicArtifactType;
  publishingDate?: string;
  relatedCompetences?: Competence[];
};
