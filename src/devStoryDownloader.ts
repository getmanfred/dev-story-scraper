import axios from 'axios';

export class DevStoryDownloader {
  async download(url: string): Promise<string> {
    const response = await axios.get(url);
    return response.data;
  }
}
