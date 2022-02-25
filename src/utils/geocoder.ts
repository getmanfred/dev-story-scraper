import {Client} from '@googlemaps/google-maps-services-js';
import * as _ from 'lodash';

import {Location} from '../models/location';
import {Logger} from './logger';

export type Geocoder = {
  geocode(input: string): Promise<Location>;
};

export class GoogleGeocoder implements Geocoder {
  async geocode(input: string): Promise<Location> {
    const googleAPIKey = process.env.SO_GOOGLE_MAPS_API_KEY;
    if (_.isNil(googleAPIKey)) {
      return {
        notes: input,
      };
    }

    try {
      const result = await this.searchAddressAtGoogle(input, googleAPIKey);
      if (result.data.results.length === 0) {
        return {
          notes: input,
        };
      }

      // If it was a long term project the Google client should be injected to do some tests but not for this one
      const municipality = result.data.results[0].address_components[0].long_name;
      const region = result.data.results[0].address_components[2].long_name;
      const country = result.data.results[0].address_components[3].short_name;

      return {
        country,
        region,
        municipality,
        notes: 'Autocompleted using Google Maps API',
      };
    } catch (e) {
      const log = Logger.getInstance();
      log.error(`error getting information for location "${input}"`);

      return {
        notes: input,
      };
    }
  }

  private async searchAddressAtGoogle(input: string, googleAPIKey: string) {
    const client = new Client({});
    return client.geocode({
      params: {
        address: input,
        key: googleAPIKey,
      },
    });
  }
}
