import {Artifact} from './artifact';
import {Settings} from './settings';
import {AboutMe} from './aboutMe';

export type MAC = {
  settings: Settings;
  aboutMe: AboutMe;
  likedTechnologies?: string[];
  dislikedTechnologies?: string[];
  artifacts?: Artifact[];
};
