import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  infinity: service(),
  chattermillApi: service(),

  async model() {
    return this.infinity.model('/api/reviews', {
      perPage: 20,
      perPageParam: 'limit',
      startingPage: 1,
      themeId: null,
      store: this.chattermillApi
    });
  }
});
