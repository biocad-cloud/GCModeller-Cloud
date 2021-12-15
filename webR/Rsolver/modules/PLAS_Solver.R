imports "S.system" from "simulators";

#'
#' @param outputfile a csv file path
#' 
const solve_Ssystem as function(S, title = "another S-system") {
    # set y0
    symbols = lapply(S, any -> 1);

    using data.driver as snapshot(symbols = names(symbols)) {
        data.driver
        |> kernel(S.script(title))
        |> environment(
            # beta1    = 30,
            # beta3    = 30,
            # beta4    = 1,
            # lamda1   = 2,
            # lamda3   = 2,
            # alpha1   = 20,
            # alpha2   = 20,
            # alpha3   = 1,
            # a        = 1,
            # n1       = 4,
            # n2       = 5,
            # n3       = 1,
            # is.const = TRUE
        )
        |> environment(symbols)
        |> bounds(lapply(symbols, any -> [-10, 10]))
        |> s.system(S)
        |> run(ticks = 3, resolution = 0.01)
        ;

        as.data.frame(data.driver);
    }
}