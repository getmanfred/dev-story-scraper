import {Role} from './role';
import {Organization} from './organization';
import {OrganizationType} from './organizationType';

export type Job = {
  organization: Organization;
  type?: OrganizationType;
  roles: Role[];
};
