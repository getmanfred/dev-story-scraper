import {Settings} from './settings';
import {AboutMe} from './aboutMe';
import {Experience} from './experience';
import {CareerPreferences} from './careerPreferences';

export type MAC = {
  settings: Settings;
  aboutMe: AboutMe;
  experience?: Experience;
  knowledge?: Knowledge;
  careerPreferences: CareerPreferences;
};

export type Knowledge = {
  studies: Study[];
};

export type Study = {
  studyType: StudyType;
  degreeAchieved: boolean;
  name: string;
  description?: string;
  startDate: string;
  finishDate?: string;
};

export type StudyType = 'officialDegree' | 'certification' | 'unaccredited' | 'selfTraining';
