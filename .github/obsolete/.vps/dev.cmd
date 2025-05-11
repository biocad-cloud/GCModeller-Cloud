@echo off
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
set "{{=setlocal enableDelayedExpansion&for %%a in (" & set "}}="::end::" ) do if "%%~a" neq "::end::" (set command=!command! %%a) else (call !command! & endlocal)"
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

docker stop biocad_web
docker rm biocad_web

SET proj_root=F:/bioCAD
SET dev_tmp=%proj_root%/.vps/tmp

echo "project source repository root:"
echo %proj_root%
echo "vps development dir:"
echo %dev_tmp%

echo "start to create the dev folders:"

mkdir "%dev_tmp%"
mkdir "%dev_tmp%/biocad_tmp2"
mkdir "%dev_tmp%/apache"
mkdir "%proj_root%/.vps/mnt"

echo "init docker container for the httpd web..."

%{{%

    docker run -itd --name biocad_web --cap-add SYS_ADMIN --device /dev/fuse "--privileged=true"    
    -v "%dev_tmp%/biocad_tmp2:/tmp" 
    -v "%dev_tmp%/apache:/tmp/apache/" 
    -v "%proj_root%/framework/php.NET/:/opt/runtime/" 
    -v "%proj_root%/framework/MaxMind/:/opt/vendor/MaxMind/" 
    -v "%proj_root%/repository/:/opt/biocad/biocad_registry/" 
    -v "%proj_root%/:/opt/biocad/biocad_cloud/" 
    -v "%proj_root%/src/web/resources/fonts/:/opt/biocad/biocad_cloud/web/resources/styles/fonts/" 
    -v "%proj_root%/.vps/vhost:/etc/httpd/vhost" 
    -v "%proj_root%/.vps/mnt:/mnt/biocad_cloud" 
    -p 8848:80 
    -p 8843:443 
    centos:php8 /usr/sbin/init

%}}%

echo "start target web server!"

docker exec -it biocad_web systemctl restart httpd
docker exec -it biocad_web /bin/bash
docker exec -it biocad_web cat /var/log/httpd/biocad_error.log

pause