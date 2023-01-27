# PerformanceTestFramework

These example tests are currently pointed at the [MockApp](MockApp), which is hosted in Docker.

To target another URI remove the ``mockapp`` service and set the ``APP_DOMAIN`` environmental variable within the [docker-compose](docker-compose.yaml) file. As per [example](docker-compose.yaml.example).

References:

- [TypeScript](https://www.typescriptlang.org/)

- [k6](https://k6.io/)

- [Example](https://github.com/go-automate/k6-typescript-framework)

- [Using node modules i.e. faker](https://github.com/k6io/template-es6)

## Run in docker-compose

```bash
docker-compose run --rm k6-runner && docker-compose stop
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
