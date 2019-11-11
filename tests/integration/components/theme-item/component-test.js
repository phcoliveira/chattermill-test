import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

import page from '../../../page-objects/components/theme-item';

module('Integration | Component | theme-item', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function(assert) {
    this.server.loadFixtures();
    const theme = this.server.schema.themes.first();

    this.set('theme', theme.attrs);
    await render(hbs`{{theme-item theme=theme activeThemeId=1}}`);

    assert.dom(page.self).exists();
  });
});
