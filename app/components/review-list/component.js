import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  tagName: 'ul',
  classNames: ['review-list', 'list-group', 'list-group-flush'],

  // reviews: computed(function() {
  //   return A();
  // }),
});
