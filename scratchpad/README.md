# Scratch Pad

## Setup
- [Install k6](https://k6.io/docs/getting-started/installation/) 
- [Create a basic GetSandbox API](https://getsandbox.com/docs/getting-started).
- Replace `[APIUrl]` found within `/sratchpad/scratch.tests.ts` with the newly created API url.


## Build it
```bash
cd scratchpad

npm run build
```

## Run it
```bash
k6 run ./dist/scratchTests.js
```
