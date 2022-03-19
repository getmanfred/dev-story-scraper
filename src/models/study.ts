import {StudyType} from './studyType';
import {Image} from './image';
import {Competence} from './competence';

export type Study = {
  studyType: StudyType;
  degreeAchieved: boolean;
  name: string;
  description?: string;
  startDate: string;
  finishDate?: string;
  institution?: StudyInstitution;
  linkedCompetences?: Competence[];
};

export type StudyInstitution = {
  name: string;
  URL: string;
  image: Image;
};
