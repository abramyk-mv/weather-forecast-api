#! /bin/sh

set -e

export NODE_ENV='test'

npm run db:init
npm run migration:run

mocha \
  --recursive \
  --file ./tests/index.js \
  --async-only \
  --watch tests \
  "$@"
