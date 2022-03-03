import {Settings} from './settings';
import {AboutMe} from './aboutMe';
import {Experience} from './experience';
import {CareerPreferences} from './careerPreferences';
import {Knowledge} from './knowledge';

export type MAC = {
  settings: Settings;
  aboutMe: AboutMe;
  experience?: Experience;
  knowledge?: Knowledge;
  careerPreferences: CareerPreferences;
};
