import { click, fillIn } from '@ember/test-helpers';
import { isPresent } from '@ember/utils';

export default {
  form: '[data-test-form="authentication"]',
  usernameInput: '[data-test-input="username"]',
  passwordInput: '[data-test-input="password"]',
  submitButton: '[data-test-button="submit"]',
  errorMessage: '[data-test-text="error-message"]',

  async submit(credentials = {}) {
    const { username, password } = credentials;
    
    if (isPresent(username)) {
      await fillIn(this.usernameInput, username);
    }

    if (isPresent(password)) {
      await fillIn(this.passwordInput, password);
    }

    await click(this.submitButton);
  }
};