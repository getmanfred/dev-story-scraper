import {Mean} from './mean';

export type Role = {
  name: string;
  startDate: string;
  finishDate?: string;
  means: Mean[];
};
