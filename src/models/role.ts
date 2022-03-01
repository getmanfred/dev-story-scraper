import {Mean} from './mean';
import {Challenge} from './challenge';

export type Role = {
  name: string;
  startDate: string;
  finishDate?: string;
  challenges?: Challenge[];
  means?: Mean[];
};
