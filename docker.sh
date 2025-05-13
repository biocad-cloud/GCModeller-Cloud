#!/bin/bash

# configs for the ubuntu server
# apache2 + php 8.4

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
    -v "/mnt/sdb/bioCAD/:/var/www/html/:ro" \
    -v "/mnt/sdb/bioCAD/etc/vhost/biocad.cloud.conf:/etc/apache2/sites-available/biocad.cloud.conf" \
    -p 80:80 \
    -p 443:443 \
    php:8.4 /usr/sbin/init

# wait container server init
sleep 3
# start web servcies
docker exec -it biocad_web systemctl restart apache2