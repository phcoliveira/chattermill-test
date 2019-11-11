import Component from '@ember/component';

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
});
