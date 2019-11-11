import Component from '@ember/component';
import { assert } from '@ember/debug';

export default Component.extend({
  classNames: ['theme-list', 'list-group'],

  activeThemeId: null,

  onThemeSelected() {
    assert('Provide an action to "onThemeSelected"');
  },

  actions: {
    themeSelected(theme) {
      let _theme;

      if (this.get('activeThemeId') === theme.id) {
        _theme = null;
      } else {
        _theme = theme;
      }

      this.get('onThemeSelected')(_theme);
    },
  },
});
