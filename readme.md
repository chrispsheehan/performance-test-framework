# PerformanceTestFramework

These example tests are currently pointed at the [MockApp](MockApp), which is hosted in Docker.

To target another URI remove the ``mock`` service and set the ``APP_DOMAIN`` environmental variable within the [docker-compose](docker-compose.yaml) file.

References:

- [TypeScript](https://www.typescriptlang.org/)
- [k6](https://k6.io/)
- [Example](https://github.com/go-automate/k6-typescript-framework)
- [Using node modules i.e. faker](https://github.com/k6io/template-es6)
- [Mock api repository](https://github.com/chrispsheehan/simple-mock)

## Run in docker-compose

- The below command will;
  - Start a target mock api
  - Build the test code
  - Execute the tests via k6

```bash
docker-compose run builder

docker-compose run --rm k6-runner && docker-compose stop
```

## ..OR run in docker

```bash
docker run -i --rm -v ${PWD}/:/app node:16.5-alpine npm run build --prefix /app

docker run -i --rm -v ${PWD}/dist:/dist -e APP_DOMAIN=http://localhost:8080 loadimpact/k6 run /dist/tests.js --config /dist/options/smoke.json
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
