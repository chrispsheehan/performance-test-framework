
# PerformanceTestFramework

## Resources

- [blog](https://medium.com/swlh/beginners-guide-to-load-testing-with-k6-85ec614d2f0d)

## setup

```bash
brew install k6
```

## run locally

```bash
k6 run -u 10 -d 30s script.ts
```

## run via Docker

```bash
docker run -i loadimpact/k6 run - <script.ts
```
