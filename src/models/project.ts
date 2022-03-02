import {ProjectType} from './projectType';
import {Image} from './image';
import {Role} from './role';

export type Project = {
  details?: ProjectDetails;
  type?: ProjectType;
  roles: Role[];
};

export type ProjectDetails = {
  name: string;
  description?: string;
  URL?: string;
  image?: Image;
};
