import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { authenticateSession, invalidateSession } from 'ember-simple-auth/test-support';

import page from '../page-objects/login';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function() {
    await invalidateSession();
  });

  test('An unauthenticated user should be able to visit it', async function(assert) {
    await page.visit();

    assert.equal(currentRouteName(), page.routeName);
  });

  test('An authenticated user should not be able to visit it', async function(assert) {
    const session = { token: 'secret' };
    await authenticateSession(session);
    await page.visit();

    assert.notEqual(currentRouteName(), page.routeName);
  });

  test('Logging in should redirect the user', async function(assert) {
    const credentials = this.server.create('credential');

    await page.visit();
    await page.submit(credentials);

    assert.notEqual(currentRouteName(), page.routeName);
  });
});
