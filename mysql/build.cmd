@echo off

set reflector="F:\graphQL\src\mysqli\App\Reflector.exe"
set R_src="F:\biocad_registry\src\mysql"
set R_docs=F:\biocad_registry\src

%reflector% --reflects /sql biocad_registry.sql -o %R_src% /namespace biocad_registry --language visualbasic /split /auto_increment.disable
%reflector% /MySQL.Markdown /sql ./biocad_registry.sql > %R_docs%/README.md

pause