export type RelevantLink = {
  type: LinkType;
  URL: string;
  description?: string;
};

export type LinkType = 'other' | 'linkedin' | 'twitter' | 'github';
