import {JobRole} from './jobRole';
import {Image} from './image';

export type Job = {
  name?: string;
  description?: string;
  URL?: string;
  logo?: Image;
  roles?: JobRole[];
};
