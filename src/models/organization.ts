import {Image} from './image';

export type Organization = {
  name: string;
  description?: string;
  URL?: string;
  image: Image;
};
