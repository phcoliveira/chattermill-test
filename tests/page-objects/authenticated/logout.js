import { visit } from '@ember/test-helpers';

export default {
  routeName: 'authenticated.logout',
  
  async visit() {
    await visit('/logout');
  },
};