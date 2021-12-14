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

    print("jsonRPC payload:");
    str(payload);

    data = endpoint
    |> requests.post(list(rpc = payload))
    |> content()
    |> json_decode()
    ;

    print("data response from the services:");
    str(data);

    data;
}