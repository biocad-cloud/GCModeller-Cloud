namespace bioCAD.WebApp.Platform {

    type EChartsOption = echarts.EChartsOption;

    export class Report extends Bootstrap {

        public get appName(): string {
            return "reportViewer";
        }

        private makeChart(data: csv.dataframe, myChart: echarts.ECharts) {
            console.log(data);

            const option: EChartsOption = <EChartsOption>{
                xAxis: {
                    type: 'value',
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true
                    }
                ]
            };

            option && myChart.setOption(option);
        }

        protected init(): void {
            const chartDom: HTMLDivElement = <any>document.getElementById('main')!;
            const myChart: echarts.ECharts = echarts.init(chartDom);

            $ts.getText("data:PLAS", text => this.makeChart($ts.csv(text), myChart));
        }
    }
}