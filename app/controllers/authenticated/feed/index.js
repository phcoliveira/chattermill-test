import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  infinity: service(),

  queryParams: { themeId: 'theme' },

  themeId: null,

  _themeId: computed('themeId', function() {
    return parseInt(this.get('themeId'));
  }),

  actions: {
    loadMore(resources) {
      this.get('infinity').infinityLoad(resources);
    },

    setTheme(resource) {
      this.set('themeId', resource && resource.id.toString());
    },
  },
});
