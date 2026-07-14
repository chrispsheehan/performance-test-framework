set shell := ["zsh", "-cu"]

build:
  npm ci
  npm run build

up:
  docker compose up --build -d mock

run: build
  docker compose run --rm k6-runner

down:
  docker compose down

smoke: up run down
