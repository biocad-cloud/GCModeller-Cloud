namespace bioCAD.WebApp.Platform {

    type EChartsOption = echarts.EChartsOption;

    export class Report extends Bootstrap {

        public get appName(): string {
            return "reportViewer";
        }

        private makeChart(data: csv.dataframe, myChart: echarts.ECharts) {
            const symbols = data.headers;
            const x: number[] = data.Select((any, i) => i).ToArray();
            const y = symbols
                .Where(name => name != "")
                .Select(function (name) {
                    return {
                        name: name,
                        type: 'line',
                        smooth: true,
                        data: data
                            .Column(name)
                            .Skip(1)
                            .Select(yi => parseFloat(yi))
                            .ToArray()
                    };
                }).ToArray();
            const option: EChartsOption = <EChartsOption>{
                xAxis: {
                    type: 'value',
                    data: x
                },
                yAxis: {
                    type: 'value'
                },
                series: y
            };

            console.log("x axis:");
            console.log(x);
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