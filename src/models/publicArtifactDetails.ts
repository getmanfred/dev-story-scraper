import {Image} from './image';

export type PublicArtifactDetails = {
  name: string;
  description?: string;
  URL?: string;
  image?: Image;
};
