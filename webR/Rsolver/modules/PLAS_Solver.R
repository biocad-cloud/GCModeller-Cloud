imports "S.system" from "simulators";

#' Solve the PLAS.NET S-system model
#' 
#' @param outputfile a csv file path
#' 
solve_Ssystem = function(S, factors, title = "another S-system") {
    # set y0
    symbols = lapply(S, any -> 1);
    factors$is.const = TRUE;

    using data.driver as snapshot(symbols = names(symbols)) {
        data.driver
        |> kernel(S.script(title))
        |> environment(factors # is.const = TRUE
        )
        |> environment(symbols)
        |> bounds(lapply(symbols, any -> [-10, 10]))
        |> s.system(S)
        |> run(ticks = 10, resolution = 0.01)
        ;

        as.data.frame(data.driver);
    }
}