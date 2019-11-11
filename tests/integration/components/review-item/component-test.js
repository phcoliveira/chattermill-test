import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';
import sinon from 'sinon';
import RSVP from 'rsvp';

import page from '../../../page-objects/components/review-item';

module('Integration | Component | review-item', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function(assert) {
    const chattermillApi = this.owner.lookup('service:chattermill-api');
    const stub = sinon.stub(chattermillApi, 'find').callsFake(() => RSVP.resolve([]));
    const review = this.server.create('review', { themes: [] });

    this.set('review', review.attrs);
    await render(hbs`{{review-item review=review activeThemeId=review.id}}`);

    assert.dom(page.self).exists();
    stub.restore();
  });
});
