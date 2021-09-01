import { check, group } from 'k6';
import { Params } from 'k6/ws';

import { createUser, getUsers } from './actions.user/request.user';
import { createRequestConfig } from './lib/request.helper';

export let options = {
  
  thresholds: {
    "http_req_duration{tag:createuser}": ['p(95)<2000'],
    "http_req_failed{tag:createuser}": ['rate<=0.01'],

    "http_req_duration{tag:getuser}": ['p(95)<2000'],
    "http_req_failed{tag:getuser}": ['rate<=0.01'],
  },
};

export function setup() {

  const headers = createRequestConfig();

  return headers;
}

export default (_headers: Params) => {

  group('create user', () => {

    let res = createUser(__ENV.APP_DOMAIN, _headers);

    check(res, { 
      'get user': (r) => r.status === 201 
    });
  });

  group('get users', () => {

    let res = getUsers(__ENV.APP_DOMAIN, _headers);

    check(res, {
      'get users': (r) => r.status === 200
    });
  });
}

export function teardown() {
}
