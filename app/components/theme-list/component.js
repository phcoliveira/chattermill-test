import Component from '@ember/component';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['theme-list', 'list-group'],

  activeThemeId: null,
  _activeThemeId: computed('activeThemeId', function() {
    return parseInt(this.get('activeThemeId'));
  }),

  onThemeSelected() {
    assert('Provide an action to "onThemeSelected"');
  },

  actions: {
    themeSelected(theme) {
      let _theme;

      if (this.get('_activeThemeId') === theme.id) {
        _theme = null;
      } else {
        _theme = theme;
      }

      this.get('onThemeSelected')(_theme);
    },
  },
});
