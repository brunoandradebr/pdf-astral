#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git checkout -b master
git add -A
git commit -m 'deploy'

git push -f git@github.com:brunoandradebr/pdf-astral.git master:page

cd -

rm -fr dist