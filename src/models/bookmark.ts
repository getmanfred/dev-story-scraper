export type Bookmark = {
  title: string;
  type?: 'reading' | 'video' | 'podcast' | 'web' | 'other';
  URL?: string;
  authors?: Author[];
  summary?: string;
};

export type Author = {
  name: string;
  surnames: string;
  title: string;
};
