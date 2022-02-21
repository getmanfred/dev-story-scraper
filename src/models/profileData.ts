import {Position} from './position';
import {Artifact} from './artifact';

export type ProfileData = {
  name: string;
  description: string;
  location: string;
  image: string;
  links: string[];
  likedTechnologies?: string[];
  dislikedTechnologies?: string[];
  positions?: Position[];
  artifacts?: Artifact[];
};
