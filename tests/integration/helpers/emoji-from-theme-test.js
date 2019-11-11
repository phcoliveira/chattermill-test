import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import faker from 'faker';

module('Integration | Helper | emoji-from-theme', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const sentiment = faker.random.arrayElement([-1, 0, 1]);

    this.set('theme', { sentiment });
    await render(hbs`{{emoji-from-theme theme}}`);

    const emoji = this.element.textContent.trim();

    assert.ok(emoji.match(/^:\w+:/));
  });
});
