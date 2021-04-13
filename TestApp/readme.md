# PerformanceTestFramework

## Resources

[Guide to install](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

## Run it

```bash
docker build -t node-web-app .
docker run -p 49160:8080 -d node-web-app
```

## Check it

```bash
curl -i localhost:49160 
```
