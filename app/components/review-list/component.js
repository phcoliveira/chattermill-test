import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'ul',
  classNames: ['review-list', 'list-group', 'list-group-flush'],

  /**
   * @public
   * @required
   */
  reviews: null,

  /**
   * @public
   * @required
   */
  activeThemeId: null,

  _activeThemeId: computed('activeThemeId', function() {
    return parseInt(this.get('activeThemeId'));
  })
});
