import {JobRoleMean} from './jobRoleMean';

export type JobRole = {
  name: string;
  startDate: string;
  finishDate?: string;
  means: JobRoleMean[];
};
