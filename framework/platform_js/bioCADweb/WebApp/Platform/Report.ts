namespace bioCAD.WebApp.Platform {

    type EChartsOption = echarts.EChartsOption;

    export class Report extends Bootstrap {

        public get appName(): string {
            return "reportViewer";
        }

        private makeChart(data: csv.dataframe, myChart: echarts.ECharts) {
            const symbols = data.headers;
            const y = symbols
                .Where(name => name != "")
                .Select(function (name) {
                    return {
                        name: name,
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        clip: true,
                        data: data
                            .Column(name)
                            .Skip(1)
                            .Select((yi, i) => [i, parseFloat(yi)])
                            .ToArray(),
                        emphasis: {
                            focus: 'series'
                        }
                    };
                }).ToArray();
            const option: EChartsOption = <EChartsOption>{
                animation: false,
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
                    }
                },
                yAxis: {
                    name: 'Activity',
                    min: 0,
                    max: 10,
                    minorTick: {
                        show: true
                    },
                    minorSplitLine: {
                        show: true
                    }
                },
                series: y
            };

            console.log("lines:");
            console.log(y);

            option && myChart.setOption(option);
        }

        protected init(): void {
            const chartDom: HTMLDivElement = <any>document.getElementById('main')!;
            const myChart: echarts.ECharts = echarts.init(chartDom);

            $ts.getText("@data:PLAS", text => this.makeChart($ts.csv(text, false), myChart));
        }
    }
}