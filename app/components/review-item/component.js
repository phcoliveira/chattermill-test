import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import RSVP from 'rsvp';


export default Component.extend({
  tagName: 'li',
  classNames: ['review-item', 'list-group-item'],

  chattermillApi: service(),

  init() {
    this._super(...arguments);

    // this._getThemes();
  },
  
  /**
   * @public
   * @required
   */
  review: null,

  themes: computed({
    get() {
      return A();
    },

    set(key, value) {
      return value;
    }
  }),

  // didReceiveAttrs() {
  //   const oldReview = this.get('review');

  //   this._super(...arguments);

  //   const newReview = this.get('review');

  //   if (oldReview !== newReview) {
  //     this._getThemes();
  //   }
  // },

  // _getThemes() {
  //   const review = this.get('review');
  //   const chattermillApi = this.get('chattermillApi');
  //   const promises = review.themes.map((theme) => {
  //     return chattermillApi.find('/api/themes', theme.theme_id);
  //   });

  //   RSVP.all(promises).then((themes) => {
  //     this.set('themes', themes);
  //   });
  // }
});
