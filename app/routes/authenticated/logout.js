import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),

  async beforeModel(transition) {
    await this.get('session').invalidate();
    transition.abort();
  }
});
