export type DevStoryArtifact = {
  type: DevStoryArtifactType;
  time: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  logo: string;
  logoAlt: string;
};

export type DevStoryArtifactType =
  | 'Certification'
  | 'Feature or Apps'
  | 'Blogs or videos'
  | 'Acheivement'
  | 'Accomplishment'
  | 'Top post'
  | 'Open source'
  | 'Education'
  | 'Assessment'
  | 'Milestone';
