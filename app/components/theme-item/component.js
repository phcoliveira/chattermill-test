import Component from '@ember/component';
import { assert } from '@ember/debug';

export default Component.extend({
  tagName: 'button',
  classNames: ['theme-item', 'list-group-item', 'list-group-item-action'],
  classNameBindings: ['active'],
  attributeBindings: ['type'],

  active: false,
  type: 'button',

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
