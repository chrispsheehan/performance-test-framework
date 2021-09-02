import { check, group } from 'k6';
import http from 'k6/http';
import { Params } from 'k6/ws';

export let options = {
  
  vus: 1,
  interations: 1,
  thresholds: {
    "http_req_duration": ['p(95)<2000'],
    "http_req_failed": ['rate<=0.01'],
  },
};

let token = "somethingverysecret";
//default blank getsandbox api
let _url = "https://misty-paper-8673.getsandbox.com"

export function setup() {

  const headers = { 
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  return headers;
}

export default (_headers: Params) => {

  group('create user', () => {

    console.log('Headers ' + JSON.stringify(_headers));

    let res = http.get(`${_url}/users`, _headers); 

    check(res, { 
      'get user': (r) => r.status === 200
    });
  });
}

export function teardown() {
}
