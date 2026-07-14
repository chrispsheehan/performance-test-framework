declare module 'k6/x/faker' {
  interface PersonApi {
    firstName(): string;
    lastName(): string;
  }

  interface FakerApi {
    person: PersonApi;
  }

  const faker: FakerApi;

  export default faker;
}
