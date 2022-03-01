import {Mean} from './mean';

export type CareerPreferences = {
  preferences: Preferences;
};

export type Preferences = {
  preferredMeans: Mean[];
  discardedMeans: Mean[];
};
