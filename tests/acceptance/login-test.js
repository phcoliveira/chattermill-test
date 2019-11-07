import { module, test } from 'qunit';
import { currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import {
  // currentSession,
  authenticateSession,
  // invalidateSession
} from 'ember-simple-auth/test-support';

import page from '../page-objects/login';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  test('An unauthenticated user should be able to visit it', async function(assert) {
    await page.visit();

    assert.equal(currentRouteName(), page.routeName);
  });

  test('An authenticated user should not be able to visit it', async function(assert) {
    await authenticateSession();
    await page.visit();

    assert.notEqual(currentRouteName(), page.routeName);
  });

  // test('Logging in should be redirect the user', async function() {
  //   await page.visit();


  // })
});
