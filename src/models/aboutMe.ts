import {Profile} from './profile';
import {InterestingFact} from './interestingFact';
import {RelevantLink} from './relevantLink';
import {Bookmark} from './bookmark';

export type AboutMe = {
  profile: Profile;
  relevantLinks?: RelevantLink[];
  interestingFacts?: InterestingFact[];
  recommendations: Bookmark[];
};
