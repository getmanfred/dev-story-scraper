import {Mean} from './mean';

export type CareerPreferences = {
  contact: Contact;
  preferences: Preferences;
};

export type Contact = {
  publicProfiles: PublicProfile[];
};

export type PublicProfile = {
  type: 'manfred' | 'linkedin' | 'stackoverflow' | 'xing' | 'other';
  URL: string;
};

export type Preferences = {
  preferredMeans: Mean[];
  discardedMeans: Mean[];
};
