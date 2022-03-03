import {StudyType} from './studyType';

export type Study = {
  studyType: StudyType;
  degreeAchieved: boolean;
  name: string;
  description?: string;
  startDate: string;
  finishDate?: string;
};
