import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  infinity: service(),

  queryParams: { themeId: 'theme' },

  themeId: null,

  actions: {
    loadMore(resources) {
      this.get('infinity').infinityLoad(resources);
    },

    setTheme(resource) {
      this.set('themeId', resource && resource.id);
    },
  },
});
