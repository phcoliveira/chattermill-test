import {
  validatePresence,
  validateLength,
} from 'ember-changeset-validations/validators';

export default {
  username: [
    validatePresence(true),
    validateLength({ min: 3 }),
  ],
  password: [
    validatePresence(true),
    validateLength({ min: 6 }),
  ],
};