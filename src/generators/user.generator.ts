import * as faker from 'faker/locale/en';

import { getFakedDob } from './dob.generator';
import { createUuid } from './uuid.generator';
import User from './types/User';


export function buildUser () : User {
    
    return {
        id: createUuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: getFakedDob(),
        emailAddress: faker.internet.exampleEmail(),
        addressLine1: faker.address.streetAddress(),
        addressLine2: faker.address.streetSuffix(),
        cityName: faker.address.city(),
        countyName: faker.address.county(),
        postCode: faker.address.zipCode(),
        countryCode: faker.address.countryCode('alpha-3')
    }
}