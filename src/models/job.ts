import {Role} from './role';
import {Organization} from './organization';

export type Job = {
  organization: Organization;
  // name?: string;
  // description?: string;
  // URL?: string;
  // logo?: Image;
  roles?: Role[];
};
