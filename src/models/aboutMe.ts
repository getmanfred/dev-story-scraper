import {Profile} from './profile';
import {InterestingFact} from './interestingFact';
import {RelevantLink} from './relevantLink';

export type AboutMe = {
  profile: Profile;
  headline?: string;
  introduction?: string;
  relevantLinks?: RelevantLink[];
  interestingFacts?: InterestingFact[];
};
