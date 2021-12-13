imports "http" from "webKit";

require(JSON);

options(strict = FALSE);

#' jsonrpc to biocad services
#' 
call_rpc = function(func, args) {
    endpoint = "http://8.210.29.117:8848/biostack/jsonrpc/";
    payload = list(
        jsonrpc = "2.0",
        method = func,
        params = args,
        id = 0
    );


}