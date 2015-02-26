#!/bin/bash

LOCAL_DOMAIN=$1

brew install nginx
mkdir /usr/local/etc/nginx/conf.d
mkdir /usr/local/etc/nginx/sites-{enabled,available}
mv /usr/local/etc/nginx/nginx.conf /usr/local/etc/nginx/nginx.conf.bak
cp ./nginx.conf /usr/local/etc/nginx/nginx.conf
./setup-nginx-config.sh $LOCAL_DOMAIN
./modify-hosts.sh $LOCAL_DOMAIN
sudo nginx -s stop
sudo nginx