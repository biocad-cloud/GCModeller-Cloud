@echo off

REM install the compiled typescript project into the web source folder

REM @echo off

SET jscompress=java -jar ./tools/closure-compiler-v20181125.jar
SET built=./build
SET app_release=../src/web/resources/typescripts/

echo "Google GCC engine found at:"
echo %jscompress%

REM raw js file path
SET linq="%built%/linq.js"

echo "Do script minify compression..."

%jscompress% --js %linq% --js_output_file "%built%/linq.min.js"
