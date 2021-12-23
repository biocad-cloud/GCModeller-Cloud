///<reference path="../../../../build/Metabolic_pathway.d.ts" />

namespace bioCAD.WebApp.Platform {

    type EChartsOption = echarts.EChartsOption;
    type nodeIndex = { pathway: string, keys: string[] };

    export class Report extends Bootstrap {

        readonly pathways = new Dictionary<nodeIndex>();

        public get appName(): string {
            return "reportViewer";
        }

        private makeChart(data: csv.dataframe, myChart: echarts.ECharts) {
            const symbols = data.headers;
            const y = symbols
                .Where(name => name != "")
                .Select(function (name) {
                    const vec = data
                        .Column(name)
                        .Skip(1)
                        .Select((yi, i) => [i, parseFloat(yi)]);

                    return {
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
            const ymax = TypeScript.Data.quantile(y.Select(a => a.ymax).ToArray(), 0.65);
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
                    max: ymax,
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

            option && myChart.setOption(option);

            myChart.on('legendselectchanged', function (params) {
                console.log(params);
            });
        }

        protected init(): void {
            const chartDom: HTMLDivElement = <any>document.getElementById('main')!;
            const myChart: echarts.ECharts = echarts.init(chartDom);

            $ts.getText("@data:PLAS", text => this.makeChart($ts.csv(text, false), myChart));
            $ts.getText("@url:graph", text => this.initPathwaySelector(JSON.parse(text)));
        }

        private initPathwaySelector(graph: apps.Model) {
            const selector: HTMLSelectElement = <any>$ts("#pathway_list");
            const pathways = this.pathways;

            for (let node of graph.nodeDataArray) {
                if (node.isGroup) {
                    const map = <nodeIndex>{ pathway: node.label, keys: [] };
                    const opt: HTMLOptionElement = <any>$ts("<option>", { value: node.key });

                    opt.innerText = (node.text);

                    pathways.Add(node.key.toString(), map);
                    selector.add(opt);
                }
            }

            for (let node of graph.nodeDataArray) {
                if (isNullOrUndefined(node.isGroup) || !node.isGroup) {
                    if (!Strings.Empty(node.group, true)) {
                        const refKey = node.group.toString();
                        const index = pathways.Item(refKey);

                        index.keys.push(node.label);
                    }
                }
            }

            selector.onselectionchange = <any>function (global: GlobalEventHandlers, evt: Event) {
                console.log(evt);
            }
        }
    }
}