import {Avatar} from './avatar';
import {Location} from './location';

export type Profile = {
  name: string;
  surnames: string;
  avatar?: Avatar;
  whereILive?: Location;
};
