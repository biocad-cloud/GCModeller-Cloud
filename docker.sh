#!/bin/bash

docker stop biocad_web
docker rm biocad_web

docker run -itd --name biocad_web \
    --cap-add SYS_ADMIN --device /dev/fuse --security-opt apparmor=unconfined \
	--privileged=true \
	-v "$(which docker):/bin/docker" \
	-v "/var/run/docker.sock:/run/docker.sock" \
    -v "/tmp/biocad_tmp2:/tmp:rw" \
	-v "/tmp/apache/:/tmp/apache/:rw" \
	-v "/opt/biocad/src/web:/var/www/html/:r" \
	-v "/opt/biocad/src/.etc/apache.conf:/etc/httpd/vhost/biocad.conf" \
	-p 8848:80 \
	-p 8843:443 \
	web_env:php /usr/sbin/init

docker exec -it biocad_web systemctl restart httpd