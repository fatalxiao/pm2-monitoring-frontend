#!/usr/bin/env bash

pm2 delete pm2-monitoring-frontend

# replace files
if [ -a ./pm2-monitoring-frontend ]
then
    rm -rf pm2-monitoring-frontend
fi
unzip pm2-monitoring-frontend.zip

# start server
cd pm2-monitoring-frontend
npm i
pm2 start
