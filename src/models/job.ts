import {Role} from './role';
import {Organization} from './organization';

export type Job = {
  organization: Organization;
  type?: string;
  roles: Role[];
};
