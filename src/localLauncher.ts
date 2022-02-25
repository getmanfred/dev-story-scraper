import {DevStoryDownloader} from './devStoryDownloader';
import {GoogleGeocoder} from './utils/geocoder';
import {DevStoryScraper} from './devStoryScraper';

!(async () => {
  const downloader = new DevStoryDownloader();
  const geocoder = new GoogleGeocoder();

  const devStoryScraper = new DevStoryScraper(downloader, geocoder);

  const result = await devStoryScraper.parse('ydarias');

  console.log(JSON.stringify(result, null, 3));
})();
