import {Competence} from './competence';
import {Challenge} from './challenge';

export type Role = {
  name: string;
  startDate: string;
  finishDate?: string;
  challenges?: Challenge[];
  competences?: Competence[];
};
