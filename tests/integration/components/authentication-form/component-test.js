import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, fillIn, waitFor } from '@ember/test-helpers';
import Service from '@ember/service';
import sinon from 'sinon';

import page from '../../../page-objects/components/authentication-form';

module('Integration | Component | authentication-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{authentication-form}}`);

    assert.dom(page.self).exists({ count: 1 });
  });

  module('initial state', function(hooks) {
    hooks.beforeEach(async function() {
      await render(hbs`{{authentication-form}}`);
    });

    test('there should not be any error messages', async function(assert) {
      assert.dom(page.errorMessage).doesNotExist();
    });

    test('input username is empty', async function(assert) {
      assert.dom(page.usernameInput).hasNoValue();
    });

    test('input password is empty', async function(assert) {
      assert.dom(page.passwordInput).hasNoValue();
    });

    test('submit button must be disabled', async function(assert) {
      assert.dom(page.submitButton).isDisabled();
    });
  });

  module('valid state', function(hooks) {
    hooks.beforeEach(async function() {
      await render(hbs`{{authentication-form}}`);
    });

    test('submit button must be enabled', async function(assert) {
      await fillIn(page.usernameInput, 'valid.username');
      await fillIn(page.passwordInput, 'valid.password');

      assert.dom(page.submitButton).isNotDisabled();
    });
  });

  // NOTE: Validations were implemented in a declarative way by using three
  // dependencies, see chattermill-test/app/validations/login.js
  // Ember-Changeset,
  // Ember-Changeset-Validations and
  // Ember-Boostrap-Changeset-Validations.
  //
  // While their implementation should not be tested, the business logic behind
  // the need of having such validations can be tested and used as documentation.
  //
  // The instructions for this coding test didn't mention any restrictions the
  // login page should enforce, so there will not be any tests about them.
  //
  // It is worth noting that Ember's integration tests are relatable to React's
  // "mount" strategy, in which child components are also rendered. This strategy
  // is important because, should a component be composed of other components,
  // we should also test its composing responsibility.
  //
  // module('invalid state', function() {
  // ...
  // });

  module('submitting the form', function() {
    test('submitting the form should call "service:session#authenticate"', async function(assert) {
      const authenticate = sinon.spy();
      const sessionService = Service.extend({ authenticate });
      
      this.owner.register('service:session', sessionService);
      await render(hbs`{{authentication-form}}`);

      const credentials = {
        username: 'valid.username',
        password: 'valid.password',
      };

      await page.submit(credentials);

      assert.ok(authenticate.calledOnceWith('authenticator:chattermill', credentials));
    });

    test('an error message from the server should be displayed', async function(assert) {
      const errorMessage = 'Some error message';
      const authenticate = sinon.stub().rejects(errorMessage);
      const sessionService = Service.extend({ authenticate });
      const credentials = {
        username: 'invalid.username',
        password: 'invalid.password',
      };
      
      this.owner.register('service:session', sessionService);
      
      await render(hbs`{{authentication-form errorMessageTimeout=1}}`);
      page.submit(credentials);
      await waitFor(page.errorMessage);

      assert.dom(page.errorMessage).hasText(errorMessage);
    });
  });
});
