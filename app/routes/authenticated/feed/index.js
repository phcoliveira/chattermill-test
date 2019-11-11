import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import RSVP from 'rsvp';

import ChattermillInfinityModel from '../../../infinity-models/chattermill';

export default Route.extend({
  infinity: service(),
  chattermillApi: service(),

  queryParams: {
    themeId: {
      refreshModel: true,
      replace: true,
    },
  },

  async model(params) {
    const { themeId } = params;
    const infinityModel = ChattermillInfinityModel.extend();
    const model = this.get('controller.model');

    const hash = {
      reviews: this.infinity.model(
        '/api/reviews',
        {
          perPage: 20,
          perPageParam: 'limit',
          startingPage: 1,
          themeId,
          store: this.chattermillApi,
        },
        infinityModel,
      ),
    };

    if (isPresent(model)) {
      // hash.themes = RSVP.resolve(model.themes);
      hash.themes = model.themes;
    } else {
      hash.themes = this.infinity.model(
        '/api/themes',
        {
          perPage: 20,
          perPageParam: 'limit',
          startingPage: 1,
          store: this.chattermillApi,
        },
        infinityModel,
      );
    }

    return RSVP.hash(hash);
  },
});
