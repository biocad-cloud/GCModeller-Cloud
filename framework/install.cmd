@echo off

REM install the compiled typescript project into the web source folder

REM @echo off

SET jscompress=java -jar ./tools/closure-compiler-v20181125.jar
SET built=../biodeep/cdn.biodeep.cn/typescripts/build
SET build_ui=../biodeep/cdn.biodeep.cn/typescripts/uikit/build
SET mzweb=../modules/mzXML-web/dist

echo %jscompress%

REM raw js file path
SET linq="%built%/linq.js"
SET biodeep="%built%/biodeep_v2.js"
SET docs="%built%/docs.js"
SET marked="%built%/marked.js"
SET passport="%built%/passport.js"
SET svg="%built%/svg.js"
SET pms="%built%/biodeep_pms.js"
SET notify="%built%/biodeep.notify.worker.js"
SET metadeco="%built%/metadeco.js"

REM SET metadeco="%built%/metanno.task.js"
REM SET metadeco="%built%/science.js"
REM SET metadeco="%built%/biodeep_v2.repository.js"
REM SET metadeco="%built%/biodeep_v2.workspace.js"
REM SET metadeco="%built%/biodeepdb_v2.js"
REM SET metadeco="%built%/metanno.js"

echo "Do script minify compression..."

%jscompress% --js %linq% --js_output_file "%built%/linq.min.js"
echo .
%jscompress% --js %biodeep% --js_output_file "%built%/biodeep_v2.min.js"
echo .
%jscompress% --js %docs% --js_output_file "%built%/docs.min.js"
echo .
%jscompress% --js %marked% --js_output_file "%built%/marked.min.js"
echo .
%jscompress% --js %passport% --js_output_file "%built%/passport.min.js"
echo .
%jscompress% --js %metadeco% --js_output_file "%built%/metadeco.min.js"
echo .
%jscompress% --js %svg% --js_output_file "%built%/svg.min.js"
echo .
%jscompress% --js %pms% --js_output_file "%built%/biodeep_pms.min.js"
echo .
%jscompress% --js %notify% --js_output_file "%built%/biodeep.notify.worker.min.js"

%jscompress% --js %built%/biodeep_v2.workspace.task.js --js_output_file "%built%/biodeep_v2.workspace.task.min.js"
%jscompress% --js %built%/biodeep_v2.workspace.js --js_output_file "%built%/biodeep_v2.workspace.min.js"

%jscompress% --js %built%/biodeep_v2.query.js --js_output_file "%built%/biodeep_v2.query.min.js"

echo "Compress uikit js libraries..."

%jscompress% --js %build_ui%/uikit.colorPicker.js --js_output_file "%build_ui%/uikit.colorPicker.min.js"
%jscompress% --js %build_ui%/uikit.fast_colorPicker.js --js_output_file "%build_ui%/uikit.fast_colorPicker.min.js"
%jscompress% --js %build_ui%/uikit.suggestion_list.js --js_output_file "%build_ui%/uikit.suggestion_list.min.js"
%jscompress% --js %build_ui%/uikit.table_editor.js --js_output_file "%build_ui%/uikit.table_editor.min.js"

echo "Compress mzweb library"
%jscompress% --js %mzweb%/BioDeep_mzWeb.js --js_output_file %built%/BioDeep_mzWeb.min.js
%jscompress% --js %mzweb%/biodeepMSMS.Viewer.js --js_output_file %built%/biodeepMSMS.Viewer.min.js

echo "[job done!]"

echo Delete raw files...

echo %linq%
del %linq%

echo %biodeep%
del %biodeep%

echo %docs%
del %docs%

echo %marked%
del %marked%

echo %passport%
del %passport%

echo %svg%
del %svg%

echo %metadeco%
del %metadeco%

echo Delete js map files...

del "%built%/biodeep_v2.js.map"
del "%built%/docs.js.map"
del "%built%/linq.js.map"
del "%built%/marked.js.map"
del "%built%/passport.js.map"
del "%built%/svg.js.map"
del "%built%/metadeco.js.map"

echo Delete typescript module files...

del "%built%/biodeep_v2.d.ts"
del "%built%/docs.d.ts"
del "%built%/linq.d.ts"
del "%built%/marked.d.ts"
del "%built%/passport.d.ts"
del "%built%/svg.d.ts"
del "%built%/metadeco.d.ts"

pause