import InfinityModel from 'ember-infinity/lib/infinity-model';
import { underscore } from '@ember/string';
import { isEmpty } from '@ember/utils';

export default InfinityModel.extend({
  canLoadMore: true,

  buildParams() {
    const originalParams = this._super(...arguments);
    const params = {};

    for (const key in originalParams) {
      const value = originalParams[key];

      if (isEmpty(value)) continue;
      
      params[underscore(key)] = value;
    }
    
    params['offset'] = (params.page - 1) * params.limit;
    delete params.page;

    return params;
  },
});
