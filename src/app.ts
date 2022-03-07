import express from 'express';

import {Logger} from './utils/logger';
import {TorDevStoryDownloader} from './downloader/torDevStoryDownloader';
import {GoogleGeocoder} from './utils/geocoder';
import {DevStoryScraper} from './devStoryScraper';

const app = express();
const log = Logger.getInstance();
const downloader = new TorDevStoryDownloader();
const geocoder = new GoogleGeocoder();
const scraper = new DevStoryScraper(downloader, geocoder);

const port = 3000;

app.get('/', async (req, res) => {
  try {
    const username = (req.query.username as string) || '';
    const profile = await scraper.parse(username);
    res.json(profile);
  } catch (e) {
    res.status(500);
    res.json({
      error: e,
    });
  }
});

app.listen(port, () => {
  log.info(`Server listening at http://localhost:${port}`);
});
