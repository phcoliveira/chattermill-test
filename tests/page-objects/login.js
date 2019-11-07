import { visit } from '@ember/test-helpers';

import authenticationForm from './components/authentication-form';

export default {
  ...authenticationForm,

  routeName: 'login',
  
  async visit() {
    await visit('/login');
  },
};