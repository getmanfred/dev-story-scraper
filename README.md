# Stack Overflow Dev Story scraper

This project allows downloading a Stack Overflow's Dev Story from a given username and transforming the information into a JSON compliant with the MAC JSON Schema.

## General overview

![General overview diagram](doc/assets/general-overview.png)

## Code

![Code organization](doc/assets/code-organization.png)

### Tasks

* `yarn install`: Installs all the required dependencies
* `yarn test`: Launches the test suite
* `yarn build`: Transpilation process from TS to JS

## Deployment

![Components architecture](doc/assets/deployment.png)

We deploy the code at AWS Lambda using GitHub Actions. There are some details we need to take care of, though.
* The default timeout of a lambda is 3 seconds, and it is too slow for larger dev stories. It is better to increase up to 10 seconds.
* By default the log level is `info` we can change it with environment variable `LOG_LEVEL`.
* **We need to configure the `GOOGLE_MAPS_API_KEY` to use the  geocoder**.

## Design decisions

To adapt the scraped data to the MAC JSON Schema we took some design decisions.

### Name to name and surnames

Stack Overflow uses just a name, to create `name` and `surnames` fields we decided to use the first word as name and the rest as surnames.

### Location completion

Location is a free field, so we are using Google Maps API to get more data. `whereILive` field is composed by `country`, `region`, and `municipality` but usually SO only has 2 of those fields.

Examples:
* Tampa, Florida > Tampa, Florida, US
* Madrid, Spain > Madrid, Community of Madrid, ES
