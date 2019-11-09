import { Response } from 'ember-cli-mirage';
import config from 'chattermill-test/config/environment';

const { apiHost: host } = config;

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // make this `http://localhost:8080`, for example, if your API is on a different server
  this.urlPrefix = host;

  // make this `/api`, for example, if your API is namespaced
  // this.namespace = '';

  // delay for each request, automatically set to 0 during testing
  // this.timing = 400;

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */
  this.post(`/login`, (schema, request) => {
    const body = decodeURIComponent(request.requestBody);
    const { username, password } = body
      .split('&')
      .reduce(
        (accum, pair) => {
          const [key, value] = pair.split('=');
          accum[key] = value;
          return accum;
        },
        {}
      );

    const credential = schema.credentials.findBy({ username });

    if (password === credential.password) {
      return schema.jwtResponses.new();
    } else {
      return new Response(401, {}, schema.apiErrors.new());
    }
  });
}
