#!/bin/bash
if [[ -n "${LOCAL_DIST_SOURCE:-}" ]]; then
  if [[ ! -d "$LOCAL_DIST_SOURCE" ]]; then
    echo "LOCAL_DIST_SOURCE does not exist: $LOCAL_DIST_SOURCE" >&2
    exit 1
  fi
  find /dist -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
  cp -a "$LOCAL_DIST_SOURCE"/. /dist/
fi
sed -i "s#appcode#$APPCODE#g" /etc/nginx/conf.d/nginx.conf
IFS=$'\n'
for line in `cat /environment.config`
do
  key=`echo $line | awk -F : '{print $1}'`
  value=`echo $line | awk -F : '{print $2}'`
  #env_value=`env | grep -w $value | awk -F = '{print $2}'`
  env_value=`env | grep -w $value | sed "s/$value=//"`
  if [[ $env_value != "" ]];then
    sed -i "/$key/d" /dist/environments/environment.js
    if [[ $env_value != "true" && $env_value != "false" ]];then
      sed -i "/window.Environment/a \  $key: '$env_value'," /dist/environments/environment.js
    else
      sed -i "/window.Environment/a \  $key: $env_value," /dist/environments/environment.js
    fi
  fi
done
# nginx启动
nginx -g "daemon off;"
