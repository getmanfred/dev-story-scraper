export type Bookmark = {
  title: string;
  URL?: string;
  authors?: Author[];
  summary?: string;
};

export type Author = {
  name: string;
  surnames: string;
  title: string;
};
