import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { debounce } from '@ember/runloop';
import { isPresent } from '@ember/utils';
import { task } from 'ember-concurrency';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

import loginValidator from '../../validations/login';

export default Component.extend({
  session: service(),
  
  init() {
    this._super(...arguments);

    this.set('credentials', {
      username: '',
      password: '',
    });

    const credentials = this.get('credentials');
    const changeset = new Changeset(
      credentials,
      lookupValidator(loginValidator),
      loginValidator,
    );

    this.set('changeset', changeset);
    changeset.validate();
  },

  loginValidator,
  changeset: null,
  credentials: null,

  errorMessage: computed({
    get() {
      return '';
    },
    set(key, value) {
      if (isPresent(value)) {
        debounce(this, 'set', 'errorMessage', '', 5000);
      }

      return value;
    }
  }),

  loginDisabled: or(
    'changeset.isPristine',
    'changeset.isInvalid',
    'authenticateTask.isRunning',
  ),

  authenticateTask: task(function * () {
    try {
      const credentials = this.get('credentials');
      
      yield this.get('changeset').save();
      yield this.session.authenticate('authenticator:chattermill', credentials);
    } catch (error) {
      this.set('errorMessage', error);
    }
  }),
});
