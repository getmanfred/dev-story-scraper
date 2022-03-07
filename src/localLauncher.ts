import * as _ from 'lodash';

import {GoogleGeocoder} from './utils/geocoder';
import {DevStoryScraper} from './devStoryScraper';
import {TorDevStoryDownloader} from './downloader/torDevStoryDownloader';

!(async () => {
  const downloader = new TorDevStoryDownloader();
  const geocoder = new GoogleGeocoder();

  const devStoryScraper = new DevStoryScraper(downloader, geocoder);

  const source = process.argv[2];
  if (_.isNil(source)) {
    console.error('No valid username given, run "yarn test:local <username|dev story URL>"');
  } else {
    const result = await devStoryScraper.parse(source);
    console.log(JSON.stringify(result, null, 3));
  }
})();
