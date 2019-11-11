import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

import page from '../../../page-objects/components/review-list';

module('Integration | Component | review-list', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function(assert) {
    this.set('reviews', []);
    await render(hbs`{{review-list reviews=reviews activeThemeId=1}}`);

    assert.dom(page.self).exists();
  });
});
