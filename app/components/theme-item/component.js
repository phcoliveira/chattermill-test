import Component from '@ember/component';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'button',
  classNames: ['theme-item', 'list-group-item', 'list-group-item-action'],
  classNameBindings: ['active'],
  attributeBindings: ['type'],

  type: 'button',

  /**
   * @public
   * @required
   */
  theme: null,

  /**
   * @public
   * @required
   */
  activeThemeId: null,

  active: computed('activeThemeId', function() {
    const theme = this.get('theme');
    const activeThemeId = this.get('activeThemeId');

    return parseInt(theme.id) === activeThemeId;
  }),

  click() {
    this.send('clicked', this.get('theme'));
  },

  onClick() {
    assert('Provide an action to "onClick"');
  },

  actions: {
    clicked(theme) {
      this.get('onClick')(theme);
    },
  },
});
