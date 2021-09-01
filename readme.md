# PerformanceTestFramework

These example tests are currently pointed at the [MockApp](MockApp), which is hosted in Docker.

To target another URI remove the ``mockapp`` service and set the ``APP_DOMAIN`` environmental variable within the [docker-compose](docker-compose.yaml) file. As per [example](docker-compose.yaml.example).

References:

- [TypeScript](https://www.typescriptlang.org/)

- [k6](https://k6.io/)

- [Example](https://github.com/go-automate/k6-typescript-framework)

- [Using node modules i.e. faker](https://github.com/k6io/template-es6)

## Run locally

```bash
npm run build

APP_DOMAIN=http://localhost:8080 k6 run dist/tests.js --config dist/options/smoke.json --http-debug
```

## Run in docker

```bash
docker-compose run k6 run /dist/tests.js --config /dist/options/smoke.json --http-debug
```

## Example output

```javascript
     █ setup

     █ create user

       ✓ get user

     █ get users

       ✓ get users

     █ teardown

     checks.........................: 100.00% ✓ 2 ✗ 0
     data_received..................: 879 B   12 kB/s
     data_sent......................: 542 B   7.1 kB/s
     group_duration.................: avg=20.93ms min=3.75ms  med=20.93ms max=38.11ms p(90)=34.67ms  p(95)=36.39ms
     http_req_blocked...............: avg=674.5µs min=2µs     med=674.5µs max=1.34ms  p(90)=1.21ms   p(95)=1.27ms 
     http_req_connecting............: avg=177µs   min=0s      med=177µs   max=354µs   p(90)=318.6µs  p(95)=336.3µs
     http_req_duration..............: avg=19.16ms min=3.36ms  med=19.16ms max=34.96ms p(90)=31.8ms   p(95)=33.38ms
       { expected_response:true }...: avg=19.16ms min=3.36ms  med=19.16ms max=34.96ms p(90)=31.8ms   p(95)=33.38ms
     ✓ { tag:createuser }...........: avg=34.96ms min=34.96ms med=34.96ms max=34.96ms p(90)=34.96ms  p(95)=34.96ms
     ✓ { tag:getuser }..............: avg=3.36ms  min=3.36ms  med=3.36ms  max=3.36ms  p(90)=3.36ms   p(95)=3.36ms 
     http_req_failed................: 0.00%   ✓ 0 ✗ 2
     ✓ { tag:createuser }...........: 0.00%   ✓ 0 ✗ 1
     ✓ { tag:getuser }..............: 0.00%   ✓ 0 ✗ 1
     http_req_receiving.............: avg=155µs   min=135µs   med=155µs   max=175µs   p(90)=170.99µs p(95)=173µs  
     http_req_sending...............: avg=56µs    min=14µs    med=56µs    max=98µs    p(90)=89.6µs   p(95)=93.8µs 
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=18.95ms min=3.21ms  med=18.95ms max=34.69ms p(90)=31.54ms  p(95)=33.12ms
     http_reqs......................: 2       26.252921/s
     iteration_duration.............: avg=13.99ms min=2.28µs  med=26.92µs max=41.94ms p(90)=33.55ms  p(95)=37.75ms
     iterations.....................: 1       13.12646/s
```

## Tags

Tags are used to separate results from one another as documented [here](https://k6.io/docs/using-k6/tags-and-groups/#tags).

```ts
headers.tags = { tag: "getuser" };
```

## Thresholds

Thresholds are set on a per tag basis as documented [here](https://k6.io/docs/using-k6/thresholds/#thresholds-on-tags).

- **p(95)<2000** 95% of requests to run in 5 seconds or less.
- **rate<=0.01** 99% of requests successful.

```ts
export let options = {
  
  thresholds: {
    "http_req_duration{tag:getuser}": ['p(95)<10000'],
    "http_req_failed{tag:getuser}": ['rate<=0.01'],

    "http_req_duration{tag:createuser}": ['p(95)<2000'],
    "http_req_failed{tag:createuser}": ['rate<=0.01'],    
  },
};
```
