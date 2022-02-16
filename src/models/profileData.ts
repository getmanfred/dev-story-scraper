import {Position} from './position';
import {Artifact} from './artifact';

export type ProfileData = {
  name: string;
  likedTechnologies?: string[];
  dislikedTechnologies?: string[];
  positions?: Position[];
  artifacts?: Artifact[];
};
