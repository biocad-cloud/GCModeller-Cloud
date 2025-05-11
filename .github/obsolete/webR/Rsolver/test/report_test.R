imports "../modules/Reporter.R";

options(wkhtmltopdf = "C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe");

`${@dir}/1639306937.json`
|> readText()
|> Report(@dir)
;