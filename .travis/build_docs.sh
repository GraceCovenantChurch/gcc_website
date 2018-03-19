#!/bin/sh

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

git checkout master
npm run esdoc

if [[ -z $(git status -s) ]]
then
  exit
fi

git add docs
git commit --message "Build Documentation - Travis build: $TRAVIS_BUILD_NUMBER"

git remote add origin https://${GH_TOKEN}@github.com/GraceCovenantChurch/gcc_website.git > /dev/null 2>&1
git push --quiet --set-upstream origin master
