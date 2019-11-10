import Service from '@ember/service';
import RSVP from 'rsvp';
import fetch from 'fetch';
import { isServerErrorResponse, isAbortError } from 'ember-fetch/errors';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import EmberObject from '@ember/object';
import { A } from '@ember/array';

import config from 'chattermill-test/config/environment';

const { apiHost } = config;

// NOTE: We might need to use translations of these error messages.
const TRY_AGAIN = 'We are having some problems, please try again later';
const SUPPORT = 'We are having some problems, please contact our support team';
const NETWORK_REQUEST_FAILED = 'Network request failed, check your connection';

export default Service.extend({
  session: service(),

  fetch(url, options = { method: 'GET' }) {
    return new RSVP.Promise((resolve, reject) => {
      const _url = url instanceof URL ? url.toString() : `${apiHost}${url}`;

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


      fetch(_url, _options)
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
  },

  find(path, id) {
    return new RSVP.Promise((resolve, reject) => {
      const url = this._getURL(`${path}/${id}`);

      this.fetch(url)
        .then((response) => {
          resolve(EmberObject.create(response.data));
        })
        .catch(reject);
    });
  },

  query(path, pagination) {
    return new RSVP.Promise((resolve, reject) => {
      const url = this._getURL(path, pagination);

      this.fetch(url)
        .then((response) => {
          resolve(A(response.data));
        })
        .catch(reject);
    });
  },

  _getURL(path, query = {}) {
    const url = new URL(`${apiHost}${path}`);

    for (const key in query) {
      url.searchParams.append(key, query[key]);
    }

    return url;
  },
});
