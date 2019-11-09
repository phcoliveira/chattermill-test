import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession, currentSession } from 'ember-simple-auth/test-support';

import page from '../../page-objects/authenticated/logout';

module('Acceptance | authenticated/logout', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /authenticated/logout', async function(assert) {
    const session = { token: `${Math.random()}` };
    
    await authenticateSession(session);
    assert.equal(currentSession().data.authenticated.token, session.token);

    try {
      await page.visit();
    } catch (error) {
      assert.equal(error.message, 'TransitionAborted');
    }

    assert.notOk(currentSession().data.authenticated.token);
  });
});
