import faker from 'k6/x/faker';
import type User from './types/User.js';

export function buildUser () : User {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
}
