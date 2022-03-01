import {ProjectType} from './projectType';
import {Image} from './image';
import {Role} from './role';

export type Project = {
  details?: ProjectDetails;
  type?: ProjectType;
  roles: Role[];
  // name: string;
  // type: ProjectType;
  // description: string;
  // URL: string;
  // logo: Image;
  // roles: Role[];
};

export type ProjectDetails = {
  name: string;
  description?: string;
  URL?: string;
  image?: Image;
};
