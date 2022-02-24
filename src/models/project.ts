import {ProjectType} from './projectType';
import {Image} from './image';
import {Role} from './role';

export type Project = {
  name: string;
  type: ProjectType;
  description: string;
  URL: string;
  logo: Image;
  roles: Role[];
};
