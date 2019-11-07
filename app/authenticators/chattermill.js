import Base from 'ember-simple-auth/authenticators/base';
import { scheduleOnce, later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Base.extend({
  chattermillApi: service(),

  // NOTE: New tabs might be able to restore the session if it is not yet
  // expired. They can not, however, refresh the session because only the
  // original one holds the "credentials" in memory.
  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      const now = new Date();
      const expire = new Date(data.expire);

      if (now < expire) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  
  // NOTE: In a true OAuth implementation, it must be possible to use a refresh
  // token to get a new access token. The refresh token can be kept in the
  // browser for the current session or for an extended period of time.
  //
  // However, this demonstration can only get a new access token by supplying
  // a pair of credentials formed by "username" and "password".
  //
  // While it is acceptably safe to keep a refresh token in the browser, saving
  // the user's password in a cookie or in storage is far less acceptable.
  //
  // Support for "Broadcast Channel" is arguably limited, but it could be used.
  // The same can be said about "Shared Workers".
  // https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel
  // https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker
  //
  // That way, only the tab on which the user has been authenticated will be
  // able to maintain the session by refreshing it.
  //
  authenticate(credentials) {
    return new RSVP.Promise((resolve, reject) => {
      this._getSession(credentials)
        .then((session) => {
          this._scheduleRefreshSession(session, credentials);
          scheduleOnce('afterRender', null, resolve, session);
        })
        .catch((error) => {
          scheduleOnce('afterRender', null, reject, error);
        });
    });
  },

  invalidate(data) {
    return RSVP.resolve(data);
  },

  _getSession(credentials) {
    const endpoint = '/login';
    const method = 'POST';

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };

    const body = Object.keys(credentials).map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(credentials[key])}`;
    }).join('&');

    const options = { method, headers, body };
  
    return this.get('chattermillApi').fetch(endpoint, options);
  },
  
  // NOTE: It must be a random value to prevent multiple tabs firing all at once.
  // The offset period is from 1 to 5 minutes before the session expires.
  get _refreshOffset() {
    return (Math.floor(Math.random() * 240) + 60) * 1000;
  },

  _scheduleRefreshSession(session, credentials) {
    const expire = (new Date(session.expire)).getTime();
    const now = (new Date()).getTime();
    const offset = this.get('_refreshOffset');
    const duration = expire - offset - now;

    if (duration > 0) {
      later(this, '_refreshSession', credentials, duration);
    }
  },

  _refreshSession(credentials) {
    this._getSession(credentials)
      .then((session) => {
        this.trigger('sessionDataUpdated', session);
        this._scheduleRefreshSession(session, credentials);
      });
  } 
});
