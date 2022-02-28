import {Image} from './image';
import {Location} from './location';

export type Profile = {
  name: string;
  surnames: string;
  title: string;
  description: string;
  avatar?: Image;
  location?: Location;
};
