# PerformanceTestFramework

These example tests are currently pointed at the local mock service in [`mock/`](mock), which is built and run via Docker Compose.

To target another URI remove the `mock` service and set the `APP_DOMAIN` environmental variable within [compose.yaml](compose.yaml).

This project now uses `tsc` directly for the k6 test build. Test data generation comes from the k6-native [`xk6-faker`](https://faker.x.k6.io/) extension rather than a bundled npm Faker package. The local mock service runs native TypeScript on modern Node without a transpile step.

References:

- [TypeScript](https://www.typescriptlang.org/)
- [Grafana k6 docs](https://grafana.com/docs/k6/latest/)
- [k6 extensions](https://grafana.com/docs/k6/latest/extensions/)
- [xk6-faker](https://faker.x.k6.io/)
- [k6 modules documentation](https://grafana.com/docs/k6/latest/using-k6/modules/)
- Local mock API: [`mock/server.ts`](mock/server.ts)
- Local task runner: [`justfile`](justfile)

## Build

Use `just` for the normal local workflow:

```bash
just build
```

## Build code in docker

```bash
docker run -i --rm -v ${PWD}/:/app node:20-alpine sh -lc "cd /app && npm ci && npm run build"
```

## Run

- The below command will;
  - Build and start the target mock API
  - Execute the tests via k6

```bash
just smoke
```

Useful individual steps:

```bash
just up
just run
just down
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

## Gotchas

- ERROR: `no matching manifest for linux/arm64/v8 in the manifest list entries`
- FIX: add `platform: linux/x86_64` to the Compose service definition
