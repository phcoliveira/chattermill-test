import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | locale-string', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const date = new Date();

    this.set('date', date.toISOString());

    await render(hbs`{{locale-string date}}`);

    assert.equal(this.element.textContent.trim(), date.toLocaleString());
  });
});
