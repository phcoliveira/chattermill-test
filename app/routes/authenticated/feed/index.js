import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import ChattermillInfinityModel from '../../../infinity-models/chattermill';

export default Route.extend({
  infinity: service(),
  chattermillApi: service(),

  async model() {
    return this.infinity.model(
      '/api/reviews',
      {
        perPage: 20,
        perPageParam: 'limit',
        startingPage: 2,
        themeId: null,
        store: this.chattermillApi,
      },
      ChattermillInfinityModel.extend(),
    );
  }
});
