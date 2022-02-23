import {Profile} from './profile';
import {InterestingFact} from './interestingFact';

export type AboutMe = {
  profile: Profile;
  headline?: string;
  introduction?: string;
  interestingFacts?: InterestingFact[];
};
