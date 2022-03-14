import {StudyType} from './studyType';
import {Image} from './image';

export type Study = {
  studyType: StudyType;
  degreeAchieved: boolean;
  name: string;
  description?: string;
  startDate: string;
  finishDate?: string;
  institution?: StudyInstitution;
};

export type StudyInstitution = {
  name: string;
  URL: string;
  image: Image;
};
