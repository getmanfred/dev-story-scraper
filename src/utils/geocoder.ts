import {Client} from '@googlemaps/google-maps-services-js';

import {Location} from '../models/location';

export class Geocoder {
  async geocode(input: string): Promise<Location> {
    const client = new Client({});
    const result = await client.geocode({
      params: {
        address: input,
        key: process.env.SO_GOOGLE_MAPS_API_KEY || '',
      },
    });

    // If it was a long term project the Google client should be injected to do some tests
    const municipality = result.data.results[0].address_components[0].long_name;
    const region = result.data.results[0].address_components[2].long_name;
    const country = result.data.results[0].address_components[3].short_name;

    return {
      country,
      region,
      municipality,
    };
  }
}
