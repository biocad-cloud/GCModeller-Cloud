///<reference path="../../../../build/Metabolic_pathway.d.ts" />

namespace bioCAD.WebApp.Platform {

    type SearchTerm = Application.Suggestion.term;
    type EChartsOption = echarts.EChartsOption;
    type nodeIndex = { pathway: string, keys: string[] };
    type lineData = {
        name: string,
        type: 'line',
        smooth: true,
        showSymbol: false,
        clip: true,
        data: number[][],
        emphasis: {
            focus: 'series'
        },
        ymax: number
    }

    export const listDiv = "#sample_suggests";
    export const inputDiv = "#sample_search";

    export class Report extends Bootstrap {

        readonly pathways = new Dictionary<nodeIndex>();
        readonly data = {
            y: new IEnumerator<lineData>([])
        }

        public get appName(): string {
            return "reportViewer";
        }

        private updateChart(pathway: string) {
            const vm = this;
            const getLines = function () {
                if (pathway == "*") {
                    // show all pathway data
                    return vm.data.y;
                } else if (!vm.pathways.ContainsKey(pathway)) {
                    return vm.data.y
                        .Where(line => pathway == line.name);
                } else {
                    const index: nodeIndex = vm.pathways.Item(pathway);
                    const search = $from(index.keys);

                    return vm.data.y
                        .Where(line => search.Any(name => name == line.name));
                }
            }

            this.makeChartInternal(getLines());
        }

        public static parseData(data: csv.dataframe) {
            const symbols: IEnumerator<string> = data.headers;
            const y = symbols
                .Where(name => name != "")
                .Select(function (name) {
                    const vec = data
                        .Column(name)
                        .Skip(1)
                        .Select((yi, i) => [i, parseFloat(yi)]);

                    return <lineData>{
                        name: name,
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        clip: true,
                        data: vec.ToArray(),
                        emphasis: {
                            focus: 'series'
                        },
                        ymax: vec.Select(a => a[1]).Max()
                    };
                });

            return y;
        }

        private myChart: echarts.ECharts;
        private csvText: string;

        private makeChart(text: string, myChart: echarts.ECharts) {
            const data: csv.dataframe = $ts.csv(text, false);
            const y = Report.parseData(data);
            const vm = this;

            vm.csvText = text;
            vm.myChart = myChart;
            vm.data.y = y;
            vm.makeChartInternal(y);

            myChart.on('legendselectchanged', function (params) {
                console.log(params);
            });
        }

        private makeChartInternal(y: IEnumerator<lineData>) {
            const ymax = TypeScript.Data.quantile(y.Select(a => a.ymax).ToArray(), 0.65);
            const myChart: echarts.ECharts = this.myChart;
            const option: EChartsOption = <EChartsOption>{
                animation: false,
                tooltip: {
                    trigger: 'none',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {},
                grid: {
                    top: 40,
                    left: 50,
                    right: 40,
                    bottom: 50
                },
                xAxis: {
                    name: 'Time(ticks)',
                    minorTick: {
                        show: true
                    },
                    minorSplitLine: {
                        show: true
                    },
                    nameLocation: 'middle'
                },
                yAxis: {
                    name: 'Activity',
                    min: 0,
                    max: Math.round(ymax * 1.25),
                    minorTick: {
                        show: true
                    },
                    minorSplitLine: {
                        show: true
                    }
                },
                series: y.ToArray()
            };

            console.log("lines:");
            console.log(y);

            option && myChart.setOption(option, true, false);
        }

        protected init(): void {
            const chartDom: HTMLDivElement = <any>document.getElementById('main')!;
            const myChart: echarts.ECharts = echarts.init(chartDom);

            $ts.getText("@data:PLAS", text => this.makeChart(text, myChart));
            $ts.getText("@url:graph", text => this.initPathwaySelector(JSON.parse(text)));
        }

        public getPLAS_onclick() {
            const payload: DataURI = <DataURI>{
                mime_type: "text/html",
                data: Base64.encode(this.csvText)
            }

            DOM.download("PLAS_output.csv", payload, false);
        }

        private initPathwaySelector(graph: apps.Model) {
            const selector: HTMLSelectElement = <any>$ts("#pathway_list");
            const pathwayGroup: HTMLOptGroupElement = <any>$ts("<optgroup>", { label: "Pathways" });
            const metabolites: HTMLOptGroupElement = <any>$ts("<optgroup>", { label: "Metabolites" });
            const pathways = this.pathways;
            const vm = this;
            const terms: SearchTerm[] = [];

            pathwayGroup.appendChild(<any>$ts("<option>", { value: "*" }).display("*"));

            for (let node of graph.nodeDataArray) {
                if (node.isGroup) {
                    const map = <nodeIndex>{ pathway: node.label, keys: [] };
                    const opt: HTMLOptionElement = <any>$ts("<option>", { value: node.key });
                    const term = new Application.Suggestion.term(node.key, node.text);

                    opt.innerText = (node.text);
                    terms.push(term);
                    pathways.Add(node.key.toString(), map);
                    pathwayGroup.appendChild(opt);
                }
            }

            for (let node of graph.nodeDataArray) {
                if (isNullOrUndefined(node.isGroup) || !node.isGroup) {
                    if (!Strings.Empty(node.group, true)) {
                        const refKey = node.group.toString();
                        const index = pathways.Item(refKey);
                        const opt: HTMLOptionElement = <any>$ts("<option>", { value: node.label });
                        const term = new Application.Suggestion.term(node.label, node.label);

                        opt.innerText = node.label;
                        index.keys.push(node.label);

                        if ((node.category != "valve") && !Strings.Empty(node.label, true)) {
                            terms.push(term);
                            metabolites.appendChild(opt);
                        }
                    }
                }
            }

            selector.add(pathwayGroup);
            selector.add(metabolites);
            selector.onchange = function () {
                const opt: string = $ts.select.getOption("#pathway_list");

                if ((!isNullOrUndefined(opt)) && !Strings.Empty(opt)) {
                    vm.updateChart(opt.toString());
                }
            }

            const suggest = Application.Suggestion.render.makeSuggestions(
                terms, listDiv, term => this.clickOnTerm(term), 5, true, ""
            );

            $ts(inputDiv).onkeyup = function () {
                const search: string = $ts.value(inputDiv);

                if (Strings.Empty(search, true)) {
                    $ts(listDiv).hide();
                } else {
                    $ts(listDiv).show();
                    suggest(search);
                }
            }
        }

        private clickOnTerm(term: SearchTerm) {
            const valueSel = "#pathway_list";

            $ts.value(valueSel, term.id.toString());
            $ts(listDiv).hide();

            this.updateChart(term.id);
        }
    }
}