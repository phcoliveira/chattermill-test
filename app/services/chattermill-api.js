import Service from '@ember/service';
import RSVP from 'rsvp';
import fetch from 'fetch';
import { isServerErrorResponse, isAbortError } from 'ember-fetch/errors';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

import config from 'chattermill-test/config/environment';

const { apiHost } = config;

// NOTE: We might need to use translations of these error messages.
const TRY_AGAIN = 'We are having some problems, please try again later';
const SUPPORT = 'We are having some problems, please contact our support team';
const NETWORK_REQUEST_FAILED = 'Network request failed, check your connection';

export default Service.extend({
  session: service(),

  fetch(endpoint, options = { method: 'GET' }) {
    return new RSVP.Promise((resolve, reject) => {
      let _options = {
        ...options,
      };

      if (isEmpty(options.headers)) {
        const session = this.get('session');
        const isAuthenticated = session.get('isAuthenticated');
        
        if (!isAuthenticated) {
          return reject('Not authenticated');
        }

        const data = session.get('data');
        
        _options = {
          ..._options,
          headers: {
            'Authorization': `Bearer ${data.authenticated.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        };
      }

      fetch(`${apiHost}${endpoint}`, _options)
        .then((response) => {
          return response.json()
            .then((body) => {
              if (response.ok) {
                resolve(body);
              } else {
                if (isServerErrorResponse(response)) {
                  throw new Error(TRY_AGAIN);
                } else {
                  throw new Error(body.message);
                }
              }
            })
            .catch((error) => {
              if (error instanceof SyntaxError) {
                // NOTE: Edge case where our server sends an invalid JSON string.
                reject(SUPPORT);
              } else {
                reject(error.message);
              }
            });
        })
        .catch((error) => {
          if (isAbortError(error)) {
            reject();
          } else {
            reject(NETWORK_REQUEST_FAILED);
          }
        });
    });
  }
});
