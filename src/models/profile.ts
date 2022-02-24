import {Image} from './image';
import {Location} from './location';

export type Profile = {
  name: string;
  surnames: string;
  avatar?: Image;
  whereILive?: Location;
};
