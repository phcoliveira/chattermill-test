import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  chattermillApi: service(),

  async model() {
    const body = await this.get('chattermillApi').fetch('/api/reviews');
    return body.data;
  }
});
