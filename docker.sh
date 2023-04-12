#!/bin/bash

docker stop biocad_web
docker rm biocad_web

mkdir /tmp/biocad_tmp2
mkdir /tmp/apache

docker run -itd --name biocad_web \
    --cap-add SYS_ADMIN --device /dev/fuse --security-opt apparmor=unconfined \
    --privileged=true \
    -v "$(which docker):/bin/docker" \
    -v "/var/run/docker.sock:/run/docker.sock" \
    -v "/tmp/biocad_tmp2:/tmp:rw" \
    -v "/tmp/apache/:/tmp/apache/:rw" \
    -v "/opt/biocad/framework/php.NET/:/opt/runtime/:ro" \
    -v "/opt/biocad/framework/MaxMind/:/opt/vendor/MaxMind/:ro" \
    -v "/opt/biocad/repository/:/opt/repository/:ro" \
    -v "/opt/biocad/src/:/var/www/html/:ro" \
    -v "/opt/biocad/src/web/resources/fonts/:/var/www/html/web/resources/styles/fonts/:ro" \
    -v "/opt/biocad/src/.etc:/etc/httpd/vhost" \
    -v "/mnt/biocad_cloud:/mnt/biocad_cloud:rw" \
    -v "/opt/GeoIP:/usr/local/share/GeoIP/:ro" \
    -p 8848:80 \
    -p 8843:443 \
    web_env:php /usr/sbin/init

docker exec -it biocad_web systemctl restart httpd