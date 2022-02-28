import {Profile} from './profile';
import {InterestingFact} from './interestingFact';
import {RelevantLink} from './relevantLink';

export type AboutMe = {
  profile: Profile;
  relevantLinks?: RelevantLink[];
  interestingFacts?: InterestingFact[];
};
