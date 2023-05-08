@echo off

REM git remote add gitlink https://gitlink.org.cn/xieguigang/GCModeller-Cloud.git

git pull gitlink HEAD
git pull origin HEAD

git push gitlink HEAD
git push origin HEAD