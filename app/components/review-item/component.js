import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { A } from '@ember/array';
import { task } from 'ember-concurrency';
import RSVP from 'rsvp';


export default Component.extend({
  tagName: 'li',
  classNames: ['review-item', 'list-group-item'],

  chattermillApi: service(),

  init() {
    this._super(...arguments);

    this.getThemesTask.perform();
  },
  
  /**
   * @public
   * @required
   */
  review: null,

  /**
   * @public
   * @required
   */
  activeThemeId: null,

  themes: reads('review.themes'),

  /**
   * Thew review model does not bring the name of each of its themes.
   * Therefore, each theme is download and stored under this property in order
   * to make its name available.
   */
  loadedThemes: null,

  activeTheme: computed('themes', 'activeThemeId', function() {
    const themes = this.get('themes');
    const activeThemeId = this.get('activeThemeId');

    if (isPresent(themes) && isPresent(activeThemeId)) {
      // NOTE: Each theme has theme_id
      return themes.find((theme) => theme.theme_id === activeThemeId);
    } else {
      return null;
    }
  }),

  otherThemes: computed('themes', 'activeThemeId', 'loadedThemes', function() {
    const themes = this.get('themes');
    const activeThemeId = this.get('activeThemeId');
    const loadedThemes = this.get('loadedThemes');

    if (isPresent(themes) && isPresent(activeThemeId) && isPresent(loadedThemes)) {
      // NOTE: Each theme has theme_id
      const otherThemes = themes.filter((theme) => theme.theme_id !== activeThemeId);

      return otherThemes.map((otherTheme) => {
        return {
          ...otherTheme,
          // NOTE: Each theme has id 
          name: loadedThemes.find((loadedTheme) => loadedTheme.id === otherTheme.theme_id).name
        };
      });
    } else {
      return A();
    }
  }),

  getThemesTask: task(function * () {
    const themes = this.get('themes');
    const chattermillApi = this.get('chattermillApi');
    const promises = themes.map((theme) => {
      return chattermillApi.find('/api/themes', theme.theme_id);
    });

    const loadedThemes = yield RSVP.all(promises);

    this.set('loadedThemes', loadedThemes);
  }).drop(),
});
