REM @echo off

set reflector="\graphQL\src\mysqli\App\Reflector.exe"
set R_src="\biocad_registry\src\mysql"
set R_docs=\biocad_registry\src

%reflector% --reflects /sql biocad_registry.sql -o %R_src% /namespace biocad_registryModel --language visualbasic /split /auto_increment.disable
%reflector% /MySQL.Markdown /sql ./biocad_registry.sql > %R_docs%/README.md

pause