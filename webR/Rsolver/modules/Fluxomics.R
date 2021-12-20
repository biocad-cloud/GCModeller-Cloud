
#' Run fluxomics data analysis
#' 
#' @param simulates the PLAS.NET simulator results output.
#' @param nparts the number of section of the time stream in the 
#'     ``simulates`` output can be divided into multiple parts?
#' @param nsamples number of the sample points in each time stream 
#'     section 
#' 
Fluxomics = function(simulates, nparts = 5, nsamples = 32) {
    [fluxomics, sample_info] = OmicsData(simulates, nparts = nparts, nsamples = nsamples);

    str(fluxomics);
    print(sample_info);

}

OmicsData = function(simulates, nparts = 5, nsamples = 32) {
    symbols = colnames(simulates);
    time_stream = as.numeric(rownames(simulates));
    block_size = as.integer(length(time_stream) / nparts);
    omics = data.frame(symbols = symbols);
    sample_names = NULL;
    sample_info = NULL;

    for(i in 1:nparts) {
        range_min = (i - 1) * block_size + 1;
        range_max = i * block_size - 1;
        id = i;
        i = range_min:range_max;
        samples = lapply(1:nsamples, function(mark) {
            idx = sample(i, length(i) / 4);
            v = sapply(symbols, name -> mean((simulates[, name])[idx]));

            list(sample_id = `block_${id}_${mark}`, vec = v);
        });

        for(sample in samples) {
            omics = cbind(omics, sample$vec);
            sample_names = append(sample_names, sample$sample_id);
        }

        range_min = round(time_stream[range_min], 2);
        range_max = round(time_stream[range_max], 2);
        sample_info = append(sample_info, rep(`time:${range_min} ~ ${range_max}s`));
    }

    colnames(omics) = append("symbols", sample_names);

    list(
        fluxomics = omics, 
        sample_info = data.frame(
            sample_id = sample_names, 
            sample_info = sample_info
        )
    );
}