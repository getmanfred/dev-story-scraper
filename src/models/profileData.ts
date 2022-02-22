import {Position} from './position';
import {Artifact} from './artifact';
import {Settings} from './settings';

export type ProfileData = {
  settings: Settings;
  name: string;
  headline?: string;
  description?: string;
  location?: string;
  image?: string;
  links?: string[];
  tools?: string;
  likedTechnologies?: string[];
  dislikedTechnologies?: string[];
  positions?: Position[];
  artifacts?: Artifact[];
};
