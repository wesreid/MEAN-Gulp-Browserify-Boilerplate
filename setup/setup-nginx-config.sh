#!/bin/bash
GENERIC_CONF=`cat local.your-domain-name.com.conf`
LOCAL_CONF=${GENERIC_CONF//\<path_to\>/$(pwd)}
LOCAL_CONF=${LOCAL_CONF//\<local_domain\>/$1}
rm /usr/local/etc/nginx/conf.d/${1}.conf
echo "$LOCAL_CONF" >> /usr/local/etc/nginx/conf.d/${1}.conf
