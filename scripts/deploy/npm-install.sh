#!/bin/bash
cd /home/gcc_website
npm run babel
npm run webpack
npm run test
npm run esdoc
