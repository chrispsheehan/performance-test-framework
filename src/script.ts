import { check } from "k6";
import http from "k6/http";

const BASE_URI = 'http://localhost:3000'

export let options = {

  thresholds: {

    http_req_failed: ['rate<0.01'],   // http errors should be less than 1% 

    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms

  },

};

export default function() {

  let res = http.get(`${BASE_URI}/`);

  check(res, {
    "is status 200": (r) => r.status === 200
  });

  check(res, {
    "json": (r) => r.body === 200
  });  
};