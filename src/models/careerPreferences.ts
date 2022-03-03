import {Competence} from './competence';

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
  preferredCompetences: Competence[];
  discardedCompetences: Competence[];
};
