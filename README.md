# Stack Overflow Dev Story scraper

> This tool downloads a Dev Story (from Stack Overflow) into a JSON compliant with Manfred's MAC JSON schema.

## General overview

The project is pretty simple and it is prepared to be deployed as an AWS Lambda function.

![General overview diagram](doc/assets/general-overview.png)

The only dependency is with Google Maps API, but if no API Key for Google is provided it just don't autocomplete the field `whereILive`. In that case the location information from the Dev Story is stored at `aboutMe.profile.whereILive.notes`.

## Code

![Code organization](doc/assets/code-organization.png)

The scraping process is designed to follow the MAC JSON schema structure independently from the position at the Stack Overflows HTML. So each "large" sub-document at the JSON Schema usually have its own parser class.

The `index.ts` file contains the handler that launches the Lambda function, and it is in charge of the bootstraping process.

The `DevStoryDownloader` and `Geocoder` are created at the beginning so we can inject a mock for test purposes, avoiding overusing the Stack Overflow or Google's systems, this also prevents false red tests. We could use the dependency injection in better ways, but for a project that is going to be used for a few days and discarded it doesn't worth the price.

### Tasks

* `yarn install`: Installs all the required dependencies
* `yarn test`: Launches the test suite
* `yarn test:local <username>`: Executes the complete process in local using the actual bootstraping.
* `yarn build`: Transpilation process from TS to JS

## Deployment

![Components architecture](doc/assets/deployment.png)

We deploy the code at AWS Lambda using GitHub Actions. There are some details we need to take care of:
* The default timeout of a lambda is 3 seconds, and it is too slow for larger dev stories. It is better to increase up to 15 seconds. *The observed time with real examples is in general under 9 seconds*.
* By default, the log level is `info` we can change it with the environment variable `LOG_LEVEL`.
* **We need to configure the `GOOGLE_MAPS_API_KEY` to use the  geocoder**.

## Design decisions

To adapt the scraped data to the MAC JSON Schema we took some design decisions.

### Name to name and surnames

Stack Overflow uses just a string with full name, to create `name` and `surnames` fields we decided to use the first word as name and the rest as surnames.

Example:

```
{
  name: 'Ryan Reynolds'
}
```

to

```
{
  name: 'Ryan',
  surnames: 'Reynolds'
}
```

### Location completion

Location is a free field, so we are using Google Maps API to get more data. `whereILive` field is composed by `country`, `region`, and `municipality` but usually a Dev Story only has 2 of those fields.

Examples:
* Tampa, Florida > Tampa, Florida, US
* Madrid, Spain > Madrid, Community of Madrid, ES

![Geocoder flow diagram](doc/assets/geocoder-flow.png)

### Job parsing

![job parsing details diagram](doc/assets/job-parsing.png)

### Assessment parsing

![assessment parsing details diagram](doc/assets/assessment-parsing.png)
