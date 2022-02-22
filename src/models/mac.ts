import {Position} from './position';
import {Artifact} from './artifact';
import {Settings} from './settings';
import {AboutMe} from './aboutMe';

export type MAC = {
  settings: Settings;
  aboutMe: AboutMe;
  //name: string;
  headline?: string;
  description?: string;
  //location?: string;
  //image?: string;
  links?: string[];
  tools?: string;
  likedTechnologies?: string[];
  dislikedTechnologies?: string[];
  positions?: Position[];
  artifacts?: Artifact[];
};
