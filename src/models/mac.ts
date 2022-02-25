import {DevStoryArtifact} from './devStory/devStoryArtifact';
import {Settings} from './settings';
import {AboutMe} from './aboutMe';
import {Experience} from './experience';

export type MAC = {
  settings: Settings;
  aboutMe: AboutMe;
  experience: Experience;
  likedTechnologies?: string[];
  dislikedTechnologies?: string[];
  artifacts?: DevStoryArtifact[];
};
