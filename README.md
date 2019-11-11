# chattermill-test

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd chattermill-test`
* `npm install`

## Running / Production (Important)

Unfortunately, there is a bug with the dependency "ember-emoji", which uses a
set of emojis from [Joypixels](https://www.joypixels.com/). Such bug is only
observable in the production build.

## Running / Development

Running in development will use Chattermill's server as back-end.

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

Tests are run against a mock of Chattermill's server through the usage of Mirage.
Therefore, they can be run safely without ever reaching the server.

* `ember test`
* `ember test --server`

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
