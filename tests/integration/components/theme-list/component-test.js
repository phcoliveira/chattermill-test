import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

import page from '../../../page-objects/components/theme-list';

module('Integration | Component | theme-list', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function(assert) {
    this.server.loadFixtures();

    const themes = this.server.schema.themes.all();

    this.set('themes', themes.models);
    await render(hbs`
      {{#theme-list themes=themes activeThemeId=1 as |list|}}
        {{list.item}}
      {{/theme-list}}
    `);

    assert.dom(page.self).exists();
    assert.dom(page.items.self).exists({ count: themes.models.length });
  });
});
