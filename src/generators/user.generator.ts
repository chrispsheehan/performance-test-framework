import * as faker from 'faker/locale/en_GB';

import User from './types/User';

export function buildUser () : User {
    
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }
}