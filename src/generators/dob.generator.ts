
import { convertDate } from '../lib/date.helper';
import * as faker from 'faker/locale/en';

const startEndBirthDate = '-01-01';
const minimumAge = 18;
const maximumAge = 101;
const currentYear = (new Date()).getFullYear();


export function getFakedDob() {

    const oldestDob = `${currentYear-maximumAge}${startEndBirthDate}`;
    const youngestDob = `${currentYear-minimumAge}${startEndBirthDate}`;

    const fakedDobDate = faker.date.between(oldestDob, youngestDob);
    return convertDate(fakedDobDate);
}