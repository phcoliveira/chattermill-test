import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  code: 200,
  expire: () => {
    const expire = new Date((new Date()).getTime() + (3600 * 1000));
    return expire.toISOString();
  },
  token: (i) => {
    return `header${i}.payload.signature`;
  }
});
