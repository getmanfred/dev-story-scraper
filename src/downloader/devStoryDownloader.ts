export type DevStoryDownloader = {
  download(source: string): Promise<string>;
};
