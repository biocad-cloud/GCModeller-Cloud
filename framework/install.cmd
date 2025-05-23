@echo off

REM install the compiled typescript project into the web source folder
SET jscompress=java -jar ./tools/closure-compiler-v20181125.jar
SET built=./build
SET app_release=../src/resources/javascript/
SET jump=linq_js

echo "Google GCC engine found at:"
echo %jscompress%

goto :%jump%

REM ----===== google gcc function =====----
:exec_gcc
SETLOCAL

REM the function accept one required parameter:
REM 
REM _src: the filename of the target compiled typescript 
REM       output javascript file to run gcc compression.
REM
REM
SET _src=%1
SET logfile="%built%/logs/%_src%.txt"
SET _js_src=%built%/%_src%.js
SET _js_min=%app_release%/%_src%.min.js

echo "Do javascript script minify compression... package %_src%!"
echo "  --> %_js_src%"
echo "  --> minify: %_js_min%"
echo %jscompress% --js %_js_src% --js_output_file "%_js_min%"

REM clean works and rebuild libraries
%jscompress% --js %_js_src% --js_output_file "%_js_min%" > %logfile% & type %logfile%

@echo:
echo "build package %_src% job done!"
@echo:
@echo:
@echo:
echo --------------------------------------------------------
@echo:
@echo:

ENDLOCAL & SET _result=0
goto :%jump%

REM ----===== end of function =====----

:linq_js

SET jump=linq_end
CALL :exec_gcc linq
:linq_end

SET jump=biocad_core
CALL :exec_gcc biocad_webcore
:biocad_core

SET jump=Metabolic_pathway
CALL :exec_gcc Metabolic_pathway
:Metabolic_pathway

SET jump=biocad_cloud
CALL :exec_gcc biocad
:biocad_cloud

echo "all done!"
pause

exit 0