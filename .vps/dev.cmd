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

docker run -itd --name biocad_web 
    --cap-add SYS_ADMIN --security-opt apparmor=unconfined 
    --privileged=true 
    -v "%dev_tmp%/biocad_tmp2:/tmp:rw" 
    -v "%dev_tmp%/apache:/tmp/apache/:rw" 
    -v "%proj_root%/framework/php.NET/:/opt/runtime/:ro" 
    -v "%proj_root%/framework/MaxMind/:/opt/vendor/MaxMind/:ro" 
    -v "%proj_root%/repository/:/opt/biocad/biocad_registry/:ro" 
    -v "%proj_root%/:/opt/biocad/biocad_cloud/:ro" 
    -v "%proj_root%/src/web/resources/fonts/:/opt/biocad/biocad_cloud/web/resources/styles/fonts/:ro" 
    -v "%proj_root%/.vps/vhost:/etc/httpd/vhost" 
    -v "%proj_root%/.vps/mnt:/mnt/biocad_cloud:rw" 
    -p 8848:80 
    -p 8843:443 
    ubuntu:php8 /usr/sbin/init

%}}%

echo "start target web server!"

docker exec -it biocad_web systemctl restart apache2

pause