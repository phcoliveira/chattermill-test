import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  username: (i) => `username${i}`,
  password: (i) => `password${i}`,
});
