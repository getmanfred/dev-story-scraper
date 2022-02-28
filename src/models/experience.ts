import {Job} from './job';
import {Project} from './project';

export type Experience = {
  jobs?: Job[];
  projects?: Project[];
  // TODO to create the right type
  publicArtifacts?: any;
};
